const express = require('express')
const router = express.Router()
const passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')
var bcrypt = require('bcryptjs');




  router.post('/', (req, res, next)=>{
    // console.log(req.body);
    passport.authenticate('user', (err, user, info)=> {
      if (err) { return next(err); }
      if (!user) { return res.status(404).end(); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return  res.status(200).end();;
      });
    })(req, res, next);
  });

  router.get('/auth', (req, res)=>{
    if(req.isAuthenticated()){
      res.status(200).end()
    }else{
      res.status(403).end()
    }
  });

  router.get('/Logout',(req,res)=>{
    req.logout();
    console.log('aa')
    res.status(200).end();
  })


  passport.use('user',
    new LocalStrategy(
      async (username,password,done) => {
        // console.log(username)
        try {
          let user = await User.findOne({ username: username })
        // console.log(user)
          if (!user) {
            return done(null, false)
          }

          bcrypt.compare(password, user.password).then((res) => {
            if(!res) return done(null, false);
           else return done(null, user);
          });

        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    // console.log(id)
    User.findById(id, (err, user) => done(err, user))
  })


module.exports = router








