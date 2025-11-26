**Status:** Antworten erhalten – bestehende Infrastruktur bleibt, E-Mail-Verifizierung zunächst mit Mock/Stub, sämtliche neuen Screens direkt funktionsfähig liefern.

## Plan (High-Level)

1. Backend erweitern
   - Modelle: `CreatorProfile`, `Series`, `SeriesPerformance`, `History`
   - Services/Controller-Layer (auth, creator, ai, series, history)
   - Routes + Middleware (E-Mail-Verifizierung, Platform Mode, DNA-Engine, Series Factory, Upload Analyzer)
   - Mock `emailService` (Logs statt SMTP)

2. Frontend erweitern
   - Auth-Flows inkl. Verify-Seite
   - Creator DNA Wizard + Editor
   - Dashboard mit Platform Selector, Analyze UI, Series Board, Momentum Map, History
   - API Layer für neue Endpoints

3. Deployment-Anleitung
   - Schritt-für-Schritt Render/GitHub Updates
   - Env-Variablen (inkl. Dummy-Mail-Config, OpenAI, Mongo, JWT)
