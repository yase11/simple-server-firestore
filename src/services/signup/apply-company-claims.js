const { authentication } = require('../../../config/firebase');
const { logging, throwError, handleFirestoreError } = require('../../utils');

const applyCompanyClaims = async (oldToken) => {
    try {
        const { uid, completeSignup, hasSelectAccount } = await authentication.verifyIdToken(oldToken);
        const payload = {
            applyCompany: true,
            completeSignup: true,
            isAdmin: true,
            hasSelectAccount
        }
        
        if (uid && !completeSignup && hasSelectAccount) {
            await authentication.setCustomUserClaims(uid, payload);
            const token = await authentication.createCustomToken( uid, payload);
            return token;
        }
        return false;
    } catch (error) {
        logging('applyCompanyClaims', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

module.exports = applyCompanyClaims;