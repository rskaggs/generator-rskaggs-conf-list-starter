'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome! This generator will help you create a starter conference list using next.js`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'registryUserName',
        message: 'What is your npm registry username?',
        default: ``
      },
      {
        type: 'input',
        name: 'registryPackageName',
        message: 'What is your Package Name?',
        default: this.appname.replace(/\s+/g, '-').toLowerCase()
      },
      {
        type: 'input',
        name: 'registryPackageDesc',
        message: 'Package Description?',
        default: `My awesome conference list!`
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'What is your name?',
        default: ``
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const packageDependencies = {
      "isomorphic-unfetch": "^3.0.0",
      "moment": "^2.24.0",
      "next": "^9.1.6",
      "react": "^16.12.0",
      "react-dom": "^16.12.0",
      "styled-components": "^4.4.1"
    }
    
    const packageDevDependencies = {
      "@babel/core": "^7.7.7"
    }
    
    const packageFile = {
        "name": `@${this.props.registryUserName}/${this.props.registryPackageName}`,
        "version": "0.0.1",
        "description": this.props.registryPackageDesc,
        "main": "app.js",
        "scripts": {
          "dev": "next",
          "build": "next build",
          "export": "next export",
          "start": "next start"
        },
        "author": `${this.props.authorName}`,
        "license": "ISC",
        "dependencies": packageDependencies,
        "devDependencies": packageDevDependencies,
    };

    this.fs.extendJSON(this.destinationPath('package.json'), packageFile);

    this.fs.copy(
      this.templatePath('./data'),
      this.destinationPath('./data')
    );

    this.fs.copy(
      this.templatePath('./pages'),
      this.destinationPath('./pages')
    );

    this.fs.copy(
      this.templatePath('next.config.js'),
      this.destinationPath('next.config.js')
    );

    this.fs.copy(
      this.templatePath('babelrc.config'),
      this.destinationPath('.babelrc')
    );

  }

  install() {
    this.installDependencies({bower: false});
  }
};
