/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt')
module.exports = {

  attributes: {
    username:{
      type:'string'
    },
    password:{
      type:'string'
    },
    email:{
      type:'string'
    }

   
  },
  async beforeCreate(values,next) {
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(values.password,salt)
      values.password =  hashPassword
      return next()
    
     

  }


};

