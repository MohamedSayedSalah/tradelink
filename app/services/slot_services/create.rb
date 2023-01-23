class SlotServices::Create < ApplicationService

  def call(slot_params)
    @params = slot_params
    handle_result(true, create_slot)
  rescue StandardError => error
    handle_result(false, error)
  end


  def create_slot
    slot = Slot.new
    slot.assign_attributes(@params)
    unless slot.save
      raise ResponseError::Error.new(slot.errors[:full_message], 422)
    end
    slot
  end

end

