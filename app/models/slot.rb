class Slot < ApplicationRecord

  GAP = 15
  START_TIME = Time.parse('8:00:00').strftime("%H:%M:%S")
  END_TIME = Time.parse('20:00:00').strftime("%H:%M:%S")


  scope :on_this_day, ->(date = Date.today) { where('start_date::timestamp::date = ?', date).order(start_date: :asc) }


end