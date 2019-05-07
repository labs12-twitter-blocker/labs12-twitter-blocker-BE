exports.up = function (knex, Promise) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("twitter_users", tbl => {
      tbl.string('twitter_users_id').unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
      tbl.string("twitter_id").notNullable().unique();
      tbl.integer("followers");
      tbl.integer("friends");
      tbl.string("description");
      tbl.string("profile_img"); //url to profile image
      tbl.string("screen_name"); //Twitter Handle
      tbl.string("name");
      tbl.string("location");
      tbl.datetime("created_at");
      tbl.boolean("protected");
      tbl.boolean("verified");
    })

    .createTable("app_users", tbl => {
      tbl.string('app_user_id').unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
      // tbl.foreign("twitter_id").references("twitter_id").inTable("twitter_users").onDelete('CASCADE');
      tbl.string("twitter_id").notNullable();
      tbl.string("screen_name").notNullable();

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

      tbl.string("token");
      tbl.string("token_secret");
      tbl.integer("upvotes");
      tbl.integer("downvotes");
      tbl.string("email");
      tbl.boolean("admin");
      tbl.boolean("deactivated");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("app_users")
    .dropTableIfExists("twitter_users");
};
