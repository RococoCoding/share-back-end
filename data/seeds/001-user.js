
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { type: 1, 
          name: 'Brian', 
          email: "1@gmail.com",
          phone: null,
          address: null,
          suspend: false,
          password: 'pass123' 
        },
        { type: 2, 
          name: 'Jennifer', 
          email: "2@gmail.com",
          phone: null,
          address: null,
          suspend: false,
          password: 'pass123' 
        },
        { type: 1, 
          name: 'Susanne', 
          email: "3@gmail.com",
          phone: null,
          address: null,
          suspend: false,
          password: 'pass123' 
        },
      ]);
    });
};
