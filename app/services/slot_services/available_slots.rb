class SlotServices::AvailableSlots < ApplicationService

  def call(duration: 15, date: Date.today, **)
    @duration = duration
    @date = date
    slots = generate_slots_recursively(Time.parse(Slot::START_TIME), @duration)
    @already_booked_slots = Slot.on_this_day(@date)
    slots.each do |slot|
      slot[:available] = !binary_search_collision(slot)
    end
    handle_result(true, slots)
  end

  def generate_slots_recursively(current_time, duration)
    result = [slot_object(current_time)]
    if current_time.strftime("%H:%M:%S") >= Slot::END_TIME
      return result
    end
    result + generate_slots_recursively(current_time + (duration.to_i.minutes) + Slot::GAP.to_i.minutes, duration)
  end

  def slot_object time
    { start_date: time.strftime("%H:%M:%S"), end_date: (time + @duration.to_i.minutes).strftime("%H:%M:%S"), available: true }
  end

  def binary_search_collision(slot, left = 0, right = @already_booked_slots.length)
    if left > right || @already_booked_slots.length == 0
      return false
    end
    existed = false
    mid = (left + right) / 2
    start_date = @already_booked_slots[mid].start_date.strftime("%H:%M:%S") if mid < @already_booked_slots.length
    end_date = @already_booked_slots[mid].end_date.strftime("%H:%M:%S") if mid < @already_booked_slots.length

    if mid < @already_booked_slots.length && slot[:start_date] >= start_date  && slot[:start_date] <= end_date
      return true
    end

    if mid < @already_booked_slots.length &&  slot[:end_date] >= start_date &&  slot[:end_date] <= end_date
      return true
    end

    if mid < @already_booked_slots.length && (slot[:start_date] > start_date &&  slot[:start_date] < end_date) &&
      (slot[:end_date] > start_date && slot[:end_date] < end_date)
      return true
    end

    if mid < @already_booked_slots.length && (slot[:start_date] < start_date &&  slot[:end_date] > end_date)
      return true
    end



    return false if left == right

    existed |= binary_search_collision(slot, mid + 1, right) if end_date < slot[:start_date]
    existed |= binary_search_collision(slot, left, mid - 1)
    existed
  end

end
