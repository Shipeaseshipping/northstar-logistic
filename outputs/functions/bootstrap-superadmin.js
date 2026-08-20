// Run once from Firebase Cloud Shell after `npm install firebase-admin`:
// node bootstrap-superadmin.js your-email@example.com
const admin=require("firebase-admin");admin.initializeApp();(async()=>{const email=process.argv[2];if(!email)throw Error("Provide an email address.");const user=await admin.auth().getUserByEmail(email);await admin.auth().setCustomUserClaims(user.uid,{role:"superadmin"});console.log(`${email} is now superadmin.`)})();
