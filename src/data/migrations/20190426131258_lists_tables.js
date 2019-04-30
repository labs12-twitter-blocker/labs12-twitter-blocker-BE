
exports.up = function(knex, Promise) {
    return knex.schema

    .createTable("lists", tbl => {
        tbl.uuid("list_id").primary().unique();
        tbl.string("list_name", 255);
        tbl.datetime("list_creation_date");
        tbl.integer("member_count", 9);
        tbl.boolean("public");
        tbl.string("twitter_list_id", 100);
        tbl.string("description", 255);
        // tbl.string("twitter_id").references("twitter_users.twitter_id"); // Took away (*FK)
        tbl.string("twitter_id");
        tbl.integer("list_upvotes", 7);
        tbl.integer("list_downvotes", 7);
        tbl.boolean("is_block_list");
        tbl.boolean("created_with_hashtag");

        // Adds a json column, using the built-in json type in PostgreSQL, MySQL and SQLite, 
        // defaulting to a text column in older versions or in unsupported databases.
        // For PostgreSQL, due to incompatibility between native array and json types, 
        // when setting an array (or a value that could be an array) as the value of a 
        // json or jsonb column, you should use JSON.stringify() to convert your value to a 
        // string prior to passing it to the query builder, e.g.
            // knex.table('users')
            //   .where({id: 1})
            //   .update({json_data: JSON.stringify(mightBeAnArray)});
        tbl.json("created_with_hashtag_json");
        tbl.boolean("created_with_users");
        tbl.json("created_with_users_json");
        tbl.boolean("created_with_category");
        tbl.json("created_with_category_json");
        tbl.timestamps(true, true);
    })
    .createTable("list_followers", tbl => {
        tbl.uuid("list_followers_id").primary();
        tbl.uuid("list_id");
        tbl.foreign("list_id").references("list_id").inTable("lists").onDelete('CASCADE');
        tbl.string("twitter_user_id");
      });

};

exports.down = function(knex, Promise) {
    return knex.schema
      .dropTableIfExists("lists")
      .dropTableIfExists("list_followers");
  };
