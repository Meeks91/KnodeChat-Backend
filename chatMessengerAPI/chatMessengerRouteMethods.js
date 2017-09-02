const fn = require('fn.js')

module.exports = messagesDBHelper => {

  return { getAllMessages: fn.partial(getAllMessages, messagesDBHelper),
           getAllMessagesFrom: fn.partial(getAllMessagesFrom, messagesDBHelper) }
}

/**
 *
 * Endpoint to get all chat messages from the db
 *
 * @param  {messagesDBHelper} - handles retrieving messages from the db
 * @param  {req} - the request from the api call
 * @param  {res} - the response for the api Called
 */
function getAllMessages(messagesDBHelper, req, res){

   messagesDBHelper
        .getAllMessages()
        .then(messages => res.status(200).json({messages: messages}))
        .catch(error => res.status(400).json({error: error}))
}

/**
 *
 * Endpoint to get all chat messages after the time
 * specified in the req.query.date variable from the db
 *
 * @param  {messagesDBHelper} - handles retrieving messages from the db
 * @param  {req} - the request from the api call
 * @param  {res} - the response for the api Called
 */
function getAllMessagesFrom(messagesDBHelper, req, res){

 //ensure there is query param
 if (typeof req.query.date === 'string') {

  //retrieve messages from the specified dateString
  messagesDBHelper
       .getAllMessagesFrom(req.query.date)
       .then(messages => res.status(200).json({messages: messages}))
       .catch(error => res.status(400).json({error: error}))
     }

     //notify the client they failed to provide a valid date
     else {

       res.status(400).json({error: "invalid date"})
     }
}
