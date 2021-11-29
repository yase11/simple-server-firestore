/* eslint-disable dot-notation */
const { firestore } = require('../../../config/firebase');
const { logging, handleFirestoreError, throwError } = require("../../utils");

const getUserCollection = async () => {
    const corporations = firestore.getAll()
    return corporations;
}

const addUser = async (object) => {
    try {
        const { corporation, company, user } = object;
        const users = firestore.collection(`corporations/${corporation}/companies/${company}/users`);
        const userRef = await users.doc().create(
            user
        );
        const isCorporation = firestore.doc(`corporations/${corporation}`);
        const isCompany = firestore.doc(`corporations/${corporation}/companies/${company}`);
        const all = await firestore.getAll(isCorporation, isCompany);
        logging('"all" addUser()', JSON.stringify(all), false);
        logging('"userRef" addUser()', userRef, false);

        return userRef;
    } catch (error) {
        logging('addUser', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

const getUser = async (object) => {
    try {
        const { corporation, company } = object;
        const isCorporation = firestore.doc(`corporations/${corporation}`);
        const isCompany = firestore.doc(`corporations/${corporation}/companies/${company}`);
        const all = await firestore.getAll(isCorporation, isCompany);
        const booleanArray = all.map( (data) => !!(data['_fieldsProto']));
        const hasError = booleanArray.includes(false);
        return hasError;
    } catch (error) {
        logging('getUser', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}




module.exports = {
    getUserCollection,
    getUser,
    addUser,
}