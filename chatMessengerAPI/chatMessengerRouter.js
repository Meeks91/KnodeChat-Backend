/**
 * Contains routes for getting messages
 *
 * @param  {router} - used to declare a route
 * @param  {chatMessengerMethods} - contains the methods used to handle the requests
 * @return
 */
module.exports = (router, chatMessengerMethods) => {

       //route for getting all chat messages from a specific date
       router.get('/getAllMessagesFrom', chatMessengerMethods.getAllMessagesFrom)

       //route for getting all chat messages
       router.get('/getAllMessages', chatMessengerMethods.getAllMessages)

       return router
  }
