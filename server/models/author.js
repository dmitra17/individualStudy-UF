var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,

        validate: {
            validator: function(text) {
                if(text !== null && text.length > 0)
                    return true;
            },
            message: 'Title cannot be empty'
        }
    },

    description: {
        type: String,

        validate: {
            validator: function(text) {
                if(text !== null && text.length > 0)
                    return true;
            },
            message: 'Description cannot be empty'
        }
    },
    Type: {
        type: String,
        validate: {
            validator: function(text) {
        if (text !== null && text.length > 0 && (text=='methods' || text=='applications' ||
            text=='conferencePapers' || text=='presentations' || text=='softwareProjects' ||
            text=='softwareReleases' || text=='patents' || text=='books' || text=='bookChapter' ||
            text=='data' || text=='journalArticle'||
            text=='miscellaneous' || text=='newspaperArticle' || text=='teaching' || text=='software'))

                return true;
            },
            message: 'File must be one of the type mentioned above'
        }
    },
    file_date: {
        type: Date,
        required: true
    },

    folder: {
        type: String,
    },

    attachment: {
        type: String,
    },

    created: {
        type: Date,
        default: Date.now
    },
    fileid: mongoose.Schema.Types.ObjectId
});

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;