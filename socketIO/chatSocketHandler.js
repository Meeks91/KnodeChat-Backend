//MARK: ---------- MODULES AND CONSTANTS

const fn = require('fn.js')
const CHAT_MESSAGE_EVENT_KEY = 'CHAT_MESSAGE'

//MARK: ---------- MODULES AND CONSTANTS

/**
 * This module handles subscribing to chat message socket events.
 * saving the messages, and emitting the a transformed version of
 * the original chat message.
 *
 * @param  {type} messagesDBHelper - handles all chat related db operations
 * @return {initChatConnection} - a method which initiates chat connection
 */
module.exports = messagesDBHelper => {

  //infuse the messagesDBHelper into onMessageReceived
  const pOnMessageReceived = fn.partial(onMessageReceived, messagesDBHelper)


   return {

     initChatConnection: fn.partial(initChatConnection, pOnMessageReceived)
   }
}

/**
 * Connects and listens to the chat socket using the specified socket.
 *
 * @param {socket} - a socket with an established connected
 *                   used to subscribe to chat events}
 */
function initChatConnection(onMessageReceived, {socketIOClient, socket}) {

  socket.on(CHAT_MESSAGE_EVENT_KEY, receivedMessage => {

  console.log('receivedMessage is: ', receivedMessage)

            onMessageReceived(socketIOClient, receivedMessage)
      })
  }

/**
 * It saves any received messages and then emits the saved version
 * of the message. It emits the saved version instead of the raw
 * version as it had an id and createdAt date from the messagesDBHelper.
 *
 * @param {messagesDBHelper} - handles saving the chat message
 * @param {socketIOClient} - the socketIOClient used to emit events
 * @param {receivedMessage} - the message that the socket received
 * @return {[type]}                  [description]
 */
  function onMessageReceived(messagesDBHelper, socketIOClient, receivedMessage){

    messagesDBHelper.saveMessage(receivedMessage, savedMessage => {

      console.log('savedMessage is: ', savedMessage)

       socketIOClient.emit(CHAT_MESSAGE_EVENT_KEY, savedMessage)
     })
}
