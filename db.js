var faker = require('faker');

module.exports = function() {
    var cards = [];

    for (var i = 0; i < 100; i++) {
        cards.push(faker.helpers.userCard());
    }
    return {cards: cards};
};