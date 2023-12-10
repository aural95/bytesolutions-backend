//Module providing a utility function for handling HTTP errors in responses.


/**
 * Handles HTTP errors by setting the status code and sending an error response.
 * @function handleHttpError
 * @param {Object} res - Express response object.
 * @param {string} [message='something went wrong'] - Error message to be sent in the response.
 * @param {number} [code=403] - HTTP status code for the response.
 */
const handleHttpError = (res, message = 'something went wrong', code =403)=>{
    res.status(code);
    res.send({error:message});
}

// Export the handleHttpError function for use in other parts of the application
module.exports={handleHttpError}