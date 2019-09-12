exports.requireLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    let err = new Error('You must be logged in to view this section!');
    err.status = 401;

    return res.redirect('/login');
  }
};