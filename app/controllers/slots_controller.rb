class SlotsController < ApplicationController
  include ResponseConcern
  def create
    result = SlotServices::Create.new.call(slot_params)
    respond(result, ::V1::SlotSerializer)
    ActionCable.server.broadcast "slots_channel", 'update!'
  end


  def available_slots
    result = SlotServices::AvailableSlots.new.call(**params.to_enum.to_h.transform_keys(&:to_sym))
    respond(result, nil, {}, 'json_object')
  end


  private
  def slot_params
    params.require(:slot).permit(:start_date, :end_date)
  end

end