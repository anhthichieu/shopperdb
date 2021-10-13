const faker = require('faker')
const { times, random, round } = require('lodash')
const arrayLength = 8;

function getImgUrl(index) {
  return `/img/products/product${index + 1}a.jpeg'`
}

function getImgOnHoverUrl(index) {
  return `/img/products/product${index + 1}b.jpeg'`
}

let productStatus = { isNew: undefined, discountVal: undefined }

function getProductState(index) {
  productStatus.isNew = faker.datatype.boolean();
  let isDiscounted = productStatus.isNew ? false : faker.datatype.boolean(); // New product is not discounted
  productStatus.discountVal = isDiscounted ? round(random(0.1, 0.7), 2) : 0
  console.log('productStatus', productStatus);
}


module.exports = function () {
  const data = { products: [] }
  for (let i = 0; i < arrayLength; i++) {
    data.products.push({
      "images": {
        "img": getImgUrl(i),
        "imgOnHover": getImgOnHoverUrl(i),
      },
      "category": faker.commerce.product(),
      "name": faker.commerce.productName(),
      "isNew": getProductState(i),
      "pricing": {
        "price": faker.commerce.price(),
        "discount": productStatus.discountVal,
      },
    })
  }
  return data
}