/**
 * StudentManagerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function (req, res) {
    StudentManager.find({}).exec(function (err, StudentManager) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      // res.view('list',{StudentManager:StudentManager});//
      res.json(StudentManager);
    });
  },
  add: function (rep, res) {
    res.view("add");
  },
  create: async (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let maSV = req.body.maSV;
    let lop = req.body.class;
    let major = req.body.major;
    if (name == "" || maSV == "") return false;
    
    let checkMajor =await Major.findOne({name:major});
       if(typeof checkMajor==="undefined") {
        console.log('khong co nganh trong database')
        return false
    }
    let checkClass =await Class.findOne({name:lop});
       if(typeof checkClass==="undefined") {
        console.log('khong co lop trong database')
        return false
    }
    await StudentManager.create({
      name: name,
      maSV: maSV,
      lop: lop,
      major: major,
    });
    res.redirect("/studentmanager/list");
  },

  delete: function (req, res) {
    console.log(req.body);
    // var student = JSON.parse(req.body);
    // console.log(studentid.id);
    console.log(JSON.stringify(req.body));
    console.log("id =" + req.body.id);
    StudentManager.destroy({ id: req.body.id }).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.redirect("/studentmanager/list");
    });
    return false;
  },

  edit: function (req, res) {
    StudentManager.findOne({ id: req.body.id }).exec(function (err, student) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("edit", { student: student });
    });
  },
  update: function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var maSV = req.body.maSV;

    console.log(id + " " + name + " " + maSV);

    StudentManager.update({ id: id })
      .set({ name: name, maSV: maSV })
      .exec(function (err) {
        if (err) {
          res.send(500, { error: "Database Error" });
        }
        res.redirect("/studentmanager/list");
      });
  },
};
