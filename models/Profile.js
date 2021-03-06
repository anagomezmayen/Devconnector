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
  skills:{
    type:[String],
    required:true
  },
   experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  // followers: [ // followers
  //   {
  //     user:{
  //     type: Schema.Types.ObjectId,
  //     ref:'users',
  //     }
  //   }
  // ],
   bio: {
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