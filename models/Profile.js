const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // create the relationship with user
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  hobbies: {  // we can use it to suggest accounts to follow
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
   social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);