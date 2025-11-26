# Instagram Content KI – Auth & Setup Leitfaden

## Schnellstart
1. Backend starten:
   ```powershell
   cd C:\Users\walle\Desktop\instagram-content-ki\backend
   npm install
   npm run dev
   ```
2. Frontend starten:
   ```powershell
   cd C:\Users\walle\Desktop\instagram-content-ki\frontend
   npm install
   npm run dev
   ```

## Environment Variablen (Backend & Render)

| Variable        | Beschreibung                                                                 | Beispielwert |
|-----------------|------------------------------------------------------------------------------|--------------|
| `MONGO_URI`     | Verbindung zur MongoDB (Atlas oder lokal)                                    | `mongodb+srv://user:pass@cluster.mongodb.net/instagram-content-ki` |
| `JWT_SECRET`    | Secret zum Signieren der Login-Tokens                                        | `please-change-me` |
| `OPENAI_API_KEY`| Wird für alle KI-Generierungen genutzt                                       | `sk-...` |

## Deployment nach GitHub & Render

### 1. Code ins GitHub-Repository pushen

```powershell
cd C:\Users\walle\Desktop\instagram-content-ki
git init                           # beim ersten Mal
git remote add origin https://github.com/<user>/<repo>.git
git add .
git commit -m "Release v2 Login & KI-Tools"
git branch -M main
git push -u origin main
```

- Für spätere Deploys reicht `git add -A`, `git commit -m "..."`, `git push`.
- Aktivieren Sie in Render unbedingt „Auto-Deploy: Yes“, damit neue Pushes automatisch live gehen.

### 2. Render – Backend (Web Service)

1. Render Dashboard → **New +** → **Web Service** → GitHub-Repo auswählen.
2. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** je nach Last (Starter reicht meistens)
3. Environment variables setzen:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - Optional: `NODE_VERSION = 20.18.0`
4. Deploy starten und über `https://<backend>.onrender.com/healthz` prüfen, ob Status `OK` zurückkommt.

### 3. Render – Frontend (Static Site)

1. Render Dashboard → **New +** → **Static Site**.
2. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. Unter „Environment“ die Variable `VITE_API_URL` eintragen. Sie muss auf die Backend-URL zeigen, z. B. `https://instagram-content-ki-backend.onrender.com`.  
   Der Wert landet in `import.meta.env.VITE_API_URL` und überschreibt damit den Default aus `frontend/src/api.js`.
4. Sicherstellen, dass das `_redirects` File (`frontend/public/_redirects`) existiert – damit erhält `/login` und jede andere SPA-Route immer ein `200` statt `404`.
5. Deploy auslösen. Nach Abschluss sollte das Frontend automatisch jede Änderung aus `main` bauen.

### 4. Smoke-Tests nach jedem Deploy

1. Backend: `/healthz`, anschließend `POST /auth/login` mit Testuser.
2. Frontend: `/login` öffnen, einloggen, Generator im Dashboard anstoßen.
3. Lokalen Token einmal löschen (`localStorage.removeItem("authToken")`) und erneut testen.

## Authentifizierungs-Flows

- `POST /auth/register`  
  Request: `{ "email": "demo@mail.com", "password": "Secret123!" }`  
  Response: `{ success: true, message, data: { token, user } }`
- `POST /auth/login`  
  Antwort entspricht dem Register-Endpunkt (Token + User).
- `GET /auth/me`  
  Liefert die im Backend serialisierte User-Payload; benötigt `Authorization: Bearer <token>`.
- Fehler folgen dem Schema  
  `{ success: false, error: { code, message, details? } }`.

## Manuelle Tests (PowerShell)

```powershell
$body = @{ email = 'demo@login.test'; password = 'Secret123!' } | ConvertTo-Json
Invoke-WebRequest `
  -Uri https://instagram-content-ki-backend.onrender.com/auth/login `
  -Method Post `
  -Body $body `
  -ContentType 'application/json'
```

Bei Erfolg liefert die API ein Token, das das Frontend direkt in `localStorage.authToken` speichert.

