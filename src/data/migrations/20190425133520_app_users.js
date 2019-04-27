exports.up = function(knex, Promise) {
  return knex.schema

    .createTable("twitter_users", tbl => {
      tbl.uuid("twitter_users_id").primary();
      tbl.string("twitter_id", 255).notNullable().unique();
      tbl.integer("followers", 9);
      tbl.integer("friends", 9);
      tbl.string("description", 255);
      tbl.string("profile_img", 255);
      tbl.string("screen_name", 16); //Twitter Handle
      tbl.string("name", 55);
      tbl.string("location", 55);
      tbl.datetime("created_at");
      tbl.boolean("protected");
      tbl.boolean("verified");
    })

    .createTable("app_users", tbl => {
      //tbl.increments();
      //tbl.uuid('id').unique().defaultTo(this.db.raw('public.gen_random_uuid()'))
      tbl.uuid("app_user_id").primary();
      tbl.foreign("twitter_id").references("twitter_id").inTable("twitter_users").onDelete('CASCADE');
      tbl.string("twitter_id", 255).notNullable();
      tbl.string("screen_name", 50).notNullable();

      // Adds created_at and updated_at columns on the database,
      // setting each to datetime types. When true is passed as
      // the first argument a timestamp type is used instead.
      // Both colums default to being not null and using the current
      // timestamp when true is passed as the second argument.
      // Note that on MySQL the .timestamps() only have seconds
      // precision, to get better precision use the .datetime
      // or .timestamp methods directly with precision.
      // table.timestamps([useTimestamps], [defaultToNow])
      tbl.timestamps(true, true);
      tbl.boolean("is_paying");

      // Not adding Stripe FK yet.
      // tbl.integer("stripe_id", 6);

      tbl.string("token", 255);
      tbl.integer("upvotes", 6);
      tbl.integer("downvotes", 6);
      tbl.string("email", 255);
      tbl.boolean("admin");
      tbl.boolean("deactivated");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("app_users")
    .dropTableIfExists("twitter_users");
};
