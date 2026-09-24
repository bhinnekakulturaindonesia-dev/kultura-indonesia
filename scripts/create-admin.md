# Create Admin User

## Via Supabase Dashboard (Recommended)

1. Buka: https://supabase.com/dashboard
2. Pilih project kamu
3. **Authentication** → **Users** → **Add user**
4. Isi form:
   ```
   Email: admin@kulturaindonesia.or.id
   Password: [password-kuat-kamu]
   ✅ Auto Confirm User (HARUS dicentang!)
   ```
5. **Create user**

## Via SQL (Advanced)

Jika mau buat via SQL, jalankan di SQL Editor:

```sql
-- Cara 1: Via Auth API (tidak bisa langsung via SQL)
-- Harus pakai Supabase Dashboard atau API

-- Cara 2: Buat multiple admin emails untuk cek
-- Edit file middleware/auth.js dan tambahkan email admin:

const ADMIN_EMAILS = [
  'admin@kulturaindonesia.or.id',
  'hendi@kulturaindonesia.or.id',
  'email-kamu@example.com'  -- tambah di sini
];
```

## Test Login

```bash
npm run dev
```

Buka: http://localhost:3000/admin

Login dengan:
- Email: email yang kamu buat
- Password: password yang kamu set

---

**Note**: Supabase Auth tidak bisa buat user langsung via SQL. Harus via:
1. Supabase Dashboard (paling mudah)
2. Supabase Admin API
3. Auth signup endpoint (tapi harus enable public signup)

Untuk dashboard admin, cara termudah adalah via Dashboard.
