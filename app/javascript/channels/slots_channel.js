import consumer from "./consumer"
import PubSub from 'pubsub-js';
consumer.subscriptions.create("SlotsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('Connected to slots channel')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data)
    PubSub.publish('slots', data);
    // Called when there's incoming data on the websocket for this channel
  }
});
