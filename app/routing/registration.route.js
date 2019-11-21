const { Router } = require('express');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const upload = multer({
  dest: path.resolve(__dirname, '..') + '/public/',
});

const router = Router();
const user = new User().connectToTable();
const pathRoute = {
  getUserInfoById: '/api/v1/get_user_info',
  registrationUser: '/api/v1/registration_user',
  getListOfUsers: '/api/v1/get_users_info',
};


router.get(pathRoute.getListOfUsers, (req, res) => {
  user.find(undefined, (err, users) => {
    if (err) {
      res.status(500)
        .json({
          success: 1,
          message: err,
        });
      throw Error(err);
    }
    res.status(200).json({
      success: 0,
      result: users
    });
  });
});

router.get(pathRoute.getUserInfoById, (req, res) => {
  const {user_id} = req.query;
  console.log(JSON.parse(JSON.stringify(user_id)));
  if (!user_id) {
    res.status(404).send({success: 1, message: 'Can\'t get user id.'});
  } else {
    user.findById(user_id, (err, userInfo) => {
      if (err) {
        console.log(err);
        res.status(404).send({success: 1, message: 'User is not defined.'});
      } else {
        res.status(200)
        .json({
          success: 0,
          result: userInfo,
        });
      }
    });
  }
});


router.post(pathRoute.registrationUser, upload.single('user_image'), async (req, res) => {
  const tempePath = req.file.path;
  const targetPath = path.join(path.resolve(__dirname, '..'), 'public/' + req.file.filename + '.jpeg');
  fs.rename(tempePath, targetPath, err => {
    if (err) {
      res.status(500)
      .json({
        success: 1,
        message: 'Can\'t save image.'
      })
    }
  });
  await user.insertMany({
    user_name: req.body.user_name,
    email: req.body.email,
    create_at: new Date(),
    update_at: new Date(),
    user_image: '/static/' + req.file.filename + '.jpeg',
    user_tabs: [
      {
        title: 'Default',
        ids_of_tasks: [],
      }
    ]
  }, (err, cUser) => {
    if (err) {
      res.status(500).json({success: 1, message: 'Can\'t save user in DATA BASE.'});
      throw Error(err);
    }
    res.status(200).json({success: 0, result: cUser});
  });
});


module.exports = router;