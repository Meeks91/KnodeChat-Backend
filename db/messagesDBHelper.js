const fn = require('fn.js')

/**
 *
 * Exports all of the methods required to manage the messages data
 *
 * @param  {sequelize} - initialised sequelize objected connected to the database
 * @param  {Sequelize} - Sequelize class object used to access data types not for db operations
 * @return {object} an object containing all of the available methods to manage message data
 */
module.exports = ({Sequelize, sequelize}) => {

  console.log('Sequelize is: ', Sequelize, ' and sequelize is: ', sequelize)

  //create the message model
  const messageModel = generateMessageModel(sequelize, Sequelize)

  return {
    saveMessage: fn.partial(save, messageModel),
    getAllMessages: fn.partial(getAllMessages, messageModel),
    getAllMessagesFrom: fn.partial(getAllMessagesFrom, messageModel)
  }
}

/**
 *
 * creates the message model using the specified sequelize used to store and retrieved messages
 *
 * @param {sequelize} - the sequelize connetion used to create models
 */
function generateMessageModel(sequelize, Sequelize) {

  return sequelize.define('message', {
    message: {
      type: Sequelize.STRING
    },
  })
}

/**
 * stores a message in the message table. The message is created out of the specified message
 * parameter
 *
 * @param {messageModel} - the message model used to create the table and store messages
 * @param  message -  the message text used when we create a message
 */
function save(messageModel, message, onMessageSaved) {

  messageModel.sync({
    force: false
  }).then(() => {

    messageModel.create({
      message: message
    }).then(savedMessage => onMessageSaved(savedMessage))
  })
}

/**
 * gets all of the chat messages from the db.
 * The results are returned in a Promise.
 *
 * @param   {messageModel} - We get the messages from this model
 * @return {Promise} - returns a promise contaning the chat messages
 */
function getAllMessages(messageModel) {

  return messageModel.findAll()
}

/**
 * gets all of the chat messages fcreated after
 * the specified dateString from the db.
 * The results are returned in a Promise.
 *
 * @param    dateString - a dateString spcifying the date after which
 *           a chat message must have been created to be returned
 *           by this query.
 * @param   {messageModel} - We get the messages from this model
 * @return {Promise} - returns a promise contaning the chat messages
 */
function getAllMessagesFrom(messageModel, dateString) {

  return messageModel.findAll({
    where: {
      createdAt: {
        $gt: new Date(dateString)
      }
    }
  })
}
