"use strict";
const verify = require("../middlewares/verifyToken");

module.exports = function(app) {
  var blog = require("../controller/appController");
  var users = require("../controller/userController");
  var comments = require("../controller/commentController");

  // posts Routes
  app
    .route("/posts")
    .get(verify, blog.list_all_posts)
    .post(verify, blog.create_a_post);

  app
    .route("/posts/:postId")
    .get(verify, blog.read_a_post)
    .put(verify, blog.update_a_post)
    .delete(verify, blog.delete_a_post);

  // users Routes
  app
    .route("/users")
    .get(verify, users.list_all_users)
    .post(verify, users.create_a_user);

  app
    .route("/users/:userId")
    .get(verify, users.read_a_user)
    .put(verify, users.update_a_user)
    .delete(verify, users.delete_a_user);

  app.route("/users/:userId/posts").get(verify, users.show_my_posts);

  app
    .route("/users/:userId/posts/:postId")
    .get(verify, users.show_one_of_my_posts)
    .put(verify, users.update_my_post)
    .delete(verify, users.delete_my_post);

  app.route("/login").post(users.login_user);

  app.route("/register").post(users.create_a_user);

  // comments routes

  app.route("/comments").get(verify, comments.list_all_comments);

  app
    .route("/posts/:id/comments")
    //.get(verify, comments.list_all_comments_from_post)
    .get(verify, comments.list_all_comments_from_post_with_user)
    .post(verify, comments.create_a_comment);

  app
    .route("/posts/:id/comments/:commentid")
    .get(verify, comments.show_a_comment)
    .put(verify, comments.edit_a_comment)
    .delete(verify, comments.delete_a_comment);
};
