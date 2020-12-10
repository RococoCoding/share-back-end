
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_inventory').insert([
        {item_id: 1, user_id: 2, item_qty: 0.5, qty_units: "pairs"},
        {item_id: 2, user_id: 1, item_qty: 20, qty_units: "wedges"},
        {item_id: 3, user_id: 3, item_qty: 2, qty_units: null}
      ]);
    });
};
