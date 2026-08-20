# Northstar Firebase deployment

This is now a Firebase-backed application. Customer tracking reads only the `publicShipments` collection. Admin changes are made only through Cloud Functions, which check a Firebase custom role and append an audit event.

## One-time Firebase Console setup

1. In **Authentication → Sign-in method**, enable **Email/Password**.
2. Create a first email/password user in **Authentication → Users**. Use a long, unique password.
3. In **Firestore Database**, create a database in production mode.
4. Install the Firebase CLI, sign in, then deploy from this `outputs` folder:

```powershell
npm install -g firebase-tools
firebase login
firebase use northstar-logistics-46046
firebase deploy
```

5. To make the first account a superadmin, open Firebase Cloud Shell, copy the `functions/bootstrap-superadmin.js` script there, run `npm install firebase-admin`, then:

```bash
node bootstrap-superadmin.js your-email@example.com
```

6. Sign in at `login.html`. The superadmin can create ordinary admins at `superadmin.html`.

## Security model

- Browsers cannot directly read private shipments, activity, or admin data.
- Browsers cannot directly write any Firestore collection.
- Admin writes use `saveShipment`, which checks the Firebase custom claim server-side.
- Superadmin-only functions create admin accounts and view audit activity.
- Public visitors can fetch one published tracking record only when they know its exact shipment key; public collection listing is denied.

For production, also configure Firebase App Check, require MFA for staff accounts, set authorised domains, and use a private repository for operational files.
