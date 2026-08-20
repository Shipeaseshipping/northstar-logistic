# Supabase setup — no local Node.js required

1. In Supabase, open **SQL Editor → New query**.
2. Paste the whole content of `supabase-schema.sql` and click **Run**.
3. Open **Authentication → Providers**, enable **Email**.
4. Open **Authentication → Users → Add user** and create your own email/password account.
5. Return to **SQL Editor** and run this once, replacing the email:

```sql
update public.profiles set role='superadmin' where email='your-email@example.com';
```

6. Publish the `outputs` folder to GitHub Pages, Netlify, or Vercel. Do not run the pages from `file:///`; the browser module imports need a web server.
7. Sign in at `login.html`, then use `superadmin.html` to promote an existing signed-up account to admin.

The publishable key is intentionally in `supabase.js`. It cannot access private data by itself; the SQL functions, role checks, and revoked direct table permissions enforce access on the server.
