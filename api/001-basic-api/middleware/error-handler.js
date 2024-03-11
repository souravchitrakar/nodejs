

const errorHandler = async function(err, req, res, next){

    return res.status(500).json({
        message: err
    });

};

module.exports = errorHandler;