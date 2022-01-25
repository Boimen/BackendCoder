


const options = require('knex')({
    client : 'sqlite3',
    connection : {
        filename : "mydb.sqlite"
    },
    useNullAsDefault : true
})

module.exports = {options}