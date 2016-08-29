'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-web-x') + ' generator!'
    ));

  },

  writing: function () {
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js')
    );

    this.fs.copy(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json')
    );

    this.fs.copy(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('test'),
      this.destinationPath('test')
    );

    this.fs.copy(
      this.templatePath('src/scripts/controllers/demo.js'),
      this.destinationPath('src/scripts/controller/demo.js')
    );

    this.fs.copy(
      this.templatePath('src/scripts/services'),
      this.destinationPath('src/scripts/services')
    );

    this.fs.copy(
      this.templatePath('src/scripts/views'),
      this.destinationPath('src/scripts/views')
    );

    this.fs.copy(
      this.templatePath('src/scripts/app.js'),
      this.destinationPath('src/scripts/app.js')
    );

    this.fs.copy(
      this.templatePath('src/styles/app.scss'),
      this.destinationPath('src/styles/app.scss')
    );

    this.fs.copy(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html')
    );

  },

  install: function () {
    this.installDependencies();
  }
});
