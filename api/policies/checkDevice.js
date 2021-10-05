module.exports = async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.json({ errMK: "MK sai" });
  let devices = await Device.find({ username: user.username });
  let infoDevice = req.headers["user-agent"];

  var check = false;
  devices.forEach((device) => {
    if (device.deviceName == infoDevice) {
      check = true;
    }
  });

  if (!check) {
    await Device.create({ deviceName: infoDevice, username: user.username });
    return res.json({ errDV: "TBM" });
  }

  return next();
};
