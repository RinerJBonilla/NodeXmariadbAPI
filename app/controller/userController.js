"use strict";

var User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var sql = require("../model/db");

exports.list_all_users = async function(req, res) {
  try {
    const users = await User.getAllUsers();

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error" });
  }
};

exports.create_a_user = async function(req, res) {
  if (!req.body.username) {
    return res.status(400).send({ message: "please provide a username" });
  }

  if (!req.body.password) {
    return res.status(400).send({ message: "please provide a password" });
  }

  if (req.body.username.length > 15 || !req.body.username) {
    return res.status(400).send({
      error: true,
      message:
        req.body.username.length > 15
          ? "username too long, MAX(15)"
          : "provide a username"
    });
  }

  if (req.body.password.length > 10 || !req.body.password) {
    return res.status(400).send({
      error: true,
      message:
        req.body.password.length > 10
          ? "password too long, MAX(10)"
          : "provide a password"
    });
  }

  var new_user = { username: req.body.username, password: req.body.password };

  //checking if user exists
  try {
    const user = await User.getUser(new_user);

    if (user) {
      return res.status(400).send({ message: "user already exists" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "There was an error creating the user" });
  }
  //checking if user exists

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);

  var hashuser = { username: new_user.username, password: hashPassword };

  try {
    const user = await User.createUser(hashuser);

    res.status(200).send("user created!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error creating the user" });
  }
};

exports.read_a_user = async function(req, res) {
  try {
    const user = await User.getUserById(req.params.userId);

    res.status(200).send(user[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error showing user" });
  }
};

exports.login_user = async function(req, res) {
  if (!req.body.username) {
    return res.status(400).send({ message: "please provide a username" });
  }

  if (!req.body.password) {
    return res.status(400).send({ message: "please provide a password" });
  }
  const dec = {
    username: req.body.username,
    password: req.body.password
  };
  try {
    const user = await User.getUser(dec);

    if (!user) {
      return res.status(400).send({ error: "incorrect credentianls " });
    }

    if (user.username !== req.body.username) {
      return res.status(400).send({ error: "incorrect credentianls" });
    }

    const validPass = bcrypt.compareSync(req.body.password, user.password);

    if (!validPass) {
      return res.status(400).send({ error: "incorrect credentianls" });
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.TOKEN_SECRET
    );
    const ras = {
      username: user.username,
      password: user.password,
      token: token
    };
    res.header("auth-token", token).send(ras);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error loggin the user" });
  }
};

exports.update_a_user = async function(req, res) {
  if (req.body.username.length > 15 || !req.body.username) {
    return res.status(400).send({
      error: true,
      message:
        req.body.username.length > 15
          ? "username too long, MAX(15)"
          : "provide a username"
    });
  }

  if (req.body.password.length > 10 || !req.body.password) {
    return res.status(400).send({
      error: true,
      message:
        req.body.password.length > 10
          ? "password too long, MAX(10)"
          : "provide a password"
    });
  }

  //check if username exists
  const checkuser = {
    username: req.body.username,
    password: req.body.password
  };

  try {
    const user = await User.getUser(checkuser);
    const userwith = await User.getUserById(req.params.userId);

    if (user && userwith[0].username !== req.body.username) {
      return res.status(400).send({ message: "user already exists" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "There was an error creating the user" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);

  var update_user = { username: req.body.username, password: hashPassword };

  if (!update_user) {
    return res.status(400).send({ error: true, message: "provide user" });
  }

  try {
    const post = await User.updateById(req.params.userId, update_user);

    const token = jwt.sign(
      { username: update_user.username, id: req.params.userId },
      process.env.TOKEN_SECRET
    );
    const ras = {
      username: update_user.username,
      password: update_user.password,
      token: token
    };
    console.log(post);
    res.header("auth-token", token).send(ras);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error updating a user" });
  }
};

exports.delete_a_user = async function(req, res) {
  try {
    const post = await User.remove(req.params.userId);

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error removing a user" });
  }
};

exports.show_my_posts = async function(req, res) {
  try {
    const posts = await User.getAllMyPosts(req.params.userId);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json({ error: "There was an error showing your posts" });
  }
};

exports.show_one_of_my_posts = async function(req, res) {
  try {
    const post = await User.getMyPost(req.params.userId, req.params.postId);
    res.status(200).send(post[0]);
  } catch (error) {
    res.status(500).json({ error: "There was an error showing your post" });
  }
};

exports.update_my_post = async function(req, res) {
  if (req.body.title.length > 50 || !req.body.title) {
    return res.status(400).send({
      error: true,
      message:
        req.body.title.length > 50
          ? "title too long, MAX(50)"
          : "provide a title"
    });
  }

  if (req.body.description.length > 50 || !req.body.description) {
    return res.status(400).send({
      error: true,
      message:
        req.body.description.length > 50
          ? "description too long, MAX(50)"
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
    const post = await User.updateMyPost(
      req.params.userId,
      req.params.postId,
      update_post
    );

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error updating your post" });
  }
};

exports.delete_my_post = async function(req, res) {
  try {
    const post = await Post.remove(req.params.userId, req.params.postId);

    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error removing your post" });
  }
};
