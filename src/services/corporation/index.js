const { firestore } = require('../../../config/firebase');
const { logging, throwError, handleFirestoreError } = require('../../utils');

const addCorporation = async (object) => {
    try {
        const corporation = firestore.collection(`corporations`);
        const corporationRef = await corporation.doc().create(
            object
        );
        logging('"corporationRef" addCorporation()', corporationRef, false);

        return corporationRef;;
    } catch (error) {
        logging('addCorporation', error);
        const { code, message } = handleFirestoreError(error.code);
        return throwError(message, code);
    }
}

const getConverter = {
    toFirestore() {
        return {}
    },
    fromFirestore(data) {
        return {
            // eslint-disable-next-line no-underscore-dangle
            name: data._path.segments[1]
        }
    }
}

const getCorporation = async () => {
    try {
        const corporation = firestore.collection(`corporations`);

        return await corporation.withConverter(getConverter).listDocuments();
    } catch (error) {
        return throwError('Unable to retrieve corporation', 500);
    }
}

module.exports = {
    addCorporation,
    getCorporation,
}