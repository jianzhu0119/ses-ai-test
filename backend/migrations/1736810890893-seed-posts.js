"use strict";

import dotenv from "dotenv";
import { initialPosts } from "../consts/index.js";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const up = async function (next) {
  dotenv.config();
  await connectDB();
  for (const post of initialPosts) {
    const existingPost = await Post.findOne({ title: post.title });
    if (!existingPost) {
      const user = await User.findOne({ email: post.author });

      if (user) {
        const newPost = new Post({
          title: post.title,
          content: post.content,
          author: user._id,
        });

        await newPost.save();
        console.log(`Post "${post.title}" created`);
      } else {
        console.log(
          `User with email ${post.author} not found for post "${post.title}"`
        );
      }
    } else {
      console.log(`Post "${post.title}" already exists`);
    }
  }
};

export const down = async function (next) {
  dotenv.config();
  await connectDB();
  await Post.deleteMany({});
};
