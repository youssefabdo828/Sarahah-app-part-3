import { set } from "mongoose";
import mongoose from "mongoose";
import { genderEnum , roleEnum } from "../../common/enum/constants.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First name must be at least 3 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
    lowercase: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last name must be at least 3 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    index: { name: "email_index_unique", unique: true },
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: Object.values(genderEnum),
    default: genderEnum.MALE
  },
  age: {
    type: Number,
    min: [16, "Age must be at least 16"],
    max: [60, "Age must be at most 60"],
    required: true
  },
  profilepicture: String,

  phoneNumber: String,
  role: {
    type: String,
    enum: Object.values(roleEnum),
    default: roleEnum.USER
  }
}, {
  virtuals: {
    fullName: {
      get: function () {
        return `${this.firstName} __ ${this.lastName}`;
      }
    }

  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
});




const User = mongoose.model("User", userSchema);

export default User;