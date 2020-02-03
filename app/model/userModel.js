"use strict";

var sql = require("./db");

var User = function(user) {
  this.username = user.username;
  this.password = user.password;
};

User.createUser = newUser => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("INSERT INTO users set username=?, password=?", [
        newUser.username,
        newUser.password
      ]);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.checkUser = user => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from users where username =?", user);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.getUserById = userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from users where id =?", userId);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.getUser = user => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await sql.query(
        "select * from users where username =?",
        user.username
      );
      resolve(result[0]);
    } catch (error) {
      reject(error);
    }
  });
};

User.getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from users");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.updateById = (id, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "UPDATE users SET username = ?, password = ? WHERE id = ?",
        [user.username, user.password, id]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.remove = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("DELETE FROM users WHERE id = ?", id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.getAllMyPosts = userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("select * from posts where userid =?", userId);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.getMyPost = (userId, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "select * from posts where userid =? AND id =?",
        [userId, postId]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.updateMyPost = (uid, pid, post) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query(
        "UPDATE posts SET content = ?, title = ?, description = ? WHERE userid = ? AND id =?",
        [post.content, post.title, post.description, uid, pid]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

User.removeMyPost = (uid, pid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = sql.query("DELETE FROM posts WHERE userid = ? AND id =?", [
        uid,
        pid
      ]);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = User;
