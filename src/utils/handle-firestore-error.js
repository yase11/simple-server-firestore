/**
 * 
 * @param {Number} errorCode error code name generated by firebase error
 */
const handleFirestoreError = (errorCode) => {
    const result = { message: 'Firestore default error on creating document', code: 500}
    switch (errorCode) {
        // Number 6 is the error code for writing data that already exist
        case 6: {
            result.message = 'Entity already exist'
            result.code = 301;
            return result;
        }

        default:
            return result;
    }
};

module.exports = handleFirestoreError;