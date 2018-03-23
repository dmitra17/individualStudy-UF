const express = require('express');
var csv = require('fast-csv');
var Author = require('../models/author');
var fs = require('fs');

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

router.get('/dashboard', (req, res) => {
console.log("/dashboard called in server");
  res.status(200).json({
    message: "Logged In"
  });
});



router.post('/attachment/:id/:attachmentname', (req, res) => {
    console.log("/attachment called in server");
  upload.single('attachment')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.file) {
      return res.status(400).json({ message: "No file in request body" });
    }

    let fileName = req.file.originalname;

    // Covert buffer to Readable Stream
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(req.file.buffer);
    readablePhotoStream.push(null);
    console.log("************: " + req.file.originalname);
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'attachment'
    });

    let uploadStream = bucket.openUploadStream(fileName);
    let fileid = uploadStream.id;
    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      var sectionid = req.params.id;
      var attachmentname = req.params.attachmentname;
      var newAttachment = new models.Attachment();
      newAttachment.sectionid = sectionid;
      newAttachment.attachment = fileid;
      newAttachment.attachmentname = attachmentname;
      newAttachment.filename = fileName;
        newAttachment.save(function(err, savedattachment) {
            if (err)
                return res.status(500).json({ message: "newAttachment saving error" });
            return res.status(200).json(savedattachment);
        });


    });
  });
});

router.post('/deleteattachment/:id', (req, res) => {
    Attachment.remove({ _id: req.params.id }, function (err) {
    if (err)
        return res.status(500).json({ message: "attachment deletion error" });
    return res.status(200).json({message: "attachment deletion success"});
});
});

router.post('/deleterecord/:id', (req, res) => {
    Author.remove({ _id: req.params.id }, function (err) {
    if (err)
        return res.status(500).json({ message: "record deletion error" });
    return res.status(200).json({message: "record deletion success"});
});
});


router.post('/excelparse', (req, res) => {
    console.log("/excelparse called in server");

    upload.single('attachment')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.file) {
      return res.status(400).json({ message: "No file in request body" });
    }

    let authorFile = req.file;
    console.log(authorFile);
    var authors = [];

  csv
   .fromString(authorFile.buffer.toString(), {
     headers: true,
     ignoreEmpty: true
   })
   .on("data", function(data){
     data['_id'] = new mongoose.Types.ObjectId();

     authors.push(data);
   })
   .on("end", function(){
     Author.create(authors, function(err, documents) {
      if (err) throw err;

      //console.log("helloooo::- " + documents);
      documents.map((doc)=>{
        //console.log(doc.attachment);
        var filepath = doc.folder+"\\"+doc.attachment;
        fs.readFile(filepath, function(err, data) {
          console.log(data);

          let fileName = doc.attachment;  //from CSV

    // Covert buffer to Readable Stream
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(data);
    readablePhotoStream.push(null);
    console.log("************: " + fileName);
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'attachment'
    });

    let uploadStream = bucket.openUploadStream(fileName);
    let fileid = uploadStream.id;
    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      //var sectionid = req.params.id;
      var attachmentname = fileName;
      var newAttachment = new models.Attachment();
      //newAttachment.sectionid = sectionid;
      newAttachment.attachment = fileid;
      newAttachment.attachmentname = attachmentname;
      newAttachment.filename = fileName;
        newAttachment.save(function(err, savedattachment) {
            if (err)
                return res.status(500).json({ message: "newAttachment saving error" });

            Author.update(
              {_id: doc._id},
              {fileid : fileid },   //ID of attachment.files
              {multi:true},
              function(err, numberAffected){  }
            );

            //return res.status(200).json(savedattachment);
        });


    });



        });
      });

      return res.status(200).json({message: "CSV parsed"});
      //res.send(authors.length + ' authors have been successfully uploaded.');
     });
   });

  });







});



module.exports = router;