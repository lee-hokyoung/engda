const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  user_pw: String,
  user_name: String,
  user_type: String,
  admin: { type: Boolean, default: false },
  user_phone: String,
  phone1: String,
  phone2: String,
  user_email: String,
  gender: String, //  남성 : male, 여성 : female
  birth: String,

  snsId: String,
  provider: String,
  profile_image: String,
  thumbnail_image: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema, "user");
