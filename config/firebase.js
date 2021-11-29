/* eslint-disable import/no-unresolved */

const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
// const {getSecurityRules } = require('firebase-admin/security-rules');
// const fs = require('fs');

require('dotenv').config();

/**
 * Firebase application object in order the firebase API
 * to work and has valid credentials.
 */
const fireBaseAdmin = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APP_ID
}

// console.log('fireBaseAdmin ', fireBaseAdmin);

/**
 * Initialize firebase Admin SDK
 */
const appAdmin = initializeApp(fireBaseAdmin);

// /**
//  * Initialize security rules firestore
//  */
//  const securityRules = getSecurityRules(appAdmin);

//  // Adding security rules from source path
//  const source = fs.readFileSync(
//      ( process.env.SECURITY_RULES_PATH || 'D:\\yase\\Angular\\NEW\\projects\\server-firestore\\firestore.rules'),
//      'utf8'
//  );
 
//  const initializeRules = async () => {
//      try {
//          return await securityRules.releaseFirestoreRulesetFromSource(source);
//      } catch (error) {
//          throw new Error(error);
//      }
//  }
 
//  const rules = initializeRules();

/**
 * Initialize authentication firebase
*/
 const authentication = getAuth(appAdmin);

/**
 * Initialize firestore
 */
const firestore = getFirestore(appAdmin);



module.exports = {
    appAdmin,
    authentication,
    firestore
};