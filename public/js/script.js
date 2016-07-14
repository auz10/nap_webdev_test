var getDesigners = function(cb) {
    var designers = []
    $.getJSON('api/products?limit=500&offset=0', function(data) {
        $.each(data.data, function(key, val) {
            if (_.findIndex(designers, val.designer) == -1) {
                designers.push(val.designer);
            };
        });
        var sortedDesigners = _.sortBy(designers, 'name');
        cb(sortedDesigners);
    });
};

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1]);
        };
    };
};


$(document).ready(function() {

    var pn = getUrlParameter("pn") || 1;
    var designer = getUrlParameter("designer")
    var sortby = getUrlParameter("sortby")
    var category = getUrlParameter("category")

    getDesigners(function(designers){
        pn = 1;
        designers_list = '<ul id="filter-list">'
        $.each(designers, function(key, val) {
            designers_list += '<li class="des-filter-item" data-designer-id="'+val.id+'"><a href="/list?designer='+val.id+'&pn=1">'+val.name+'</a></li>'
        });
        designers_list += '</ul>'
        $("#designer-filter-list").html(designers_list)
    });

    function next() {
        params = {}
        if (pn) { params.pn = parseInt(pn) + 1; };
        if (designer) { params.designer = designer };
        if (sortby) { params.sortby = sortby };
        if (category) { params.category = category };
        return jQuery.param(params);
    };

    function previous() {
        params = {}
        if (pn) { 
            if (pn != 1) {
                params.pn = parseInt(pn) - 1; };
            };
        if (designer) { params.designer = designer };
        if (sortby) { params.sortby = sortby };
        if (category) { params.category = category };
        return jQuery.param(params);
    };

    function sort_by(sortBy) {
        params = {}
        if (pn) { params.pn = parseInt(pn) };
        if (designer) { params.designer = designer };
        if (category) { params.category = category };
        params.sortby = sortBy;
        return jQuery.param(params);
    };

    function catURL() {
        params = {};
        if (designer) { params.designer = designer };
        return jQuery.param(params);
    }

    $("#next").attr("href", "/list?"+next());

    $("#prev").attr("href", "/list?"+previous());

    $("#sort-high").attr("href", "/list?"+sort_by("price_high"));

    $("#sort-low").attr("href", "/list?"+sort_by("price_low"));

    $("body").on("click", ".des-filter-item", function() {
        if (designer) {
            designer_id = $(this).data('designerId');
            designer_url = $(this).find("a");
            designer_url.attr("href", "/list?"+catURL()+";"+designer_id);
        }
    });

    $("body").on("mouseenter", ".product", function() {
        var productId = $(this).data('productId');
        var product_image = $(this).find('img');
        
        $.getJSON('/api/product/'+productId, function(data) {
            product_image.attr('src', data.images.small)
        
        });
    });
    $("body").on("mouseleave", ".product", function() {
        var productId = $(this).data('productId');
        var product_image = $(this).find('img');

        $.getJSON('/api/product/'+productId, function(data) {
            product_image.attr('src', data.images.outfit)
        
        });
    });


  });  