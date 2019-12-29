const cliProgress = require('cli-progress')
const { compareTwoStrings } = require('./compare')

const unorderedList = []
const fs = require('fs')
const db = require('./db.json')
const loader = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

loader.start(db.length, 0);

const read = file => {
    try {
        return fs.readFileSync(`./books/${file}.txt`, 'utf-8')
    } catch (err) {
        return ""
    }
}

const start = () => {
    db.map(book => {
        unorderedList.push(compare(book))
        loader.increment();
    })
    loader.stop()
    const orderedList = unorderedList.sort((a, b) => b.total - a.total);

    const data = orderedList.map(list => ({
        book: list.book,
        total: list.total,
        ratings: list.ratings.sort((a, b) => b.rating - a.rating)
    }))
    // Without the books rating conjugation other books rating.
    const data2 = orderedList.map(list => ({ book: list.book, total: list.total }))

    fs.writeFileSync('case_1.json', JSON.stringify(data, null, 2))
    fs.writeFileSync('case_2.json', JSON.stringify(data2, null, 2))
    process.exit(1)
}

const compare = (book) => {
    const otherBooks = db.filter(otherBook => otherBook.id !== book.id)
    const myBookData = read(book.id)
    let total = 0
    const ratings = otherBooks.map(otherBook => {
        try {
            const otherBookData = read(otherBook.id)
            const result = compareTwoStrings(myBookData, otherBookData);
            total += result
            return { book: otherBook, rating: result }
        } catch (err) { }
    })
    return { book, ratings, total }
}

start()