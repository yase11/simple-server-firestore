const { authentication } = require('../../../config/firebase');
const { logging, throwError, handleFirestoreError } = require('../../utils');

const completedUserClaims = async (oldToken) => {
    try {
        const { uid, completeSignup, hasSelectAccount } = await authentication.verifyIdToken(oldToken);

        console.log({ completeSignup, hasSelectAccount });

        const payload = {
            hasSelectAccount,
            isAdmin: false,
            isUser: true,
            completedUser: true,
            completeSignup: true
        }
        
        if (!completeSignup && hasSelectAccount) {
            await authentication.setCustomUserClaims(uid, payload);
            const token = await authentication.createCustomToken(uid,payload);
            return token;
        }
        return false;
    } catch (error) {
        logging('completedUserClaims', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

module.exports = completedUserClaims;