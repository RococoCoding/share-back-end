
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {summary: "shoes", details: 'Adult shoes, never worn.', image_url: 'http://randomaddress.com'},
        {summary: "cheese", details: 'Brie brie brie', image_url: null},
        {summary: "dresser", details: 'Vintage', image_url: null}
      ]);
    });
};
