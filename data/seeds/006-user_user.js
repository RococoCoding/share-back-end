
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_user').insert([
        {follower_id: 1, user_id: 2},
        {follower_id: 2, user_id: 1},
        {follower_id: 3, user_id: 3},
      ]);
    });
};
