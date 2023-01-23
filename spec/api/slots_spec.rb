require 'spec_helper'

describe "document management system apis " do

  before do
    @url = "/available_slots"

    Slot.create(start_date: Time.new , end_date: Time.new + 10.minutes)
    Slot.create(start_date: Time.new + 25.minutes , end_date: Time.new + 35.minutes)
    Slot.create(start_date: Time.new + 40.minutes , end_date: Time.new + 50.minutes)
    Slot.create(start_date: Time.new + 65.minutes , end_date: Time.new + 80.minutes)
  end


  it "should be able to load available slots" do
    get @url + "/available_slots?duration=10&date=#{Date.yesterday}", params: {}
    expect(response.status).to eq(200)
    body = JSON.parse(response.body)
    res = body.data.attributes.all.pluck(:available).any?{ |boolean| boolean == false}
    expect(res).to eq(false)
  end


  it "should be able to mark some slots to be unavailable" do
    get @url + "/available_slots?duration=10&date=#{Date.today}", params: {}
    expect(response.status).to eq(200)
    body = JSON.parse(response.body)
    res = body.data.attributes.all.pluck(:available).any?{ |boolean| boolean == false}
    expect(res).to eq(true)
  end



  it "should be able to create a new slot" do
    post '/slot' , params: {slot: {start_date: Time.new , end_date: Time.new + 10.minutes }}
    expect(response.status).to eq(200)
    expect(Slot.count).to eq(5)
  end


end
