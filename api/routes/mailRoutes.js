'use strict';
module.exports = function(app) {
  var mailController = require('../controllers/mailController');

  // todoList Routes
  app.route('/mail')
    .post(mailController.send_a_mail);

};