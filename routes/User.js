const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Link = require('../models/Link')
var bcrypt = require('bcryptjs');


router.post('/IDcheck',(req,res)=>{
  Link.find({uniqueid:req.body.id})
    .exec()
    .then((links)=>{
      if(links.length>0){
        res.json({
          status:false
        })
      }else{
        res.json({
          status:true
        })
      }
    })
    .catch((err)=>{
      throw err
    })
})


router.post('/add',(req,res)=>{
  // console.log(req.user)
  Link.find({uniqueid:req.body.id})
    .exec()
    .then((links)=>{
      if(links.length>0){
        res.json({
          status:false
        })
      }else{
        var found = true;
        if(req.body.title&&req.body.title!==''&&req.body.id !==''&&req.body.status!==''&&req.body.link!==''){
          if(req.body.status==='Friends'){
              if(req.body.password!==''){
                  found  = true;
              }else found = false
          }else found = true;
      }else found = false;

      if(!found){
        res.json({
          status:"Rejected"
        })
      }else{
        bcrypt.genSalt(10, (err, salt)=>{
          bcrypt.hash(req.body.password, salt, (err, hash)=>{
              // Store hash in your password DB.
              var link = new Link;
              link.title = req.body.title;
              link.uniqueid = req.body.id;
              link.status = req.body.status;
              link.password = hash;
              link.owner = req.user.id
              link.link = req.body.link
              link.save()
                .then((link)=>{
                  res.json({
                    status:"Accepted"
                  })
                })
          });
      });

      }
      

      }
    })
    .catch((err)=>{
      throw err
    })
})


router.put('/edit',(req,res)=>{
  // console.log(req.user)
  Link.findById(req.body.editid)
    .exec()
    .then((link)=>{
      if(!link){
        res.json({
          status:false
        })
      }else{
        var found = true;
        if(req.body.title&&req.body.title!==''&&req.body.id !==''&&req.body.status!==''&&req.body.link!==''){
           found = true;
      }else found = false;

      if(!found || !link.owner.equals(req.user.id)){
        res.json({
          status:"Rejected"
        })
      }else{
        link.title = req.body.title;
        link.uniqueid = req.body.id;
        link.status = req.body.status;
        link.owner = req.user.id
        link.link = req.body.link
        link.save()
          .then((link)=>{
            res.json({
              status:"Accepted"
            })
          })
      }
      

      }
    })
    .catch((err)=>{
      throw err
    })
})



router.get('/Dashboard',(req,res)=>{
  // console.log(req.user);
  Link.find({owner:req.user.id})
    .select('-password')
    .exec()
    .then((links)=>{
      // console.log(links);
      res.json({
        links
      })
    })
    .catch((err)=>{
      throw err
    })
})

router.post('/EditDetails',(req,res)=>{
  Link.findById(req.body.id)
    .select('-password')
    .exec()
    .then((link)=>{
      if(link.owner.equals(req.user.id)){
        if(link){
          res.json({
            link,
            status:'Good'
          })
        }else{
          res.json({
            status:'Bad'
          })
        }
      }else{
        res.json({
          status:'Forbidden'
        })
      }

    })
    .catch((err)=>{
      throw err
    })
})

router.delete('/delete',(req,res)=>{
  Link.findById(req.body.id)
    .exec()
    .then((link)=>{
      if(link){
        if(link.owner.equals(req.user.id)){
          link.remove()
            .then(()=>{
              res.json({
                status:'Good'
              })              
            })
        }else{
          res.json({
            status:"Bad Request"
          })

        }

      }else({
        status:'Bad'
      })
    })
    .catch((err)=>{
      throw err
    })
})

module.exports = router








