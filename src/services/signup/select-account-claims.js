const { authentication } = require('../../../config/firebase');
const { logging, throwError, handleFirestoreError } = require('../../utils');

const selectAccountCustomClaims = async (uid) => {
    const payload = {
        completeSignup: false,
        hasSelectAccount: true
    }
    try {
        await authentication.setCustomUserClaims(uid, payload);
        const token = await authentication.createCustomToken(uid, payload);
        return token;
    } catch (error) {
        logging('selectAccountCustomClaims', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

module.exports = selectAccountCustomClaims;