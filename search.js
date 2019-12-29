const inquirer = require('inquirer')
const colors = require('colors')
const FlexSearch = require("flexsearch")
const index = new FlexSearch("speed")

const fs = require('fs')
const db = require('./db.json')

const read = file => {
    try {
        return fs.readFileSync(`books/${file}.txt`, 'utf-8')
    } catch (err) {
        return ""
    }
}

// Index all docs.
db.map(row => index.add(row.id, read(row.id)))

module.exports = _ => {
    console.log('Search indexing might be take time...')
    inquirer.prompt([
        {
            type: 'input',
            name: 'query',
            message: "What's your query",
            validate: function (value) {
                if (value.trim().length > 0) {
                    return true
                }

                return 'Please enter a valid query'
            }
        }
    ]).then(async answers => {
        const { query } = answers;
        const result = await index.search(query);
        const bestMatch = db.find(row => row.id == result[0])
        if (bestMatch) {
            console.log(query.red.bold, 'en çok şu kitap ile eşleşti', bestMatch.name.trim().underline.green, (bestMatch.id + '.txt').inverse)
        } else {
            console.log('Bulunamadı.'.bold.red)
        }
    })
}