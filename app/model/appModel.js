"use strict";

var sql = require("./db");

var Post = function(post) {
  this.title = post.title;
  this.description = post.description;
  this.content = post.content;
};

Post.createPost = newPost => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "INSERT INTO posts set title =?, description =?, content =?, userid =?",
        [newPost.title, newPost.description, newPost.content, newPost.userid]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Post.getPostById = postId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "select users.username, posts.description, posts.title, posts.content from posts inner join users on posts.userid = users.id where posts.id = ?",
        postId
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Post.getAllPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from posts");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Post.updateById = (id, post) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "UPDATE posts SET content = ?, title = ?, description = ? WHERE id = ?",
        [post.content, post.title, post.description, id]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Post.remove = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("DELETE FROM posts WHERE id = ?", id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = Post;
