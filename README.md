## Traducteur de texte en utilisant React

Cette application permet de traduire du texte de l'anglais à l'allemand en utilisant l'API de traduction de Google. Elle utilise React pour créer une interface utilisateur dynamique.

## Technologies utilisées

Cette application a été développée en utilisant les technologies suivantes :

- React : une bibliothèque JavaScript pour la création d'interfaces utilisateur
- Axios : une bibliothèque JavaScript pour effectuer des requêtes HTTP
- string-similarity : une bibliothèque JavaScript pour calculer le score de similarité entre deux chaînes de caractères
- diff : une bibliothèque JavaScript pour trouver les différences entre deux textes

## Comment utiliser l'application

Pour utiliser l'application, il suffit de suivre les étapes suivantes :

1. Cloner le dépôt de l'application : `git clone https://github.com/your_username/translate-app.git`
2. Installer les dépendances : `npm install`
3. Créer un fichier `.env` à la racine du projet et ajouter votre clé d'API Google Translate : `REACT_APP_API_KEY=your_api_key`
4. Démarrer l'application : `npm start`

- Une fois l'application démarrée, vous pouvez saisir du texte en anglais dans la zone de texte et cliquer sur le bouton "Traduire". Le texte traduit en allemand sera affiché ainsi que le score de similarité entre le texte original et le texte traduit. Si les deux textes diffèrent, les mots problématiques seront également affichés.

## Auteur

Cette application a été développée par [votre nom].
