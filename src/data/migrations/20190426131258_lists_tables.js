
exports.up = function(knex, Promise) {
    return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("lists", tbl => {
        tbl.string('list_id', 36).unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        tbl.string("list_name", 255);
        tbl.datetime("list_creation_date");
        tbl.integer("member_count", 9);
        tbl.integer("subscriber_count", 9),
        tbl.boolean("public");
        tbl.string("twitter_list_id", 100).unique();
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
    // .createTable("list_followers", tbl => {
    //     tbl.string('list_followers_id', 36).unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    //     tbl.string("twitter_list_id", 100);
    //     tbl.foreign("twitter_list_id").references("twitter_list_id").inTable("lists").onDelete('CASCADE');
    //     tbl.string("twitter_user_id");
    // })
    // .createTable("list_members", tbl => {
    //     tbl.string('list_members_id', 36).unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    //     tbl.string("twitter_list_id", 100);
    //     tbl.foreign("twitter_list_id").references("twitter_list_id").inTable("lists").onDelete('CASCADE');
    //     tbl.string("twitter_user_id");
    //     tbl.string("description", 255);
    //     tbl.string("screen_name", 16);
    //     tbl.string("name", 55);
    //     tbl.string("profile_img", 255);
    //   })
    .createTable("list_followers", tbl => {
        tbl.string('list_followers_id', 36).unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        tbl.string("twitter_list_id", 100);
        tbl.foreign("twitter_list_id").references("twitter_list_id").inTable("lists").onDelete('CASCADE');
        tbl.jsonb("list_followers");
    })
    .createTable("list_members", tbl => {
        tbl.string('list_members_id', 36).unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        tbl.string("twitter_list_id", 100);
        tbl.foreign("twitter_list_id").references("twitter_list_id").inTable("lists").onDelete('CASCADE');
        tbl.jsonb("list_members");
      });

};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists("list_followers")
        .dropTableIfExists("list_members")
        .dropTableIfExists("lists");
};
