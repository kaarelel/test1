const{Schema, model}= require('mongoose');

const userSchema= new Schema({
  userName:{type: String, required: true, maxLength: 50},
  email:{type: String, required: true, unique: true, maxlength: 150},
  password:{type: String, required: true},
  firstName:{type: String, required: true, maxLength: 75},
  lastName:{type: String, required: true, maxLength: 75},
  followedUsers: [{}],
  likedMemeIDs: [{}],
  createdAt:{type: Date, default: Date.now}
});

const User= model("User", userSchema);

module.exports= User;