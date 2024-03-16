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
   owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, {versionKey: false, timestamps: true})

userSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

userSchema.pre("findOneAndUpdate", function(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

userSchema.post('findOneAndUpdate', (error, data, next) => {
  error.status = 400;
  next();
});

const User = model("user", userSchema)

export default User;