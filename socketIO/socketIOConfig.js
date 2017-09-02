const Promise = require('bluebird')
const fn = require('fn.js')

module.exports = (http) => {

/**
 * This module is used to establish the initial connection to socketIO
 */
const socketIOClient = require('socket.io')(http)

  return {

    initConnection: fn.partial(initConnection, socketIOClient),
  }
}

/**
 *
 * Establishes a general connection to socketIO.
 * It passes the socketIOClient and connected socket
 * to the  onSuccess callback
 *
 * @param  {socketIO} - the socketIO client we use to estbalish a connection to socket IO
 */
function initConnection(socketIOClient, onSuccess, onError){

      socketIOClient.on('connection', socket => {

        console.log('a user connected');

        onSuccess({socketIOClient: socketIOClient, socket: socket})

        socketIOClient.on('disconnect', () =>{

          console.log('user disconnected')
        })

        socketIOClient.on('connect_error', () =>{

          console.log('connection error')

            onError('failed to connect')
        })
     })
}
