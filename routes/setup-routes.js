var config = require('../config/config');

var configureRoutes = {

    init: function(app) {

        /********* Products List Routes ***********/
        var productListApiRoute = require(config.ROOT + '/routes/product-list');
        productListApiRoute.routes.init(app);

        /********* Product Routes ***********/
        var productApiRoute = require(config.ROOT + '/routes/product');
        productApiRoute.routes.init(app);

        /********* Landing Page Routes ***********/
        var landingPageRoute = require(config.ROOT + '/routes/landing-page');
        landingPageRoute.routes.init(app);

        /********* Lisitng Page Routes ***********/
        var listPageRoute = require(config.ROOT + '/routes/list');
        listPageRoute.routes.init(app);

        /********* Designer-Filter Routes ***********/
        var designerlistRoute = require(config.ROOT + '/routes/designer-list');
        designerlistRoute.routes.init(app);

        /********* Category-Filter Routes ***********/
        var categorylistRoute = require(config.ROOT + '/routes/category-list');
        categorylistRoute.routes.init(app);


    }
};

module.exports = {
    configureRoutes: configureRoutes
};