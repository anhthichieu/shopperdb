const faker = require('faker')
const { times, random, round } = require('lodash')

module.exports = function () {
  return {
    womenProducts: times(8, function (n) {
      return {
        "images": {
          "img": faker.image.imageUrl(),
          "imgOnHover": faker.image.fashion(),
        },
        "category": faker.commerce.product(),
        "name": faker.commerce.productName(),
        "pricing": {
          "price": faker.commerce.price(),
          "discount": round(random(0.1, 0.7), 2),
        },
        "isNew": faker.datatype.boolean(),
      }
    })
  }
}