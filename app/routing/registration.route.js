const { Router } = require('express');

const router = Router();

const pathRoute = {
  getUserInfo: '/api/v1/get_user_info',
  regUser: '/api/v1/registration_user',
};


router.get(pathRoute.getUserInfo, (req, res) => {
  console.log(req);
  res.status(200).json({
    success: 0,
    result: {}
  });
});


module.exports = router;