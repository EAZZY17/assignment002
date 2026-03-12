# Fix Render Deployment - MongoDB querySrv ENOTFOUND

The `querySrv ENOTFOUND` error happens because Render's environment sometimes can't resolve MongoDB's SRV DNS records. **Switch to the standard connection string** to fix it.

---

## Step 1: Get the standard connection string from MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Go to **Database** → select your cluster → **Connect**
3. Choose **Connect using MongoDB Compass** (or "Connect your application" and look for standard format)
4. Copy the connection string shown

   OR manually convert your SRV string:

   **Your current format (SRV):**
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.yop141k.mongodb.net/DATABASE
   ```

   **Standard format (use this in Render):**
   ```
   mongodb://USERNAME:PASSWORD@cluster0-shard-00-00.yop141k.mongodb.net:27017,cluster0-shard-00-01.yop141k.mongodb.net:27017,cluster0-shard-00-02.yop141k.mongodb.net:27017/DATABASE?ssl=true&replicaSet=atlas-yop141k-shard-0&authSource=admin
   ```

   Replace:
   - `USERNAME` and `PASSWORD` (URL-encode special chars in password: `@` → `%40`, `#` → `%23`)
   - `DATABASE` with your DB name (e.g. `portfolio`)
   - `yop141k` with your actual cluster ID if different

---

## Step 2: Update ATLASDB in Render

1. In [Render Dashboard](https://dashboard.render.com), open your web service
2. Go to **Environment**
3. Edit `ATLASDB` and paste the **standard** connection string (starts with `mongodb://`)
4. Save

---

## Step 3: Add JWT_SECRET (if not set)

Add a secure random string for JWT signing, e.g. a long password from a generator.

---

## Step 4: Redeploy

Click **Manual Deploy** → **Deploy latest commit** (or push a new commit).

---

## MongoDB Atlas: allow Render

1. In Atlas → **Network Access** → **Add IP Address**
2. Add `0.0.0.0/0` (allow from anywhere) for testing, or add [Render's outbound IPs](https://render.com/docs/outbound-ip-addresses)

---

## Password special characters

If your DB password has `@`, `#`, `:`, `/`, etc., URL-encode them in the connection string:

| Character | Encoded |
|-----------|---------|
| @         | %40     |
| #         | %23     |
| :         | %3A     |
| /         | %2F     |
| ?         | %3F     |
