import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({
      title,
      content,
      author: req.user.id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Failed to create post" });
  }
};

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.searchQuery || "";

  try {
    const skip = (page - 1) * limit;

    const filter = searchQuery ? { $text: { $search: searchQuery } } : {};

    const posts = await Post.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("author", "username email");

    const totalPosts = await Post.countDocuments(filter);

    res.json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch post" });
  }
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete post" });
  }
};
