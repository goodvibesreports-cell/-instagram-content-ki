TIKTOK ANALYZER – CURSOR MASTER RULES
──────────────────────────────────────────────

DEINE ROLLE:
Du bist verantwortlich für die vollständige, professionelle Implementierung eines robusten Upload- & Analyse-Systems in CreatorOS.  
Dieses System verarbeitet TikTok-JSON-Dateien und vollständige ZIP/Ordner-Uploads, extrahiert alle relevanten Inhalte, filtert Spam, erkennt Muster und erzeugt Creator-DNA & Analytics.

DU MUSST:
- stabilen, fehlertoleranten Parsing-Code liefern  
- alle strukturellen Unterschiede echter TikTok-Exports berücksichtigen  
- keine Annahmen treffen, sondern dynamisch Inhalte erkennen  
- sowohl TikTok „VideoList“, „Recently Deleted“, „Watch History“ etc. verarbeiten  
- für Instagram & Facebook bereits die Struktur vorbereiten  

──────────────────────────────────────────────
1. FILE & FOLDER INGESTION SYSTEM
──────────────────────────────────────────────

ZIEL:
Der User soll ganze Ordner oder ZIP-Dateien hochladen können.  
CreatorOS erkennt automatisch:

- TikTok JSON Exporte  
- Instagram JSON Exporte  
- Facebook JSON Exporte  
- Relevante Videos/Medien  
- Alle anderen ignorieren (HTML, Tracking, Bilder, Thumbs usw.)

ANFORDERUNGEN:
1. Baue einen neuen Endpunkt /upload-folder (POST).
2. Dieser akzeptiert:
   - einzelne JSON Files  
   - ZIPs  
   - ganze Ordner (Directory Upload, drag & drop)
3. Implementiere einen intelligenten File-Scanner:

Er soll nur diese Dateien weiterverarbeiten:

- *TikTok:*  
  Dateien, die Felder enthalten wie:  
  VideoList, Comments, ProfileMap, Recently Deleted, Your Activity, Watch History, Likes, Followers, Following  
- *Instagram:*  
  media.json, profile.json, posts_*.json, likes.json  
- *Facebook:*  
  posts_and_comments, photos_and_videos, stories, comments  

Ignoriere:
- .html, .txt, .png, .mp4, .csv
- alle Links zu https://www.tiktokv.com/share/video/... (werden ausgeschlossen)
- jede Datei ohne relevante Struktur

──────────────────────────────────────────────
2. JSON PARSER – TIKTOK (HIGH-ACCURACY MODE)
──────────────────────────────────────────────

ZIEL:
Ein Parser, der ALLE echten TikTok JSON-Strukturen verdauen kann – egal ob:

- Creator Data Export Level 1
- Creator Data Export Level 2
- Voll-Export (inkl. Watch History, Live, Shop)

ANFORDERUNGEN:

1. Erstelle Datei: utils/tiktokParser.js
2. Zentrale Funktion:

parseTikTokDataset(json) -> { videos, deletedVideos, activity, profile }

3. Der Parser extrahiert mindestens:

VIDEOS:
- Upload Datum  
- Link  
- Likes  
- Sound  
- Titel / AddYourText / Alternate Text  
- CoverImage  
- Location  
- Engagement (Comments/Stitches/Duets allowed)  

DELETED POSTS:
- Alles wie oben  
- plus: DateDeleted

WATCH HISTORY:
- Vollständige Liste von angesehenen Links + Zeitstempel

PROFILE:
- displayName  
- userName  
- followerCount  
- followingCount  
- likesReceived  
- bio  
- profilePhoto  

IGNORIERE IMMER:
“https://www.tiktokv.com/share/video/XXX/”
Diese Links enthalten *keine Metadaten, liefern **keine Analyse-Werte* und sollen nicht in Videos, nicht in History und nicht in Analysen auftauchen.

──────────────────────────────────────────────
3. ANALYZER – CREATOR DNA + VIRALITY ENGINE
──────────────────────────────────────────────

Datei: utils/tiktokAnalyzer.js

FUNKTIONEN, DIE DU BAUST:

extractPostingTimes(videos)  
- Erkennt Muster wie:  
  - beste Stunde  
  - beste Wochentage  
  - Video-Längen-Muster  
  - Like-Ratio Muster  

findViralVideos(videos)  
- Sortiert Videos nach Performance (Likes / Zeit)  
- Erkennt außergewöhnliche Peaks  
- Markiert Videos mit CreatorDNA-Tags  

identifyPatterns(videos)  
- Muster in Hooks  
- Struktur vom Text  
- Sound-Typen  
- Content-Wiederholungen  
- Themencluster  

extractCreatorDNA(videos, profile)  
- Tonfall  
- Themen  
- Video-Stil  
- Pace  
- Humor / Emotion  
- Call-To-Action-Muster  

──────────────────────────────────────────────
4. VIRALITÄTS-ANALYSE (IGNORING NON-VALUABLE LINKS)
──────────────────────────────────────────────

WICHTIG:
Analysiere ausschließlich Videos, die mindestens folgende Felder besitzen:

- Date  
- Link (NICHT share/video)  
- Likes  
- CoverImage oder Title  

IGNORIERE:
Alle „tiktokv.com/share/video“ Links, da sie keine validen Exportdaten darstellen.

Implementiere eine Filter-Funktion:

filterValidTikTokVideos(videos)

Die Filterliste enthält alle von dir genannten URLs.

──────────────────────────────────────────────
5. FRONTEND – ANALYSIS UI / PROFESSIONAL VISUALIZATION
──────────────────────────────────────────────

Der Analyzer muss visuell professionelle Charts liefern:

- Best Posting Time (Heatmap + Empfehlungen)
- Viral Video Ranking
- CreatorDNA Cluster (Keywords, Style, Sound, Structure)
- Growth Patterns
- Engagement Type Breakdown
- Upload Frequency Map
- Deleted Video Patterns (Schattenanalyse)

UI-Regeln:
- Nutze StatsCards
- Nutze Purple Gradients (CreatorOS Branding)
- Tooltips für alle KPIs
- Erkläre jede Zahl („Warum ist das wichtig?“)

──────────────────────────────────────────────
6. PROJEKTWEITE KONVENTIONEN – WICHTIG!
──────────────────────────────────────────────

1. Keine doppelten Funktionen!  
2. Keine Hardcodes für bestimmte JSON-Strukturen!  
3. Dynamisch erkennen.  
4. Fehler dürfen niemals die App crashen lassen – stattdessen Warnungen.  
5. Alle Analysen müssen in tiktokAnalyzer.js stattfinden – nicht im Frontend.  
6. Jede Änderung soll CreatorOS Branding respektieren.

──────────────────────────────────────────────
7. ZUSAMMENFASSUNG (FÜR DICH – CURSOR)

DEINE AUFGABE IST ES:
- Ordner-Upload → automatisch relevante Dateien finden  
- TikTok JSON → robust parsen  
- Unbrauchbare Links ignorieren  
- Virality Patterns extrahieren  
- CreatorDNA berechnen  
- Alles sauber und professionell im UI darstellen  

Du arbeitest dabei streng nach dem Branding & der Struktur von CreatorOS