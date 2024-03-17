import { Schema, model } from "mongoose";

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, {versionKey: false, timestamps: true})

userSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  error.status = (name === 'MongoServerError' && code === 11000) ? 409 : 400; 
  next();
});

userSchema.pre("findOneAndUpdate", function(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

userSchema.post('findOneAndUpdate', (error, data, next) => {
  const { name, code } = error;
  error.status = (name === 'MongoServerError' && code === 11000) ? 409 : 400; 
  next();
});

const User = model("user", userSchema)

export default User;