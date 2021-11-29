const { firestore } = require('../../../config/firebase');
const { logging, throwError, handleFirestoreError } = require('../../utils');
const selectAccountCustomClaims = require('./select-account-claims');
const completedCorporationClaims = require('./completed-corporation-claims');
const completedCompanyClaims = require('./completed-company-claims');
const completedUserClaims = require('./completed-user-claims');

const addUser = async (object) => {
    try {
        const { corporation, company, user } = object;
        const isCorporation = firestore.doc(`corporations/${corporation}`);
        const isCompany = firestore.doc(`corporations/${corporation}/companies/${company}`);
        const users = firestore.collection(`corporations/${corporation}/companies/${company}/users`);
        const userRef = await users.doc().create(
            user
        );
        // isCorporation.where('foo', '==', 'bar').get();
        const all = await firestore.getAll(isCorporation, isCompany);
        logging('"all" addUser()', JSON.stringify(all), false);
        logging('"userRef" addUser()', userRef, false);

        return userRef;
    } catch (error) {
        logging('addUser', error);
        const { code, message } = await handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

module.exports = {
    addUser,
    selectAccountCustomClaims,
    completedCorporationClaims,
    completedCompanyClaims,
    completedUserClaims
};