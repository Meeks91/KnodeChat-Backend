module.exports =  () => {

   const Sequelize =  require('sequelize')
   const sequelize = new Sequelize('knodeChatDB', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+01:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  })

  return {

    Sequelize: Sequelize,
    sequelize: sequelize
  }
}
