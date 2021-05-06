const functions = require("firebase-functions");

const admin = require('firebase-admin');

admin.initializeApp();

exports.updateFirestore = functions.database.ref('Weight')
    .onWrite((change, context) => {

        // Grab the current value of what was written to the Realtime Database.
        const data = change.after.val();

        console.log(data);

        //Write to Firestore
        const firestoreDb = admin.firestore();
        const docReference = firestoreDb.collection('carts').doc('cart01');
        return docReference.set(
            {
                cartWeight: data.toFixed(2)
          
            },
            { merge: true }
        );

    });