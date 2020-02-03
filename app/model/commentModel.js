"use strict";

var sql = require("./db");

var Comment = function(comment) {
  this.message = comment.message;
};

Comment.createComment = newComment => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "INSERT INTO comments set message =?, postid =?, userid =?",
        [newComment.message, newComment.postid, newComment.userid]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Comment.getCommentById = commentId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from comments where id=?", commentId);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Comment.getAllComments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from comments");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Comment.getAllCommentsByPostId = postId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from comments where postid=?", postId);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Comment.getAllCommentsByPostIdWithUser = postId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "select comments.id, comments.message, users.username from comments inner join users on users.id = comments.userid where comments.postid =?",
        postId
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Comment.editComment = (id, comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "UPDATE comments SET message =? WHERE id =? AND postid =? AND userid =?",
        [comment.message, id, comment.postId, comment.userId]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

Comment.remove = comment => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "DELETE FROM comments WHERE id =? AND postid =? AND userid =?",
        [comment.id, comment.postId, comment.userId]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = Comment;
