"use strict";

var Comment = require("../model/commentModel");
var Post = require("../model/appModel");

exports.list_all_comments = async function(req, res) {
  try {
    const comments = await Comment.getAllComments();

    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error" });
  }
};

exports.list_all_comments_from_post = async function(req, res) {
  try {
    const checkpost = await Post.getPostById(req.params.id);

    if (!checkpost[0]) {
      return res.status(400).send({ error: true, message: "post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error creating the post" });
  }

  try {
    const comments = await Comment.getAllCommentsByPostId(req.params.id);

    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "There was an error showing comments from post" });
  }
};

exports.list_all_comments_from_post_with_user = async function(req, res) {
  try {
    const checkpost = await Post.getPostById(req.params.id);

    if (!checkpost[0]) {
      return res.status(400).send({ error: true, message: "post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error creating the post" });
  }

  try {
    const comments = await Comment.getAllCommentsByPostIdWithUser(
      req.params.id
    );

    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "There was an error showing comments from post" });
  }
};

exports.show_a_comment = async function(req, res) {
  try {
    const comment = await Comment.getCommentById(req.params.commentid);

    res.status(200).send(comment[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error showing a comment" });
  }
};

exports.create_a_comment = async function(req, res) {
  if (!req.body.message || req.body.message.length > 1024) {
    return res.status(400).send({
      error: true,
      message:
        req.body.message.length > 1024
          ? "message too long, MAX(1024)"
          : "provide a message"
    });
  }

  var comment = {
    message: req.body.message,
    postid: req.params.id,
    userid: req.body.userid
  };

  if (!comment) {
    return res.status(400).send({ error: true, message: "provide a comment" });
  }

  try {
    const ncommnet = await Comment.createComment(comment);

    console.log(ncommnet.insertId);
    res.status(200).send(ncommnet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error creating a comment" });
  }
};

exports.edit_a_comment = async function(req, res) {
  if (!req.body.message || req.body.message.length > 1024) {
    return res.status(400).send({
      error: true,
      message:
        req.body.message.length > 1024
          ? "message too long, MAX(1024)"
          : "provide a message"
    });
  }

  var comment = {
    message: req.body.message,
    postId: req.params.id,
    userId: req.body.userid
  };

  if (!comment) {
    return res.status(400).send({ error: true, message: "provide a comment" });
  }

  try {
    const ccomment = await Comment.editComment(req.params.commentid, comment);
    res.status(200).send(ccomment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error updating a comment" });
  }
};

exports.delete_a_comment = async function(req, res) {
  var vcomment = {
    id: req.params.commentid,
    postId: req.params.id,
    userId: req.body.userid
  };

  try {
    const comment = await Comment.remove(vcomment);
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error removing a comment" });
  }
};
