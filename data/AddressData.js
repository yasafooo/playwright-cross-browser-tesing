module.exports = function () {
    let productData = {};
    productData.address_colombo_kandy =
        {
            routeCount: 2,
            start: "kandy",
            end: "colombo",
            route: [{
                description : "via Central Expressway/E04",
                distance: "144 km",
                duration: "3 hr 15 min"
            }, {
                description : "via Katugastota - Kurunegala - Puttalam Hwy/A10, Central Expressway/E04 and Colombo - Kandy Rd/Kandy Rd/A1",
                distance: "134 km",
                duration: "3 hr 17 min"
            }]
        };
    productData.address_london_paris =
        {
            routeCount: 3,
            start: "london",
            end: "paris",
            route: [{
                description : "via A1",
                distance: "288 miles",
                duration: "3 hr 15 min"
            }, {
                description : "via A26 and A1",
                distance: "296 miles",
                duration: "3 hr 17 min"
            },{
                description : "via A16",
                distance: "301 miles",
                duration: "3 hr 15 min"
            }
            ]
        };
    productData.invalid_adress =
        {
            routeCount: 0,
            start: "eeeeeeeeeeeeeeeeeee",
            end: ""
        };
    return productData;
};