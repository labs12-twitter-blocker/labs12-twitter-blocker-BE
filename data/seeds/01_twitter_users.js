const data = require('./../MOCK_DATA')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('twitter_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('twitter_users').insert(data);
    });
};
