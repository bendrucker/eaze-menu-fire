'use strict'

const annyang = require('annyang')
const blow = require('on-blow')
const smoke = require('smoke-element')

const smokers = []
let lastProduct = null

annyang.addCommands({
  'Can I try the *product': function (query) {
    console.log('query:', query)
    const products = [].slice.call(document.querySelectorAll('[class^=www-components-product-card-card]'))
    const product = products.find(function (product) {
      return product.querySelector('[class^=www-components-product-card-name]')
        .innerText
        .toLowerCase()
        .includes(query.toLowerCase())
    })

    if (!product) return

    lastProduct = product

    smokers.push(smoke({
      element: product,
      colors: [100, 100, 100]
    }))
  },
  'Buy *any': function () {
    console.log('buy')

    if (!lastProduct) return
    lastProduct
      .querySelector('[class^=www-microcomponents-eaze-button-cartButton]')
      .click()
  }
})

annyang.start()
annyang.debug()

blow.run()
blow.events.on('start', reset)

function reset () {
  console.log('reset')
  smokers.forEach((smoke) => smoke.stop())
}
