# ENV VARIABLES

TWITTER_CONSUMER_KEY= twitter api key
TWITTER_CONSUMER_SECRET= twitter api secret
SESSION_SECRET= make it up

# Endpoints

Documentation for the endpoints on the backend server

# USERS:

- GET
  - GET /users - All users
    - GET /users/premium - All paying users
    - GET /users/followers/:number - Get all users with follower # > :number
    - GET /users/points/ - Get all users ordered by number of points
  - GET /users/:user_id - Get a users by user_ID
- POST
  - POST /users/ - Add a new user
- PUT
  - PUT /users/:user_id - Edit a user by user_ID
- DELETE
  - DELETE /users/:user_id - Delete a user by user_ID

# /LISTS:

- GET:
  - GET /lists - All lists
    - GET /lists/public - All Public Lists
    - GET /lists/private - All Private Lists
    - GET /lists/block - All Block Lists
    - GET /lists/cool - All Cool Lists
  - GET /lists/:list_id - Single List by List ID
  - GET /lists/creator/:user_id - All Lists Created by the user_ID
    - GET /lists/creator/public/:user_id All Public Lists by List Creator user_ID
    - GET /lists/creator/private/:user_id - All Private Lists by List Creator user_ID
    - GET /lists/creator/block/:user_id - All Block Lists by List Creator user_ID
    - GET /lists/creator/cool/:user_id - All Cool Lists by List Creator user_ID
  - GET /lists/subscribers/:list_id - Returns all users subscribed to a list by list_ID
  - GET /lists/points - All lists ordered by number of points
  - GET /lists/timeline/:list_id - Gets the Twitter Timeline for the selected list_id
- POST
  - POST /lists/ - Create a new list (Create Block/Cool List; Public/Private List)
  - POST /lists/:list_id/follow/:user_id - Send JSON with user_id to subscribe that user to a list by list_id
- PUT
  - PUT /lists/:list_id - Update a List by the List_ID
- DELETE
  - DELETE /lists/:id - Delete a list by the List_ID
  - DELETE /lists/:list_id/unfollow/:user_id - Unfollow a list by list_id and user_id

# TWEETS:

- GET
  - GET /tweets - Get list of tweets
  - GET /tweets/:tweet_id - Tweet by ID
  - GET /tweets/likes - Gets all tweets ordered by likes
  - GET /tweets/retweets - Gets all tweets ordered by retweets
- POST
  - POST /tweets - Send a new Tweet
- PUT

  - You cant edit tweets

- DELETE
  - DELETE /tweets/:tweet_id - Tweet by ID

# STRIPE:

- GET

  - All Paying Users
  - All Non-Paying Users
  - All Delinquent Accounts

  Users by ID

- POST

  User by ID

- PUT

  User by ID

- DELETE

  User by ID



#########################################


# App Users Table Schema:
| Schema Name             | Twitter API key | db name     | DataType  |
| ----------------------- | --------------- | ----------- | --------- |
| User ID	                |                 |	app_user_id	| uuid      |
| (*FK) Twitter ID	      | id	            |twitter_id	  | string    |
| Twitter Handle	        | screen_name     |	screen_name	| string    |
| Sign Up Date	          |                 |	created_at  |	date/time 
| Update Date             |                 |	updated_at  |	date/time |
| Paying Customer	        |                 |	is_paying	  | bool      |
| (*FK)Stripe Customer ID |                 |	stripe_id   |	int       |
| Access Token?           |	                |	token	      | string    |
| Total Upvote Points     |	                |	upvotes	    | int       |
| Total Downvote Points   |	                |	downvotes   |	int       |
| Email	                  |                 |	email	      | string    |
| Is Admin	              |                 |	admin	      | bool      |
| Deactivated             |                 |	deactivated |	bool      |

---

| Name                      | Twitter API name        | db name          | DataType  |
| ------------------------- | ----------------------- | ---------------- | --------- |
| \*Twitter Users ID        |                         | twitter_users_id | UUID      |
| Twitter ID                | id_str                  | twitter_id       | string    |
| Twitter Followers Count   | followers_count         | followers        | int       |
| Twitter Friends Count     | friends_count           | friends          | int       |
| Description               | description             | description      | string    |
| Profile Image URL         | profile_image_url_https | profile_img      | string    |
| Twitter handle            | screen_name             | screen_name      | string    |
| Twitter Name              | name                    | name             | string    |
| Location                  | location                | location         | string    |
| Creation Date [Date/Time] | created_at              | created_at       | date/time |
| Update Date [Date/Time]   |                         | updated_at       | date/time |
| Protected                 | protected               | protected        | bool      |
| Verified                  | verified                | verified         | bool      |
