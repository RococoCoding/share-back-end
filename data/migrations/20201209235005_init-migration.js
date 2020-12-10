
exports.up = function (knex) {
  return knex.schema
    .createTable('user', tbl => {
      tbl.increments()
      tbl.int('type').notNullable().unsigned()
      tbl.text('name', 128).notNullable()
      tbl.text('email', 128).notNullable().unique()
      tbl.text('phone', 128).unique()
      tbl.text('address', 128)
      tbl.boolean('suspend').notNullable().defaultTo(false)
      tbl.text('password').notNullable()
    })
    .createTable('item', tbl => {
      tbl.increments()
      tbl.text('summary', 128).notNullable()
      tbl.text('details')
      tbl.text('image_url')
    })
    .createTable('location', tbl => {
      tbl.increments()
      tbl.text('area', 128).notNullable()
    })

    //junctions
    .createTable('user_inventory', tbl => {
      tbl.integer('item_id').unsigned().notNullable()
        .references('id').inTable('item')
        .onUpdate('CASCADE').onDelete('CASCADE')
      tbl.integer('user_id').unsigned().notNullable()
        .references('id').inTable('user')
        .onUpdate('CASCADE').onDelete('CASCADE')

      tbl.float('item_qty').unsigned().defaultTo(0).notNullable()
      tbl.text('qty_units', 128)

      tbl.primary(['user_id', 'item_id']);
    })
    .createTable('user_location', tbl => {
      tbl.integer('location_id').unsigned().notNullable()
        .references('id').inTable('location')
        .onUpdate('CASCADE').onDelete('CASCADE')
      tbl.integer('user_id').unsigned().notNullable()
        .references('id').inTable('user')
        .onUpdate('CASCADE').onDelete('CASCADE')

      tbl.primary(['user_id', 'location_id']);
    })
    .createTable('user_user', tbl => {
      tbl.integer('user_id').unsigned().notNullable()
      .references('id').inTable('user')
      .onUpdate('CASCADE').onDelete('CASCADE')
      tbl.integer('follower_id').unsigned().notNullable()
      .references('id').inTable('user')
      .onUpdate('CASCADE').onDelete('CASCADE')

      tbl.primary(['user_id', 'user_id']);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user_user')
    .dropTableIfExists('user_location')
    .dropTableIfExists('user_inventory')
    .dropTableIfExists('location')
    .dropTableIfExists('item')
    .dropTableIfExists('user');

};
