## Textübersetzer mit React

Diese Textübersetzeranwendung ermöglicht es, Texte von Englisch nach Deutsch mit der Google-Übersetzungs-API zu übersetzen. Um jedoch die Qualität der Übersetzung zu verbessern, haben wir Chat GPT integriert, eine künstliche Intelligenz für die natürliche Sprachverarbeitung.

Die Benutzeroberfläche wurde mit React erstellt, einer JavaScript-Bibliothek für die Erstellung von Benutzeroberflächen. HTTP-Anfragen werden mit Axios, einer JavaScript-Bibliothek, ausgeführt, und der Ähnlichkeitsscore zwischen zwei Zeichenfolgen wird mit string-similarity berechnet. Die JavaScript-Bibliothek diff wird verwendet, um die Unterschiede zwischen zwei Texten zu finden.

Die Chat GPT-Funktion ist eine Verbesserung der Übersetzung, die eine präzisere Übersetzung ermöglicht. Geben Sie einfach Text auf Englisch in das Textfeld ein und klicken Sie auf die Schaltfläche "Übersetzen". Der übersetzte Text ins Deutsche wird angezeigt, sowie der Ähnlichkeitsscore zwischen dem Originaltext und dem übersetzten Text. Wenn sich die beiden Texte unterscheiden, werden auch die problematischen Wörter angezeigt.

## Verwendete Technologien

Diese Anwendung wurde unter Verwendung der folgenden Technologien entwickelt:

- React: Eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen
- Axios: Eine JavaScript-Bibliothek zur Durchführung von HTTP-Anfragen
- string-similarity: Eine JavaScript-Bibliothek zur Berechnung der Ähnlichkeit zwischen zwei Zeichenketten
- diff: Eine JavaScript-Bibliothek zum Auffinden von Unterschieden zwischen zwei Texten

## Verwendung der Anwendung

Um die Anwendung zu verwenden, befolgen Sie bitte die folgenden Schritte:

1. Klone das Repository der Anwendung: git clone `https://github.com/Emerick00/translateapp`
2. Installiere die Abhängigkeiten:` npm install`
3. Erstelle eine .env-Datei im Stammverzeichnis des Projekts und füge deinen Google Translate API-Schlüssel hinzu: `REACT_APP_API_KEY=your_api_key`
4. Starte die Anwendung: `npm start`
5. Sie können die Anwendung auch online unter folgender Adresse aufrufen: `https://translateaps.herokuapp.com/`

- Nachdem die Anwendung gestartet wurde, kannst du englischen Text in das Textfeld eingeben und auf die Schaltfläche "Übersetzen" klicken. Der übersetzte Text ins Deutsche wird angezeigt, sowie die Ähnlichkeit zwischen dem ursprünglichen Text und dem übersetzten Text. Wenn sich die beiden Texte unterscheiden, werden auch problematische Wörter angezeigt.

## Autor

Diese Apps wurde von Gruppe 6 entwickelt.
