const fs = require('fs')
const Datastore = require('nedb')

const list = fs.readFileSync('list.txt').toString()
const ref = fs.readFileSync('ref.txt').toString()

const db = new Datastore({ filename: 'db', autoload: true });
const database = new Datastore({ filename: 'database.json', autoload: true });

ref.split('\n').map(piece => {
    const data = piece.split(' ')
    const file = id;
    const name = data.join(' ').toLocaleLowerCase('tr')
    let id = data.shift()
    id = +(id.replace('.doc', ''))
    db.insert({ id, name })
})
