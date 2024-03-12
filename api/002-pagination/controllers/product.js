const Product = require("./../models/product");

const getAllProductsPagination = async function(req, res){

    // To implement pagination we need to pass "limit" and "skip" to the find method when we read the data
    // The "limit" is the number of records per page and the "limit" is the number of records should be skipped from the overall result
    // For consistency it is good to sort the result before applying pagination
    let page;
    let limit = 10;
    let skip;

    // Reading the page number from the query parameter and accordingly calculating the "skip"
    if(req.query.page){

        // Reading page number from query parameter
        page = Number(req.query.page);

        // Calculating the "skip"
        skip = (page - 1) * limit;

    } else{

        page = 0;
        skip = 0;

    }

    // Here sort is taking price and number, sorting is taking place based of ascending price and descending name wise
    // The select takes the number of fields we want to select
    // The "limit" is the number of records in the result
    // The "skip" is the number of records the result should skip
    const products = await Product.find({}).sort('price -name').select('price name').limit(limit).skip(skip);

    res.status(200).json({
        products,
        nbHits: products.length
    });

};

const getAllProducts = async function(req, res){

    const {
        featured,
        company
    } = req.query;

    const queryObject = {};

    if(featured){
        queryObject.featured = featured === "true" ? true : false;
    }

    if(company){
        queryObject.company = company;
    }

    // Adding filter to the find (it takes an object), for other filter types check the documentation
    const products = await Product.find(queryObject);

    res.status(200).json({
        products,
        nbHits: products.length
    });

};

module.exports = {
    getAllProductsPagination,
    getAllProducts
};