#usage requirement
- ruby version 3.1.0
- Rails 6.1.4.4
- postgres 12.9
- nodejs 
- redis 'not mandatory but socket wont work without it'
* hopefully docker will be added to avoid this hustle 
# how to use it
- rails db:drop db:create db:migrate
- rails db:drop db:create db:migrate RAILS_ENV=test
- bundle install 
- yarn install 
- to start the backend server 'rails s'
- to start the frontend server './bin/webpack-dev-server'


# flow
- no need to create a user or anything 
- on the home page a new api call well be made
using the default duration and date 
- the api will generate a new slots for that day each of which has that duration
- each generated slot will be checked against whats in the database for a collision using binary search algorithm 
- when the duration is changed or the date is changed a new api call will be made to generate a new available slots
- a book button will create a new booking for you and after that a socket connection will broadcast that a new update has been made
- any subscriber to slots_channel will call the available_slots api with his current duration and date to check for the new available slots 
- when the client receive  the new message it will be published via Pubsub 
- a subscriber in the home component will be notified and it will trigger a new api call to check for the new available slots


#basic components 
- js -> home.js,slots.js
- rails -> available_slots.rb

# Apis
- post "/slot" for creating a new booking
- get "/available_slots" to check the slots availability  







