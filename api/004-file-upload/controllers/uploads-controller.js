// Importing path module
const path = require("path");

// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Importing custom errors
const customError = require("./../util/errors");

// Defining the createProduct controller function
const uploadProductImage = async function(req, res){

    // Checking if client is sending a file or not
    // To send a file from Postman go to form-data, select the type of the key to "File"
    // Here file is the key name used in Postman, not the actual file name that is attached
    // We are getting the files directly from the request as we used the package "express-fileupload"
    if(!req.files.image){

        // Raising custom error
        throw new customError.BadRequestError("No file uploaded");

    }

    // Checking if image file is attached or not (with the help of mimetype)
    // If multiple files are attached against the same Postman Key (here image), then the Key will be array, so this validation will not work (print the Key and accordingly implement the validations)
    if(!req.files.image.mimetype.startsWith("image")){

        // Raising custom error
        throw new customError.BadRequestError("Please upload an image");

    }

    // Checking the size of the file
    // If multiple files are attached against the same Postman Key (here image), then the Key will be array, so this validation will not work (print the Key and accordingly implement the validations)
    if(req.files.image.size > 5000) {

        // Raising custom error
        throw new customError.BadRequestError("Please upload small image");

    }

    // Saving the file from request (sent with Key value image from Postman)
    const productImage = req.files.image;

    // Creating destination (name is the actual file name, print the Key to get all the properties available)
    const imagePath = path.join(__dirname, `./../public/images/${productImage.name}`)

    // Moving the file to destination
    await productImage.mv(imagePath);

    // Sending the response back
    return res.status(StatusCodes.OK).json({
        image: {
            // Creating the path like "/images/1.jpg" if 1.jpg is uploaded, as the image is saved inside static directory so user can access using "http://localhost:3000/images/1.jpg"
            src: `/images/${productImage.name}`
        }
    });

};

// Exporting the controller functions
module.exports = {
    uploadProductImage
};