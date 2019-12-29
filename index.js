#!/usr/bin/env node
const inquirer = require('inquirer')

const list = require('./list')
const search = require('./search')
const get = require('./get')

inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?',
            choices: [
                'Search a query over books',
                'Get ratings by book',
                new inquirer.Separator(),
                'Show full match list'
            ],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ])
    .then(answers => {
        if (answers.choice === 'search a query over books') {
            search()
        } else if (answers.choice === 'get ratings by book') {
            get()
        } else {
            list()
        }
    })