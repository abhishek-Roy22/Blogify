import { createHmac, randomBytes } from 'node:crypto';
import { model, Schema } from 'mongoose';
import { createToken } from '../services/generateToken.js';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgURL: {
      type: String,
      default: '/images/default.png',
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10); // Generate Salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt

  next();
});

userSchema.static('matchPassword', async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found');

  const hashedPassword = user.password;

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    throw new Error('Invalid Password');
  }

  const token = createToken(user);
  return token;
});

export default model('User', userSchema);
