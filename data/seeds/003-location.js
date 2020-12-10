
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('location').del()
    .then(function () {
      // Inserts seed entries
      return knex('location').insert([
        {area: 'Downtown'},
        {area: 'The MOCA'},
        {area: 'Rowland Heights'},
      ]);
    });
};
