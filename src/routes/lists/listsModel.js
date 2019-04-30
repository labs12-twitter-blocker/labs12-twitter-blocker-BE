const db = require('../../data/db.js');

module.exports = {
//   get lists/, /cool, /block,
get: function() {
    return db('lists')
},

// get /public
getPublic: function() {
    return db('lists')
    .where('public', true)
},

// get /private
getPrivate: function() {
    return db('lists')
    .where('public', false)
},

// get /:list_id
getById: function(listId) {
    return db('lists')
    .where('uuid', listId).first()
},


};
