/* eslint-disable indent */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

// 1. Get all items that contain text
function searchByTerm(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        });
}

// 2. Get all items paginated
function paginateProducts(pageNumber) {
    const productsPerPage = 6;
    const offset = productsPerPage * (pageNumber - 1);

    knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(results => {
        console.log(results);
    });
}

// 3. Get all items added after date
function afterDates(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(results => {
            console.log(results);
        });
}

// 4. Get the total cost for each category
function totalCost() {
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(results => {
            console.log(results);
        });
}

//searchByTerm('a');
//paginateProducts(2);
//afterDates(2);
totalCost();
