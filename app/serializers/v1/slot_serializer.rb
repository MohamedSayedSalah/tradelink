class V1::SlotSerializer
  include DefaultSerializer


  attribute :start_date do |object|
    object.start_date.strftime("%H:%M:%S")
  end

  attribute :end_date do |object|
    object.end_date.strftime("%H:%M:%S")
  end

  attribute :available do |object|
    false
  end





end