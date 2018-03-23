const express = require('express');

const router = new express.Router();

//following are for attachment file upload/download
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
const { Readable } = require('stream');

var mongoose = require('mongoose');
var mongodb = mongoose.mongo;
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const db =  mongoose.connection.db;
var models = require('../models/models');
var Attachment  = mongoose.model('Attachment');
var Author = mongoose.model('Author');

router.post('/records', (req, res) => {
  console.log("get /records called in server" + JSON.stringify((req.body.types)));
  var types = req.body.types; //array of strings

  Author.
  find({
    Type: { $in: types }
  }).
  sort({ file_date: -1 }).
  exec((err, records)=>{
    if(err)
      res.send(err);
    console.log("records:- "+records);
    res.json(records);
  });
});

router.get('/attachments', (req, res) => {
console.log("get /attachment called in server");
var attachResp = {attach: []};
Attachment.find({}, (err, foundattachments)=> {
    if(err)
        res.send(err);
      //delete workspace[0].MemberUserIds[0]["password"]; //remove passwords from response
      //console.log("----WS----: " + JSON.stringify(workspace));
      attachResp.attach = foundattachments
      res.json(attachResp);
});

});

router.get('/attachment/:id', (req, res) => {
  console.log("getAttachment() of controller called: " + req.params.id);
  try {
    var fileid = new ObjectID(req.params.id);
  } catch(err) {
    return res.status(400).json({ message: "Invalid fileid in URL parameter" });
  }

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: 'attachment'
  });

  let downloadStream = bucket.openDownloadStream(fileid);

  downloadStream.on('data', (chunk) => {
    console.log("getAttachment response sent");
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});


module.exports = router;