var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Pledge = mongoose.model('Pledges');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

router.get('/pledges', function(req, res, next) {
  Pledges.find(function(err, pledges){
    if(err){ return next(err); }
    res.json(pledges);
  });
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

router.post('/pledge', function(req, res, next) {
  var comment = new Pledge(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

router.get('/comments/:comment', function(req, res) {
  res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.put('/pledge/:pledge', function(req, res, next) {
  req.pledge.pledge(function(err, pledge){
    if (err) { return next(err); }
    res.json(pledge);
  });
});

router.delete('/comments/:comment', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});

module.exports = router;
