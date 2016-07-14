var config = require('../config/config')
var _ = require('lodash');

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require(config.ROOT +'/fixtures/products.json').data;

var routes = {
    init: function(app) {

        //get product by category
        app.get('/api/product/category/:category', function (req, res, next) {

            var catId = parseInt(req.params.category);
            var sortBy = String(req.query.sort);

            if(!catId) {
                res.status(404);
                res.json({error : "Category name was expected but not supplied"})

            } else {

                var designerProductData = _.filter(allProducts, {'categories': [{'children': [{'id': catId}] }] });

                if (sortBy == "price_high") {
                    designerProductData = _.sortBy(designerProductData, function(item) {
                        item_price = item.price.gross / item.price.divisor;
                        return item_price;
                    }).reverse();
                } else if (sortBy == "price_low") {
                    designerProductData = _.sortBy(designerProductData, function(item) {
                        item_price = item.price.gross / item.price.divisor;
                        return item_price;
                    });
                };
                

                var total = allProducts.length;
                var offset = parseInt(req.query.offset) || 0;
                var limit = parseInt(req.query.limit) || 8;
                if (offset > total) {
                    return res.type('json').sendStatus(400);
                };

                res.json({offset: offset,
                    limit: limit,
                    total: total,
                    total_length: designerProductData.length,
                    data: designerProductData.slice(offset, offset+limit).map(function(designerProduct) {
                        return {    
                            id: designerProduct.id,
                            category: designerProduct.categories[0].children[0].id,
                            name: designerProduct.name.en,
                            price: '£' +designerProduct.price.gross / designerProduct.price.divisor,
                            designer: {
                                name: designerProduct.brand.name.en,
                                id: designerProduct.brand.id
                            },
                            image: {
                                outfit: '//cache.net-a-porter.com/images/products/'+designerProduct.id+'/'+designerProduct.id+'_ou_sl.jpg'
                            }
                        }                    
                    })
                });
            } 
        });
    }
};



module.exports = {
    routes: routes
};