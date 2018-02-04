const express = require('express');
const router = express.Router();

var Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../model/Vote');

var pusher = new Pusher({
  appId: '468556',
  key: '644ba186ce6a6a54d54b',
  secret: '8c962f33eb988742aa9d',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req,res) => {
   Vote.find().then(votes => res.json({
     success : true,
     votes : votes
   }))
});
router.post('/', (req,res) =>
{
     //res.send('Poll');
     const newVote = {
       os : req.body.os,
       points : 1
     }

     new Vote(newVote).save().then(vote =>{
      pusher.trigger('os-poll', 'os-vote', {
        points : parseInt(vote.points),
        os : vote.os
      });
    return res.json({success:true, message : "Thank you for voting"});
     })

   
});

module.exports = router;