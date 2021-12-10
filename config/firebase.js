/* eslint-disable import/no-unresolved */

const { initializeApp } = require('firebase-admin/app');
const { credential } = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
// const {getSecurityRules } = require('firebase-admin/security-rules');
// const fs = require('fs');

require('dotenv').config();

/**
 * Firebase application object in order the firebase API
 * to work and has valid credentials.
 */

/**
 * Initialize firebase Admin SDK
 */

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIAL);

const appAdmin = initializeApp({
    credential: credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
});

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