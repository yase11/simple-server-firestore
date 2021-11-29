
const throwError = (message='Unauthorized access', statusCode=401, error=true) => {
    const errorObj = { status: statusCode, message, error };
    throw errorObj;
}

module.exports = throwError;