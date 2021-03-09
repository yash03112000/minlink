const express = require('express')
const router = express.Router()
const Link = require('../models/Link')
const User = require('../models/User')
var bcrypt = require('bcryptjs');


router.get('/:id',(req,res)=>{
    Link.findOne({uniqueid:req.params.id})
        .exec()
        .then((link)=>{
            // console.log(link);
            if(!link){
                res.status(404).json({
                    status:"Not Found"
                })
            }else{
                if(link.status==='Public'){
                    res.json({
                        status:"Public",
                        link:link.link
                    })
                }else if(link.status==='Friends'){
                    res.json({
                        status:"Friends",
                    })
                }else{
                    if(req.isAuthenticated()){
                        if(link.owner.equals(req.user.id)){
                            res.json({
                                status:'Private',
                                result:'Success',
                                link:link.link
                            })
                        }else{
                            res.json({
                                status:'Private',
                                result:'Reject'
                            })
                        }
                    }else{
                        res.json({
                            status:'Private',
                            result:'signin'
                        })
                    }
                }
            }
        })
        .catch((err)=>{throw err})
})


router.get('/Flog/:id',(req,res)=>{
    Link.findOne({uniqueid:req.params.id})
        .exec()
        .then((link)=>{
            // console.log(link);
            if(!link){
                res.status(404).json({
                    status:"Not Found"
                })
            }else{
                if(link.status!=='Friends'){
                    res.status(404).json({
                        status:"Not Found"
                    })
                }else{
                    User.findById(link.owner)
                        .exec()
                        .then((user)=>{
                            if(!user){
                                res.status(404).json({
                                    status:"User Not Found"
                                })
                            }else{
                                res.json({
                                    username:user.username,
                                    title:link.title
                                })
                            }
                        })
                        .catch((err)=>{throw err})
                }
            }
        })
        .catch((err)=>{throw err})
})


router.post('/login',(req,res)=>{
    Link.findOne({uniqueid:req.body.id})
        .exec()
        .then((link)=>{
            console.log(link);
            if(!link){
                res.status(404).json({
                    status:"Not Found"
                })
            }else{
                if(link.status!=='Friends'){
                    res.status(404).json({
                        status:"Not Found"
                    })
                }else{
                    bcrypt.compare(req.body.password,link.password).then((isMatch) => {
                        if(!isMatch){
                            res.json({
                                status:"Failed",
                                msg:"Wrong Credentials"
                            })
                        }
                       else{
                        res.json({
                            status:"Success",
                            link:link.link
                        })
                       }
                      });
                }
            }
        })
        .catch((err)=>{throw err})
})

module.exports = router