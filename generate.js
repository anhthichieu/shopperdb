// const faker = require('faker')
const { random, round } = require('lodash')
const arrayLength = 8;
let controlID = 0;
const productInfo = require('./productInfo');

/* Get image URLs */
function getImgUrl(index) {
  return `/img/products/product${index + 1}a.jpeg`
}

function getImgOnHoverUrl(index) {
  return `/img/products/product${index + 1}b.jpeg`
}

/* Get product status (new or sale) */
let productStatus = { isNew: undefined, discountVal: undefined }

function getProductStatus() {
  const newExpression = Math.random() >= 0.5; // Expression will return true 50% of the time, and false the other 50%
  const discountExpression = Math.random() >= 0.5

  productStatus.isNew = newExpression;
  let isDiscounted = productStatus.isNew ? false : discountExpression; // New product is not discounted
  productStatus.discountVal = isDiscounted ? round(random(0.1, 0.7), 2) : 0
}

/* Price */

function getPrice() {
  let minPrice = 50;
  let maxPrice = 1000;
  return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice
}

module.exports = function () {
  const categoryKeys = ['women', 'men', 'kids'];
  let data = { women: [], men: [], kids: [] };

  function createData(group) {
    let products = [];
    for (let i = 0; i < arrayLength; i++) {
      getProductStatus();
      controlID++;
      products.push({
        "id": controlID,
        "images": {
          "img": getImgUrl(i),
          "imgOnHover": getImgOnHoverUrl(i),
        },
        "category": productInfo[group]['categories'][i],
        "name": productInfo[group]['productName'][i],
        "isNew": productStatus.isNew,
        "pricing": {
          "price": getPrice(),
          "discount": productStatus.discountVal,
        },
      })
    }
    return products;
  }

  for (const key of categoryKeys) {
    data[key] = createData(key);
  }

  return data
}