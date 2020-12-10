
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_location').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_location').insert([
        {location_id: 1, user_id: 2},
        {location_id: 2, user_id: 1},
        {location_id: 3, user_id: 3},
      ]);
    });
};
