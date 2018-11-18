// const express = require('express');
// const router = express.Router();

// /**
//  * to logout a user and remove his/her session.
//  * @param  {[type]} req [description]
//  * @param  {[type]} res [description]
//  * @return {[type]}     [description]
//  */
// function logoutUser(req, res) {
//   console.log('in logout ', req.user);
//   req.session.destroy();
//   res.status(200).json({
//     isLoggedOut: true,
//     isActiveSession: false,
//     isError: false,
//     msg: 'Successfully logged out',
//   });
// }

// router.get('/', logoutUser);

// module.exports = router;
