const nodemailer = require("nodemailer");
var moment = require('moment'); // require
// moment().format(); 
module.exports = {
  async createOTP(user) {
    let r = Math.random().toString(36).substring(2, 8);
    await Otp.create({
      otpName: r,
      username: user.username,
    });
    sendMail(user.email, r);
  },
  checkOldOtp(day){
      
      let now = new moment()
      let subTime = (now-moment(day))/1000
      console.log(subTime)
      if(subTime>30) return false
      return true
    
    // console.log(moment(day))
    // var now = moment()
    // console.log(now)
    // console.log((now-moment(day))/1000)
  }
};
async function sendMail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hoangvh.neonstudio@gmail.com",
      pass: "hoang121200",
    },
  });
  let txt = "Ma xac thuc cua ban la " + otp;
  let mailOptions = {
    from: "hoangvh.neonstudio@gmail.com",
    to: email,
    subject: "Xac thuc thiet bi",
    text: txt,
  };
  let data = await transporter.sendMail(mailOptions);
  console.log(data);
}
