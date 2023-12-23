import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({
  // Name type, required
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  // Email type, required, unique, validate
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  // Password type, required, minLength, select
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLenght: [6, "Password must be at least 6 Characters"],
    select: false,
  },
  // Role type, enum, default
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  // PurchasedCourses type, array of course IDs
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  // Avatar public_id, url
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  // CreatedAt type, default
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.getResetToken = async function (password) {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", schema);
