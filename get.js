
const inquirer = require('inquirer');
const colors = require('colors')
const books = require('./case_1.json')

module.exports = _ => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'book',
                message: 'Which book you want to compare?',
                choices: books.map(row => row.book.name)
            },
            {
                type: 'list',
                name: 'choice',
                message: 'How style you would like to see?',
                choices: ['Full list', 'Best match'],
                filter: function (val) {
                    return val.toLowerCase();
                }
            }
        ])
        .then(answers => {
            const selectedBook = books.find(row => row.book.name === answers.book)
            console.log(selectedBook.book.id.inverse, selectedBook.book.name.green, 'kitabı:')
            if (answers.choice === 'best match') {
                const rating = selectedBook.ratings[0]
                console.log(rating.book.id.inverse, rating.book.name.trim().underline.red, 'kitabı ile', rating.rating.toFixed(2).bold, 'oranında benziyor.')
            } else {
                selectedBook.ratings.map(rating => {
                    console.log(rating.book.id.inverse, rating.book.name.trim().underline.red, 'kitabı ile', rating.rating.toFixed(2).bold, 'oranında benziyor.')
                })
            }
        })
}