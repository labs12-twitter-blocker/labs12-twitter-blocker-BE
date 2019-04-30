const db = require('../../data/db.js');

module.exports = {
//   get lists/, /cool, /block,
get: function() {
    return db('lists')
},

// get /public
get: function() {
    return db('lists')
    .where('public', true)
},

// get /private
get: function() {
    return db('lists')
    .where('public', false)
},

// get /:list_id
get: function(listId) {
    return db('lists')
    .where('uuid', listId)
},


};
