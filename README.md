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

