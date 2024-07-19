const mongoose = require('mongoose');
const { Schema } = mongoose;

// User
const userSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role'},
  last_login: { type: String },
  token: { type: String },
  layer: { type: String }
  
});

// REMOVED THIS BECAUSE OF NOT USING ANOTHER METHOD

// userSchema.pre('save', async function(next) {
//   if (this.isModified('password') || this.isNew) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next();
//   }
// });


const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
