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


router.post(pathRoute.registrationUser, upload.single('user_avatar'),(req, res) => {
  const tempePath = req.file.path;
  const targetPath = path.join(path.resolve(__dirname, '..'), 'public/' + req.file.filename + '.jpeg');
  fs.rename(tempePath, targetPath, err => {
    if (err) throw err.stack;
  });
  res.status(200).json({
    success: 0,
    result: {},
  })
});


module.exports = router;