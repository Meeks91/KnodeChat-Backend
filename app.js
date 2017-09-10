//MARK: -------- REQUIRE MODULES

const port = 9001
const bodyParser = require('body-parser')
const express = require('express')
const expressApp = express()
const http = require('http').Server(expressApp)
const sequelizeWrapper = require('./db/sequelizeWrapper')()
const messagesDBHelper = require('./db/messagesDBHelper')(sequelizeWrapper)
const socketIOConfig = require('./socketIO/socketIOConfig')(http)
const chatSocketHandler = require('./socketIO/chatSocketHandler')(messagesDBHelper)
const chatMessengerRouteMethods =  require('./chatMessengerAPI/chatMessengerRouteMethods')(messagesDBHelper)
const chatMessengerRouter = require('./chatMessengerAPI/chatMessengerRouter')(express.Router(), chatMessengerRouteMethods)

//MARK: -------- REQUIRE MODULES

//MARK: -------- INITIALISATION

expressApp.use(bodyParser.json())

http.listen(port, () => {

  console.log(`listening on port: ${port}`)
})

//MARK: -------- INITIALISATION

//MARK: -------- ROUTES & SOCKET CONNECTIONS

expressApp.use('/api/messages/', chatMessengerRouter)

//establish socket connection and then begin listening for, emitting and saving chat messages
socketIOConfig.initConnection(chatSocketHandler.initChatConnection, onError)

//MARK: -------- ROUTES & SOCKET CONNECTIONS

//MARK: --------- ERROR HANDLING

/**
 * Called to handle errors from socketIO
 *
 * @param error - the error specified by the promise which threw the error
 */
function onError(error){

   console.log(`error is: ${error}`)
}

//MARK: --------- ERROR HANDLING
