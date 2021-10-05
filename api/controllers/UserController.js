/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const bcrypt = require("bcrypt");

module.exports = {
  
  create: async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let user = await User.findOne({ username: username });

    if (!user) {
      await User.create({
        username: username,
        password: password,
        email: email,
      });
      await Device.create({
        deviceName: req.headers["user-agent"],
        username: username,
      });
      console.log("Da tao");
      return res.json({ errDK: "dung" });
    } else return res.json({ errDK: "errDK" });
  },
  checkOTP: async function(req,res){
      let otp = await Otp.findOne({otpName:req.body.otp})
      if(!otp) return res.json({err:"saiOTP"})
      if(otp.username!= req.body.username ) return res.json({err:"saiOTP"})
      if(!checkOtp.checkOldOtp(otp.createdAt)){
        await Otp.destroy({id:otp.id})
        return res.json({err:"OTP het han"})

      } 
      await Otp.destroy({id:otp.id})
      await Device.create({deviceName:req.headers['user-agent'],username:req.body.username})
      res.json(jwToken.issue(req.body))
  },
  resendOTP: async function(req,res){
    let user = await User.findOne({ username: req.body.username });
    let otps = await Otp.find({username:user.username})
    if(otps){
    otps.forEach((otp)=>{
      Otp.destroy({id:otp.id})
    })
    }
    checkOtp.createOTP(user)
    res.json({err:'da gui lai'})

  },
  login: async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username + " " + password);
    if (username == "" || password == "")
      return res.json(401, { err: "sai mk" });
    let user = await User.findOne({ username: username });
    if (!user) return res.json({ errorMK: "MK sai" });
    if (!(await bcrypt.compare(password, user.password)))
    return res.json({ errorMK: "MK sai" });
    let devices = await Device.find({ username: user.username });
    let infoDevice = req.headers["user-agent"];
    var check = false;
    devices.forEach((device) => {
      if (device.deviceName == infoDevice) {
        check = true;
      }
    });

    if (!check) {
      checkOtp.createOTP(user)
      return res.json({ errDV: "TBM" });
      
    }

    
    
    res.json(jwToken.issue(req.body));
  },
  test: function(req,res){
    checkOtp.checkOldOtp(1622204086638)
    res.json({ok:'OK'})
  }
};
