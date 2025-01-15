"use strict";

import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import { initialUsers } from "../consts/index.js";
import connectDB from "../config/db.js";

export const up = async function (next) {
  dotenv.config();
  await connectDB();
  for (const user of initialUsers) {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(`${user.username} created`);
    } else {
      console.log(`${user.username} already exists`);
    }
  }
};

export const down = async function (next) {
  dotenv.config();
  await connectDB();
  await User.deleteMany({});
};
