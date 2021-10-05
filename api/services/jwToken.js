'use strict';
const jwt = require('jsonwebtoken')
module.exports ={
    issue(payload){
        
        return jwt.sign(payload,'hoang123')
    }
    ,verify(token,callback) {
        return jwt.verify(
          token, 
          'hoang123',
          callback
        );
      }
}