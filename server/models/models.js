'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var AttachmentSchema = new Schema({
  sectionid: {
    type: String,
    Required: true
  },
  sectionname: String,
  attachment: {
    type: Schema.Types.ObjectId,
    ref: 'UploadedFile'
  },
  attachmentname: String,
  filename: String,
  uploaddate: { type: Date, default: Date.now }
});



var Attachment  = mongoose.model('Attachment', AttachmentSchema);
var UploadedFile = mongoose.model("UploadedFile", new Schema({}, {strict: false}), "attachment.files" );




module.exports = {
    Attachment: Attachment,
};