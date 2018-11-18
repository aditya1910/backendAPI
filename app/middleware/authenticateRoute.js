// This is the function act as the middle ware if the user's session is active or not if not
// or any other restrictions can be applied to this route
module.exports = (req, res, next) => {
  //req.start = new Date();
  next();
};
