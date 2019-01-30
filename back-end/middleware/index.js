// all the middleware goes here
const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'You need to be authenticated to perform this action' });
};

module.exports = middlewareObj;
