{
  "commands": [
    {
      "name": "Full Project Cleanup",
      "description": "Bereinigt das gesamte Projekt auf Senior-Level. Entfernt doppelte Funktionen, erkennt redundante Logik, extrahiert Services, bereinigt Imports, reorganisiert Dateien und wendet Project Rules vollständig an.",
      "prompt": "Führe eine vollständige Codeanalyse durch. Entferne alle doppelten Funktionen, doppelte Datenstrukturen und ungenutzte Variablen. Extrahiere wiederverwendbare Logik in Services/Utils. Überarbeite unklare Strukturen, bereinige Imports, vereinfache Komponenten und richte das gesamte Projekt nach den definierten PROJECT RULES aus.",
      "type": "global"
    },
    {
      "name": "UI Polishing Pass",
      "description": "Optimiert UI/UX nach modernen SaaS-Standards (OpenAI, Notion, Figma).",
      "prompt": "Überarbeite die betroffenen Frontend-Komponenten für ein professionelles, modernes SaaS-Design. Optimiere Abstände, Layouts, Typografie, Responsive Behavior und Interaktionsfeedback. Entferne UI-Duplikate und stelle eine modulare Komponentenstruktur sicher.",
      "type": "local"
    },
    {
      "name": "Fix Authentication System",
      "description": "Prüft und verbessert Registrierung, Login, JWT, E-Mail-Verifizierung, Password Hashing und Fehlerverhalten.",
      "prompt": "Analysiere und optimiere alle Auth-bezogenen Dateien (Models, Routes, Middleware, Utils). Stelle sicher, dass Registrierung, Login und E-Mail-Verifizierung stabil funktionieren. Überarbeite Validierung, Fehlerbehandlung, Token-Handling und Passwort-Hashing gemäß PROFESSIONAL AUTH RULES.",
      "type": "global"
    },
    {
      "name": "AI Endpoint Optimization",
      "description": "Verbessert alle AI-Endpunkte: Prompt-Struktur, Sicherheit, Fehlerhandling, Plattformintegration.",
      "prompt": "Analysiere die AI-Endpunkte. Sorge für strukturierte Prompts (JSON), robuste Fehlerabfangung, Plattformparameter-Unterstützung, Validierung von AI-Ausgaben und saubere Service-Trennung. Entferne Duplikate und verbessere die Architekturen.",
      "type": "global"
    },
    {
      "name": "Platform Mode Integration",
      "description": "Implementiert oder korrigiert die gesamte Plattform-Engine im Backend & Frontend.",
      "prompt": "Stelle sicher, dass der Platform Mode vollständig integriert ist: Backend-Parameter, Validierung, AI-Prompts, History, Frontend Dropdown, Active State und konsistente Übergabe in alle Endpoints. Wenn etwas fehlt, implementiere es strukturiert gemäß PROJECT RULES.",
      "type": "global"
    },
    {
      "name": "Frontend Structure Pass",
      "description": "Überprüft und verbessert die Frontend-Ordnerstruktur und Komponentenarchitektur.",
      "prompt": "Analysiere das komplette Frontend. Entferne ungenutzte Komponenten, gruppiere ähnliche Elemente, extrahiere wiederverwendbare UI-Elemente, bereinige Styling und verschiebe Logik in passende Hooks/Services. Alles gemäß den PROJECT RULES.",
      "type": "global"
    },
    {
      "name": "Backend Structure Pass",
      "description": "Prüft Services, Controller, Middleware, Models und Utils.",
      "prompt": "Überprüfe das gesamte Backend auf korrekte Architektur. Trenne Logik in Services, reduziere Controller, extrahiere gemeinsame Logik, entferne Dead Code und sorge für klare Dateistrukturen.",
      "type": "global"
    },
    {
      "name": "Fix Database Models",
      "description": "Validiert alle MongoDB Models auf Qualität, Konsistenz und professionelle Struktur.",
      "prompt": "Analysiere alle Datenbank-Modelle. Überprüfe Indexe, Unique-Felder, Validierung, Konsistenz, Typen, Pflichtfelder und History-Struktur. Optimiere die Models so, dass sie wartbar, konsistent und professionell sind.",
      "type": "global"
    },
    {
      "name": "Create Missing Files",
      "description": "Identifiziert und erzeugt fehlende Dateien, Services oder Strukturen.",
      "prompt": "Suche nach fehlenden Dateien wie Services, Utils, Routes oder Komponenten, die im Projekt erwartet werden. Erstelle sie automatisch gemäß PROJECT RULES.",
      "type": "local"
    },
    {
      "name": "Refactor Selected File",
      "description": "Refaktoriert eine bestimmte Datei nach den Project Rules.",
      "prompt": "Refaktoriere die ausgewählte Datei vollständig: Struktur, Benennung, Modularität, Reduktion von Code-Duplikaten, klare Logiktrennung, schöneres UI, vollständige Clean-Code-Anpassung.",
      "type": "local"
    }
  ]
}# profi

Write your command content here.

This command will be available in chat with /profi
