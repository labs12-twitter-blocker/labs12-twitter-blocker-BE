# Endpoints
Endpoints for the twitter blocker follower project.

**/--------------------------------------------/ USERS /-----------------------------------------/**

## **Get All App Users **

_url_: `/users/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
{
    "users": [???]
}
```

## **Get App User By Twitter ID **

_url_: `/users/:twitter_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
{
    [???]
}
```

// GET /users/points/ 
// Get all users ordered by number of points

// [X] GET /users/followers/:user_id
// [X] Get all the followers of a user by user_id

// [X] GET /users/friends/:user_id
// [X] Get all the friends of a user by user_id

## **Get Paying App Users **

_url_: `/users/premium/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
{
    [???]
}
```

## ** Add Twitter User to twitter_users, lists, and list_followers Tables **

_url_: `/users/mega/:twitter_handle`

_http method_: **[POST]**

#### Response

##### 201 (created)

###### Example response

```
{}
```

// POST /users/
// Add a new user

// [X] POST /users/tweets/:twitter_handle
// [X] Add all a users tweets to the tweets table

// [X] POST /users/followers -
// [X] All all a users followers to the twitter_followers table


// PUT /users/:user_id
// Edit a user by user_id


## ** Delete App User by twitter_id **

_url_: `/users/:twitter_id`

_http method_: **[DELETE]**

#### Response

##### 204 (deleted)

###### Example response

```
{}
```


**/--------------------------------------------/ LISTS /-----------------------------------------/**

## **Get All Lists in Our DB **

_url_: `/lists/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "80456006-3679-4786-ae89-ec13557ded67",
        "list_name": "Invisible college",
        "list_creation_date": "2018-12-26T02:45:58.000Z",
        "member_count": 19,
        "subscriber_count": 102,
        "public": true,
        "twitter_list_id": "1077757384838107136",
        "description": "",
        "twitter_id": "466880049",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.099Z",
        "updated_at": "2019-05-01T17:00:22.099Z"
    },
    {
        "list_id": "0233ad07-8924-49b0-828f-bdfb6eae36fe",
        "list_name": "YC team",
        "list_creation_date": "2015-03-24T02:53:48.000Z",
        "member_count": 26,
        "subscriber_count": 630,
        "public": true,
        "twitter_list_id": "199798310",
        "description": "the YC team! (the ones that tweet, anyway)",
        "twitter_id": "1605",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.098Z",
        "updated_at": "2019-05-01T17:00:22.098Z"
    },
    ...
]
```

## **Get All Public Lists in Our DB **

_url_: `/lists/public/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "80456006-3679-4786-ae89-ec13557ded67",
        "list_name": "Invisible college",
        "list_creation_date": "2018-12-26T02:45:58.000Z",
        "member_count": 19,
        "subscriber_count": 102,
        "public": true,
        "twitter_list_id": "1077757384838107136",
        "description": "",
        "twitter_id": "466880049",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.099Z",
        "updated_at": "2019-05-01T17:00:22.099Z"
    },
    {
        "list_id": "0233ad07-8924-49b0-828f-bdfb6eae36fe",
        "list_name": "YC team",
        "list_creation_date": "2015-03-24T02:53:48.000Z",
        "member_count": 26,
        "subscriber_count": 630,
        "public": true,
        "twitter_list_id": "199798310",
        "description": "the YC team! (the ones that tweet, anyway)",
        "twitter_id": "1605",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.098Z",
        "updated_at": "2019-05-01T17:00:22.098Z"
    },
    ...
]
```

## **Get All Private Lists in Our DB **

_url_: `/lists/private/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    ????
]
```

## **Get All Block Lists in Our DB **

_url_: `/lists/block/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    ????
]
```

## **Get All Cool Lists in Our DB **

_url_: `/lists/cool/`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "80456006-3679-4786-ae89-ec13557ded67",
        "list_name": "Invisible college",
        "list_creation_date": "2018-12-26T02:45:58.000Z",
        "member_count": 19,
        "subscriber_count": 102,
        "public": true,
        "twitter_list_id": "1077757384838107136",
        "description": "",
        "twitter_id": "466880049",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.099Z",
        "updated_at": "2019-05-01T17:00:22.099Z"
    },
    {
        "list_id": "0233ad07-8924-49b0-828f-bdfb6eae36fe",
        "list_name": "YC team",
        "list_creation_date": "2015-03-24T02:53:48.000Z",
        "member_count": 26,
        "subscriber_count": 630,
        "public": true,
        "twitter_list_id": "199798310",
        "description": "the YC team! (the ones that tweet, anyway)",
        "twitter_id": "1605",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.098Z",
        "updated_at": "2019-05-01T17:00:22.098Z"
    },
    ...
]
```

## **Get A Single Lists in Our DB  by twitter_list_id**

_url_: `/lists/:twitter_list_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "80456006-3679-4786-ae89-ec13557ded67",
        "list_name": "Invisible college",
        "list_creation_date": "2018-12-26T02:45:58.000Z",
        "member_count": 19,
        "subscriber_count": 102,
        "public": true,
        "twitter_list_id": "1077757384838107136",
        "description": "",
        "twitter_id": "466880049",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.099Z",
        "updated_at": "2019-05-01T17:00:22.099Z"
    }
]
```

## **Get All Lists Created By User by twitter_id**

_url_: `/lists/creator/:twitter_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "b857cc40-dc51-441c-9601-56cd2aca55fe",
        "list_name": "testList",
        "list_creation_date": "2019-05-01T16:20:23.000Z",
        "member_count": 1,
        "subscriber_count": 1,
        "public": true,
        "twitter_list_id": "1123623208802848773",
        "description": "",
        "twitter_id": "1123316691100786688",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-04-30T20:02:24.000Z",
        "updated_at": "2019-05-01T17:41:26.406Z",
        "twitter_users_id": "a6ef2d02-55ad-43a1-8155-015afcc1b849",
        "followers": 0,
        "friends": 0,
        "profile_img": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "screen_name": "DstarDev",
        "name": "DstarDev",
        "location": "",
        "protected": false,
        "verified": false
    }
]
```

## **Get All Public Lists Created By User by twitter_id**

_url_: `/lists/creator/public/:twitter_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "b857cc40-dc51-441c-9601-56cd2aca55fe",
        "list_name": "testList",
        "list_creation_date": "2019-05-01T16:20:23.000Z",
        "member_count": 1,
        "subscriber_count": 1,
        "public": true,
        "twitter_list_id": "1123623208802848773",
        "description": "",
        "twitter_id": "1123316691100786688",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-04-30T20:02:24.000Z",
        "updated_at": "2019-05-01T17:41:26.406Z",
        "twitter_users_id": "a6ef2d02-55ad-43a1-8155-015afcc1b849",
        "followers": 0,
        "friends": 0,
        "profile_img": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "screen_name": "DstarDev",
        "name": "DstarDev",
        "location": "",
        "protected": false,
        "verified": false
    }
]
```

## **Get All Private Lists Created By User by twitter_id**

_url_: `/lists/creator/private/:twitter_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    ????
]
```

// GET /lists/creator/block/:user_id 
// Get All Block Lists by List Creator user_ID
## **Get All Block Lists Created By User by twitter_id**

_url_: `/lists/creator/block/:twitter_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    ????
]
```

## **Get All Cool Lists Created By User by twitter_id**

_url_: `/lists/creator/cool/:twitter_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "b857cc40-dc51-441c-9601-56cd2aca55fe",
        "list_name": "testList",
        "list_creation_date": "2019-05-01T16:20:23.000Z",
        "member_count": 1,
        "subscriber_count": 1,
        "public": true,
        "twitter_list_id": "1123623208802848773",
        "description": "",
        "twitter_id": "1123316691100786688",
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-04-30T20:02:24.000Z",
        "updated_at": "2019-05-01T17:41:26.406Z",
        "twitter_users_id": "a6ef2d02-55ad-43a1-8155-015afcc1b849",
        "followers": 0,
        "friends": 0,
        "profile_img": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "screen_name": "DstarDev",
        "name": "DstarDev",
        "location": "",
        "protected": false,
        "verified": false
    }
]
```

## **Get All List Subscribers by twitter_list_id**

_url_: `/lists/subscribers/:twitter_list_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_followers_id": "32081aba-39bc-4576-9cc1-faa26412e2af",
        "twitter_list_id": "870326828619014144",
        "twitter_user_id": "1082661798950637568"
    },
    {
        "list_followers_id": "60d974bc-897a-45c2-be42-5edb57de638c",
        "twitter_list_id": "870326828619014144",
        "twitter_user_id": "1301795034"
    },
    {
        "list_followers_id": "997b63d7-ee98-4720-906c-3f0f25617ea7",
        "twitter_list_id": "870326828619014144",
        "twitter_user_id": "250274360"
    },
    ...
]
```

## **Get List Members And Their Main Info by twitter_list_id**

_url_: `/lists/members/:twitter_list_id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_members_id": "26a6d573-f4e5-4aed-9c68-f98153aafce7",
        "twitter_list_id": "870326828619014144",
        "twitter_user_id": "2568108282",
        "description": "Blockchain, cryptocurrency, and smart contracts pioneer. (RT/Fav/Follow does not imply endorsement). Blog: http://t.co/4Kr3OJmRUN",
        "screen_name": "NickSzabo4",
        "name": "Nick Szabo 🔑",
        "profile_img": "https://abs.twimg.com/images/themes/theme1/bg.png"
    },
    {
        "list_members_id": "19a68bbb-2b5b-4456-834c-70ca1ccadb8f",
        "twitter_list_id": "870326828619014144",
        "twitter_user_id": "25552514",
        "description": "capitalist. incentive analyst, tape reader, amateur technology historian, strategy game player",
        "screen_name": "arjunblj",
        "name": "Arjun Balaji",
        "profile_img": "https://abs.twimg.com/images/themes/theme9/bg.gif"
    },
    {
        "list_members_id": "64b3bf30-b6cb-402d-ab6f-61fff37f2aa2",
        "twitter_list_id": "870326828619014144",
        "twitter_user_id": "5943622",
        "description": "",
        "screen_name": "pmarca",
        "name": "Marc Andreessen",
        "profile_img": "https://abs.twimg.com/images/themes/theme14/bg.gif"
    },
    ...
]
```

## **Get All Lists By Points in Our DB **

_url_: `/lists/points/top`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "list_id": "80456006-3679-4786-ae89-ec13557ded67",
        "list_name": "Invisible college",
        "list_creation_date": "2018-12-26T02:45:58.000Z",
        "member_count": 19,
        "subscriber_count": 102,
        "public": true,
        "twitter_list_id": "1077757384838107136",
        "description": "",
        "twitter_id": "466880049",
        "list_upvotes": 100,
        "list_downvotes": 10,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.099Z",
        "updated_at": "2019-05-01T17:00:22.099Z"
    },
    {
        "list_id": "0233ad07-8924-49b0-828f-bdfb6eae36fe",
        "list_name": "YC team",
        "list_creation_date": "2015-03-24T02:53:48.000Z",
        "member_count": 26,
        "subscriber_count": 630,
        "public": true,
        "twitter_list_id": "199798310",
        "description": "the YC team! (the ones that tweet, anyway)",
        "twitter_id": "1605",
        "list_upvotes": 50,
        "list_downvotes": 10,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_hashtag_json": null,
        "created_with_users": false,
        "created_with_users_json": null,
        "created_with_category": false,
        "created_with_category_json": null,
        "created_at": "2019-05-01T17:00:22.098Z",
        "updated_at": "2019-05-01T17:00:22.098Z"
    },
    ...
]
```

// GET /lists/timeline/:list_id 
// Gets the Twitter Timeline for the selected list_id


// POST /lists/ - 
// Create a new list (Create Block/Cool List; Public/Private List)**

// POST /lists/:list_id/follow/:user_id 
// Send JSON with user_id to subscribe that user to a list by list_id**


// PUT /lists/:list_id
// Update a List by the list_id


// DELETE /lists/:list_id 
// Delete a list by the list_id

// DELETE /lists/:list_id/unfollow/:user_id 
// Unfollow a list by list_id and user_id



**/--------------------------------------------/ TWEETS /----------------------------------------/**


### **Send a new Tweet**

_url_: `/tweets/`

_http method_: **[POST]**

#### Response

##### 200 (ok)

###### Example response

```
[
?????
]
```