const { Router } = require('express');

const router = Router();

const pathRoute = {
  getUserInfo: '/api/v1/get_user_info',
  regUser: '/api/v1/registration_user',
};


router.get(pathRoute.getUserInfo, () => {

});
