# Arrow Puzzle: Arena — Complete Vercel Deployment Guide & File Sequence

Everything in this repository is pre-configured and verified for **Vercel** (`@vercel/python` Flask Serverless + Vercel Edge CDN for `public/`).

---

## 1. Exact Folder & File Sequence (Keep This Exact Structure)

```text
arrow-puzzle-arena/
├── vercel.json                # [1] Vercel routing (`/api/*` -> `api/index.py`) & PWA cache headers
├── requirements.txt           # [2] Python dependencies (`Flask`, `Werkzeug`, `gunicorn`)
├── .vercelignore              # [3] Keeps Vercel deployment bundle clean & fast
├── .gitignore                 # [4] Git ignore rules for GitHub -> Vercel deploy
├── .env.example               # [5] Optional Vercel Environment Variables template
├── api/
│   └── index.py               # [6] Vercel Serverless Python WSGI entry point (`from server import app`)
├── server.py                  # [7] Core Flask Backend (auto `/tmp` on Vercel + optional Vercel KV/Redis + Razorpay/UPI)
├── app.py                     # [8] Local / Gunicorn WSGI entry point
├── data/
│   └── leaderboard.json       # [9] Initial Arena leaderboard seed data
└── public/                    # [10] Frontend 120 FPS PWA (Served directly from Vercel Edge CDN!)
    ├── index.html             #      Main game shell (Home, Play, 50/50 Split-Screen, Arena, Payment)
    ├── styles.css             #      Luxury & Legendary themes, 50/50 Split-Screen & Global Bottom Nav CSS
    ├── manifest.json          #      Installable mobile PWA manifest
    ├── sw.js                  #      Same-origin network-first Service Worker
    ├── favicon.svg            #      Vector app icon
    └── js/
        ├── shapes.js          #      150 Campaign silhouette shapes & progressive artwork renderer
        ├── generator.js       #      Guaranteed-solvable snake-arrow generator + Deterministic Daily Arena
        ├── audio.js           #      WebAudio synth + Mobile Tactile Haptic Engine
        ├── leaderboard.js     #      Daily Arena, Weekly 5-Leagues, Friends & Live Split-Screen sync client
        └── app.js             #      120 FPS Canvas Engine, Shop, WhatsApp Challenge & Razorpay/UPI Checkout
```

---

## 2. How to Deploy on Vercel (2 Easy Ways)

### Method A: GitHub -> Vercel Dashboard (Recommended)
1. Push all files above (or extract `arrow-puzzle-arena-vercel.zip`) into a GitHub repository.
2. Open **[vercel.com/new](https://vercel.com/new)** and click **Import** on your repository.
3. Leave **Framework Preset** as `Other` and **Root Directory** as `./` (Vercel automatically reads `vercel.json`, `requirements.txt`, `api/index.py`, and `public/`).
4. *(Recommended)* Open **Environment Variables** and add:
   - `MERCHANT_ADMIN_PIN` = `2580` *(your secret Admin PIN — change this to your private PIN!)*
   - `MERCHANT_NAME` = `Arrow Puzzle: Arena`
   - `MERCHANT_UPI_ID` = `yourname@okaxis` *(your real UPI ID)*
   - `RAZORPAY_KEY_ID` = `rzp_live_...` *(or `rzp_test_...` for instant 3D-Secure Card & Razorpay Checkout)*
   - `RAZORPAY_KEY_SECRET` = `...`
   - `ORDER_SIGNING_SECRET` = `any-strong-secret-string`
5. Click **Deploy**! Within ~35 seconds your live HTTPS URL (`https://your-game.vercel.app`) will be active, including WhatsApp Challenge deep-links (`https://your-game.vercel.app/?challenge=...`) and `/api/health`.

---

## 3. Hidden Owner-Only Admin Panel (Approve / Reject UTR & Card Payments + Gateway Config)
- **Public players NEVER see Merchant Setup anywhere in the game.**
- **How ONLY YOU (Admin) open the Hidden Admin Panel:**
  1. Visit `https://your-game.vercel.app/?admin=1` (or `https://your-game.vercel.app/#admin`), **OR**
  2. Inside the game, open **Settings (`⚙️`)** and tap the **`⚙️ 120 FPS, Haptics & Settings`** title **5 times within 2.5 seconds**.
- Enter your **Secret Admin PIN** (default **`2580`**, or whatever you set in `MERCHANT_ADMIN_PIN` or inside the Admin **Gateway** tab).
- Inside the Admin Panel:
  - **⏳ Verify UTR Tab**: Every UPI UTR or manual Card payment stays in **`Pending Approval`** (`0 💎` credited). Check your bank/UPI app:
    - Click **`✅ Approve & Credit`** -> Immediately credits the Gems + bundled skins/trails to the player's wallet!
    - Click **`❌ Reject Fake UTR`** -> Marks fake/wrong UTRs as Rejected (`0 💎` credited) with your optional rejection note.
  - **📜 History Tab**: Full audit trail of Approved and Rejected orders.
  - **⚙️ Gateway Tab**: Update Merchant Name, Receiver UPI ID, Razorpay Key ID/Secret (enables instant 3D-Secure OTP Card checkout), or change your Secret Admin PIN.

### Method B: Direct Terminal Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 3. Optional 1-Click Permanent Cloud Database on Vercel
- Out of the box (with **zero** database setup), `server.py` automatically detects `VERCEL=1` and writes runtime JSON files to `/tmp/arrow_puzzle_arena_data` (avoiding Vercel's read-only `/var/task` error) AND uses HMAC-signed `orderToken` verification so payments never fail even across different serverless instances.
- For **permanent global storage** across serverless cold starts, open your Vercel project -> **Storage** tab -> **Connect Store** -> **Upstash Redis (Vercel KV)**. Vercel automatically injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`), and `server.py` automatically switches `"storageMode"` to `"cloud_kv"` with zero code changes!
