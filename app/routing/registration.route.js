const { Router } = require('express');
const User = require('../models/User');

const router = Router();

const pathRoute = {
  getUserInfoById: '/api/v1/get_user_info',
  registrationUser: '/api/v1/registration_user',
  getListOfUsers: '/api/v1/get_users_info',
};


router.get(pathRoute.getListOfUsers, (req, res) => {
  const user = new User().connectToTable();
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


module.exports = router;