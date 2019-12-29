const list = require('./case_2.json')
const colors = require('colors')

module.exports = _ => list.map((row, index) => console.log(`${colors.inverse(index)} sıradaki kitap: ${row.book.name.trim().underline.red.bold}, sıralama puanı: ${row.total.toFixed(2).green}, ID: ${(row.book.id + '.txt').underline}`))