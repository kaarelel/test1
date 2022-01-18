const{Schema, model}= require('mongoose');
var mongoose= require('mongoose');

const memeSchema= new Schema({
  memeID:{type: Number, required: true, unique: true, default: Date.now},
  userName:{type: mongoose.Schema.Types.String, required: true, ref: "User"},
  memeName:{type: String, required: true, maxLength: 75 },
  imageURL:{type: String},
  memeLikeCount:{type: Number},
  createdAt:{type: Date, default: Date.now},
});

const Meme= model("Meme", memeSchema);

module.exports= Meme;