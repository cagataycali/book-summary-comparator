
const Datastore = require('nedb')
const database = new Datastore({ filename: 'database.json', autoload: true })
const WordExtractor = require("word-extractor")
const fs = require('fs')

database.find({}, (err, books) => {
    if (err) {
        return
    }
    books.map(book => {
        const extractor = new WordExtractor();
        const extracted = extractor.extract(`sums/${book.file}`)
        extracted.then(doc => fs.writeFileSync(`books/${book.id}.txt`, doc.getBody()))
    })
})

