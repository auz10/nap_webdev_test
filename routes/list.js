var config = require('../config/config')
var request = require('request');

var routes = {
    init: function(app) {

        // set up landing page
        app.get('/list', function (req, res, next) {
            

            var designerName = String(req.query.designer);
            var categoryId = parseInt(req.query.category);
            var sortBy = String(req.query.sortby);

            if (designerName == "undefined" && sortBy == "undefined" && isNaN(categoryId) == 1) {

                api_url = config.BASE_URL+'api/products?'

             } else if (designerName != "undefined") {

                if (sortBy) {
                    api_url = config.BASE_URL+'api/product/designer/'+designerName+'?sort='+sortBy+"&"
                } else {
                    api_url = config.BASE_URL+'api/product/designer/'+designerName+'?'
                };

             } else if (isNaN(categoryId) == 0) {

                if (sortBy) {
                    api_url = config.BASE_URL+'api/product/category/'+categoryId+'?sort='+sortBy+"&"
                } else {
                    api_url = config.BASE_URL+'api/product/category/'+categoryId+'?'
                };

             } else {

                if (sortBy) {
                    api_url = config.BASE_URL+'api/products?sort='+sortBy+"&"
                } else {
                    api_url = config.BASE_URL+'api/products?'
                };
             };

            var pageNumber = parseInt(req.query.pn) || 1;
            var offset = parseInt(pageNumber * 8 - 8) || 0;
            var limit = parseInt(req.query.limit) || 8;

            request({url: api_url+'offset='+offset+'&limit='+limit, json:true}, function(error, response, body, json) {
                res.render('list', {
                    metadata: {
                        title: 'NAP Tech Test - Product Page'
                    },
                    title: 'NAP Tech Test - Product Page',
                    layout: 'layouts/list',
                    template: 'list',
                    products: body.data,
                    page: pageNumber,
                });

            });
        });
        

    }
};



module.exports = {
    routes: routes
};