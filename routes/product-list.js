var config = require('../config/config')
var _ = require('lodash');
// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require(config.ROOT +'/fixtures/products.json').data;



var routes = {
    init: function(app) {

        app.get('/api/products', function (req, res, next) {
            var total = allProducts.length;
            var offset = parseInt(req.query.offset) || 0;
            var limit = parseInt(req.query.limit) || 60;
            var sortBy = String(req.query.sort);
            if (offset > total) {
                return res.type('json').sendStatus(400);
            }
                if (sortBy == "price_high") {
                    allProducts = _.sortBy(allProducts, function(item) {
                        item_price = item.price.gross / item.price.divisor;
                        return item_price;
                    }).reverse();
                } else if (sortBy == "price_low") {
                    allProducts = _.sortBy(allProducts, function(item) {
                        item_price = item.price.gross / item.price.divisor;
                        return item_price;
                    });
                };

            res.json({
                offset: offset,
                limit: limit,
                total: total,
                data: allProducts.slice(offset, offset+limit).map(function(product) {
                    // Simplify payload - more data available in fixture
                    return {
                        id: product.id,
                        name: product.name.en,
                        category: product.categories[0].children[0].id,
                        price: '£' + product.price.gross / product.price.divisor,
                        designer: {
                            name: product.brand.name.en,
                            id: product.brand.id
                        },
                        image: {
                            outfit: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_ou_sl.jpg'
                        }
                    }
                })
            })

        })

    }
};



module.exports = {
    routes: routes
};