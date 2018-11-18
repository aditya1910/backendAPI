// const express = require('express');
// const Models = require('../../models');

// const router = express.Router();
// /**
//  * [doSignup function called when a new user signs up with a unique username password is not encrypted for now ]
//  * @param  {Object} req [description]
//  * @param  {Object} res [description]
//  * @return {[type]}     [description]
//  */
// function doSignup(req, res) {
//   const params = req.body;
//   if (!params.userName || !params.password || !params.email) return res.status(400).json({ msg: 'Incorrect payload' });

//   Models.User.create(params, (error, result) => {
//     if (error) return res.status(500).json(error);

//     return res.status(201).json(result);
//   });
// }

// router.post('/', doSignup);

// module.exports = router;
