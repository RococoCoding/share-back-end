user types:
admin/moderator
charity
public

state & actions:
users
  C - post /users
  R - get /users
      get /users/:id
      get /users/type
  U - put /users/:id
  D - delete /users/:id

inventory
  C - post /users/:id/items
  R - get /items/
      get /items/type

      get /users/:id/items
      get /users/:id/items/type
  U - put /users/:id/items/:id
  D - delete /users/:id/items/:id

user fields:
  id:
  type: int 1/2/3 admin/public/charity
  name: ""
  email: varchar
  password: varchar 128, 255
  phone: optional
  address: optional
  social:
  location_id:
  suspend: false

inventory fields:
  id:
  item: ""
  details: ""
  image_url:

location fields:
  id:
  area:

user_inv junction:
  user_id
  inv_id
  inv_qty

user_user junction:
  user_id
  follower_id
  blocked_id

user_location junction:
  user_id
  location_id


all users can
  create acct
  delete their own acct
  edit their own inventory/wishlist
  edit their profile
  search/get users & items
  follow other users
  block other users
  report a user
  message users
  <!-- set up drive or garage giveaways -->
  <!-- drive fields:
  start time:
  end time:
  dropoff addy: -->

mods can delete any user
  can suspend any user
  view user reports
