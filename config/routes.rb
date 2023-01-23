Rails.application.routes.draw do



  post "/slot", to: "slots#create", as: :new_slot
  get "/available_slots", to: "slots#available_slots"
  root "home#index"
  match "*path", to: "home#index", via: :get

end
