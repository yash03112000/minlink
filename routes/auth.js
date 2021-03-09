module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
        return next();
      }
    console.log('Please log in to view that resource');
    res.status(401).end();      
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
        res.redirect('/');
    }
  };