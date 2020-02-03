"use strict";

var Post = require("../model/appModel");

exports.list_all_posts = async function(req, res) {
  try {
    const posts = await Post.getAllPost();

    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error" });
  }
};

exports.create_a_post = async function(req, res) {
  if (req.body.title.length > 20 || !req.body.title) {
    return res.status(400).send({
      error: true,
      message:
        req.body.title.length > 20
          ? "title too long, MAX(20)"
          : "provide a title"
    });
  }

  if (req.body.description.length > 20 || !req.body.description) {
    return res.status(400).send({
      error: true,
      message:
        req.body.description.length > 20
          ? "description too long, MAX(20)"
          : "provide a description"
    });
  }

  if (!req.body.content || req.body.content.length > 10000) {
    return res.status(400).send({
      error: true,
      message:
        req.body.content.length > 10000
          ? "content size too big"
          : "provide a content"
    });
  }

  var new_post = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    userid: req.body.userid
  };

  if (!new_post) {
    return res.status(400).send({ error: true, message: "provide post" });
  }

  //res.status(200).send({message: 'Ok', data: new_post});

  console.log(new_post);

  try {
    const post = await Post.createPost(new_post);

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error creating the post" });
  }
};

exports.read_a_post = async function(req, res) {
  try {
    const post = await Post.getPostById(req.params.postId);

    res.status(200).send(post[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error showing post" });
  }
};

exports.update_a_post = async function(req, res) {
  if (req.body.title.length > 20 || !req.body.title) {
    return res.status(400).send({
      error: true,
      message:
        req.body.title.length > 20
          ? "title too long, MAX(20)"
          : "provide a title"
    });
  }

  if (req.body.description.length > 20 || !req.body.description) {
    return res.status(400).send({
      error: true,
      message:
        req.body.description.length > 20
          ? "description too long, MAX(20)"
          : "provide a description"
    });
  }

  if (req.body.content.length > 10000 || !req.body.content) {
    return res.status(400).send({
      error: true,
      message:
        req.body.content.length > 10000
          ? "content size too big"
          : "provide a content"
    });
  }

  var update_post = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content
  };

  if (!update_post) {
    return res.status(400).send({ error: true, message: "provide post" });
  }

  try {
    const post = await Post.updateById(req.params.postId, update_post);

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error updating post" });
  }
};

exports.delete_a_post = async function(req, res) {
  try {
    const post = await Post.remove(req.params.postId);

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error removing a post" });
  }
};
