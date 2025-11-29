# CreatorOS Branding Kit

## 1. Identity Snapshot

- **Name:** CreatorOS  
- **Kurzform:** COS  
- **Claim:** The Operating System for Modern Creators.  
- **Positionierung:** AI-native Control Center für Creator, Agenturen und Social Teams, die TikTok/IG/YouTube Workflows professionalisieren wollen.

## 2. Farbpalette

| Kategorie      | Hex      | Verwendung                                      |
| -------------- | -------- | ----------------------------------------------- |
| Primary        | #6C47FF  | CTA-Buttons, aktive States, Highlight Lines     |
| Accent 1       | #8F6BFF  | Hover States, Sekundär-Buttons                  |
| Accent 2       | #B497FF  | Gradient High-End, Diagramm-Bars                |
| Hintergrund    | #0D0D0F  | App Shell                                       |
| Panel/Card     | #1A1A1E  | Karten, Modals                                  |
| Text hell      | #ECECEC  | Primärtext                                      |
| Text muted     | #A0A0A5  | Secondary/Caption                               |
| Success        | #4CFFB3  | Positive Status                                 |
| Danger         | #FF5C5C  | Fehler/Warnings                                 |
| Warning        | #FFCC4D  | Attention, Beta Labels                          |

### Gradients
- **Primary CTA:** linear-gradient(135deg, #6C47FF → #8F6BFF → #B497FF)  
- **Panel Glow:** linear-gradient(180deg, rgba(108,71,255,.25) → rgba(13,13,15,0))

## 3. Typografie
- **Primärschrift:** Inter (Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)
- **Headings:** Inter SemiBold/Bold, Tracking +0.5%, 32–44px für Hero.
- **Body:** Inter Regular 16px, 150% line-height.
- **Captions & Badges:** Inter Medium 12–13px, Großbuchstaben für Label.

## 4. Logos
- **Wordmark:** „CreatorOS“ in Inter Bold, CREATOR in Uppercase, OS in Title Case, letter-spacing +2%.  
- **Glyph:** Rundes Quadrat mit Purple Gradient, weiße COS-Lettern.  
- **Usage:** Wordmark in Sidebar/Login, Glyph für Favicon, Avatare, Loading.

## 5. Branding Guidelines
### Do
1. Nutze Purple-Gradient für zentrale CTAs.
2. Setze 8px Corner Radius + Soft Shadow auf Cards.
3. Kombiniere helle Schrift (#ECECEC) auf dunklen Panels.
4. Halte Tone-of-Voice: professionell, futuristisch, data-backed.

### Don't
1. Keine reinen weißen Hintergründe.
2. Keine verspielten Emojis oder Slang im UI.
3. Nicht von CreatorOS Schreibweise abweichen.
4. Keine bunten Rainbow-Verläufe oder Pastell.

## 6. Tone of Voice
- **Pillars:** Professionell, Motivational, Data-driven, Futuristisch.
- **Guidelines:** Aktive Sprache („Analysiere“, „Skaliere“), Benefits > Features, Kreative respektvoll duzen, Übertreibungen vermeiden.

## 7. Marketing Claims (Top 20)
1. The Operating System for Modern Creators.
2. Your entire creator workflow — powered by AI.
3. Upload. Analyze. Create. Grow.
4. Create smarter. Scale faster.
5. From raw data to viral content in minutes.
6. Every insight. Every asset. One OS.
7. Command center for TikTok, IG & YouTube.
8. AI copilots for every creative step.
9. Turn creator chaos into clarity.
10. Make content decisions backed by data.
11. Creator-grade analytics meets AI automation.
12. One hub for DNA, ideas, scripts and launches.
13. Trusted intelligence for modern creator teams.
14. Strategize, script, schedule — in CreatorOS.
15. Unify insights, execution and growth.
16. Creator pipelines, automated.
17. See patterns, act faster, ship daily.
18. The control room for cross-platform virality.
19. Precision analytics and AI craft in one suite.
20. Scale creative output without losing your voice.

## 8. Web Copy
### Hero
- **Headline:** CreatorOS — The Operating System for Modern Creators.
- **Subline:** Eine AI-native Plattform, die Upload, Analyse, Creator DNA, Ideation, Skripte, Hooks, Captions, Kalender & Teams in einem OS vereint.
- **CTA Primary:** „Jetzt CreatorOS testen“  
- **CTA Secondary:** „Produkt-Tour ansehen“

### About
- CreatorOS verbindet Enterprise-grade Analytics mit AI-Automation.  
- Importiere komplette TikTok/IG Exporte, erhalte Creator DNA Profile und generiere Content-Assets in wenigen Minuten.  
- Entwickelt für Creator-Teams, Agenturen und Social Ops, die Daten nicht nur sehen, sondern in Produktionen integrieren wollen.

### Key Features
1. **Upload & Analyzer** – erkennt echte Creator-Videos, ignoriert Watch History, liefert Best Times, Virality Scores.  
2. **Creator DNA Wizard** – extrahiert Tonalität, Mood, Narrative Styles und Content Patterns.  
3. **AI Content Studio** – Batch Generator, Hooks, Scripts, Captions, Titles, Trend Finder, immer mit deiner DNA verknüpft.  
4. **Operating Calendar** – Status-Tracking, Kommentare und Teamaufgaben integriert mit Insights.  
5. **Team & Permissions** – Workspaces, Rollen, Freigaben, Audit Trail.

### FAQ (Kurzfassung)
- **Welche Plattformen?** TikTok vollständig, Instagram & Facebook Beta, YouTube in Planung.  
- **Ist Coding nötig?** Nein – No-Code UI + optionale API.  
- **Für wen?** Creator, Agenturen, Social-Media-Manager, Growth Teams.

## 9. Assets & Ordnerstruktur
- `frontend/src/constants/creatorOSBranding.js` – Single Source of Truth für Farben, Copy, Claims.  
- `branding/creatorOS-branding.md` – Human-readable Guidelines für Designer & PMs.  
- (Optional) Logos & Favicon unter `public/branding`.

## 10. Implementation Notes
- Buttons & Cards sollten `creatorOSBranding.palette` nutzen.  
- Layout-Komponenten importieren `creatorOSBranding` für konsistente Heroes & Tooltips.  
- AI-Generatoren + Upload Analyzer Tooltips sollen die Tone-of-Voice-Guidelines repräsentieren.



