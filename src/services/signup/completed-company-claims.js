const { authentication } = require('../../../config/firebase');
const { logging, throwError, handleFirestoreError } = require('../../utils');

const completedCompanyClaims = async (oldToken) => {
    try {
        const {completeSignup, hasSelectAccount, completedCorporation, uid} = await authentication.verifyIdToken(oldToken);

        console.log({ completeSignup, hasSelectAccount, completedCorporation });
        const payload = {
            completedCompany: true,
            completeSignup: true,
            isAdmin: true,
            hasSelectAccount,
            completedCorporation
        }
        
        if (!completeSignup && hasSelectAccount && completedCorporation && uid) {
            await authentication.setCustomUserClaims(uid, payload);
            const token = await authentication.createCustomToken(uid, payload);
            return token;
        }
        return false;
    } catch (error) {
        logging('completedCompanyClaims', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

module.exports = completedCompanyClaims;