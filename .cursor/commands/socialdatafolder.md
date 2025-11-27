# ROLE: Senior Fullstack Engineer & System Architect for "TikTok Content Analyzer & Creator DNA"

Du arbeitest in einem bestehenden Projekt mit:
- Backend: Node.js + Express, MongoDB (oder vergleichbare NoSQL/SQL-DB)
- Frontend: React (Vite), bestehende Seiten & Tools: Dashboard, Creator DNA Wizard, Upload, Analyzer, Generatoren, Calendar, Team, Settings, Credits etc.
- KI: OpenAI API (z. B. gpt-4.x) ist angebunden

Deine Aufgabe in diesem Schritt:
Wir implementieren einen *professionellen, robusten Ordner-Upload mit automatischer Plattform-Erkennung und Smart Parsing* – mit Fokus auf *TikTok JSON Exporte*.  
Instagram / Facebook werden später ergänzt, aber die Architektur muss jetzt schon darauf vorbereitet sein.

---

## 1. Neue Backend-Funktion: Folder-Upload & JSON-Scan

### 1.1 Neue Route

Erstelle im Backend eine neue Route:

- POST /api/upload-folder
- Erwartet:
  - multipart/form-data
  - Entweder:
    - eine ZIP-Datei im Feld archive
    - oder mehrere einzelne Dateien im Feld files[]
- Antwort:
  - JSON mit:
    - datasets: Liste der erkannten Datensätze (z. B. TikTok Posts)
    - summary: Aggregierte Informationen (Anzahl Dateien, Plattformen, ignorierte Dateien)
    - warnings: Liste verständlicher Hinweise bei Problemen

### 1.2 File Handling

- Verwende *multer* (falls noch nicht für multiple Files/ZIP genutzt), um Uploads anzunehmen.
- Unterstützte Dateitypen:
  - .zip (Ordner als Archiv)
  - .json (Einzeldateien)
- Wenn ZIP:
  - Entpacke serverseitig in einen temporären Ordner (/tmp/uploads/<session-id>/...).
  - Durchlaufe rekursiv alle Dateien.
- Wenn einzelne JSON-Dateien:
  - Iteriere über alle files[].

Filter:
- Nur .json Dateien weiterverarbeiten.
- Andere Dateitypen ignorieren, aber in warnings erwähnen.

---

## 2. Plattform-Erkennung (Platform Detector)

Erstelle eine Utility-Datei, z. B.:

- backend/src/utils/platformDetector.js

Exportiere eine Funktion:

```ts
type DetectedPlatform = 'tiktok' | 'instagram' | 'facebook' | 'unknown';

type DetectedDataType =
  | 'tiktok_posts'
  | 'tiktok_deleted_posts'
  | 'tiktok_watch_history'
  | 'tiktok_likes'
  | 'tiktok_profile'
  | 'generic_unknown';

interface DetectionResult {
  platform: DetectedPlatform;
  dataType: DetectedDataType;
  confidence: number; // 0 - 1
  reason: string;     // kurze Begründung für Logging/Debugging
}

export function detectPlatformAndType(
  json: any,
  fileName: string
): DetectionResult;