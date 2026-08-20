# Final Firebase setup

1. Firebase Console → Firestore Database → Rules: replace the rules with `firestore.rules` and click **Publish**.
2. Firebase Console → Authentication → Settings → Authorized domains: add your GitHub Pages domain, for example `yourname.github.io`.
3. Sign in once through `admin.html` with `shipeaseeee@gmail.com`. This bootstraps that account as the superadmin.

Other administrators can create their own account from the admin login page. Their role starts as `pending`; promote them to `admin` in `superadmin.html`.
