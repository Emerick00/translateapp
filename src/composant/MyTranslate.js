import { useState } from 'react';
import axios from 'axios';
import stringSimilarity from 'string-similarity';
import { diffWords } from 'diff';
// import { Configuration, OpenAIApi } from 'openai';

// const OPENAI_API_KEY = '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';
// const openaiConfig = new Configuration({ apiKey: OPENAI_API_KEY });
// const Openai = new OpenAIApi(openaiConfig);

function MyTranslate() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [retranslatedText, setRetranslatedText] = useState('');
  const [similarityScore, setSimilarityScore] = useState(0);
  const [differenceWords, setDifferenceWords] = useState([]);

  const translateText = (e) => {
    e.preventDefault();
    const apiKey = 'AIzaSyBBw8gEJFT14QqjFRt3mV4dHIieJFlk2Lw'; // ajouter votre clé API ici

    // appeler l'API de Google Translate pour traduire le texte en allemand
    axios
      .post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: inputText,
          target: 'de',
        }
      )
      .then((response) => {
        // stocker le texte traduit en allemand dans le state
        setOutputText(response.data.data.translations[0].translatedText);

        // appeler l'API de Google Translate pour traduire le texte en anglais
        axios
          .post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
              q: response.data.data.translations[0].translatedText,
              target: 'en',
            }
          )
          .then((response) => {
            // stocker le texte traduit en anglais dans le state
            const retranslated =
              response.data.data.translations[0].translatedText;
            setRetranslatedText(retranslated);

            // comparer la similarité entre le texte d'entrée et le texte re-traduit
            setSimilarityScore(
              stringSimilarity.compareTwoStrings(inputText, retranslated)
            );

            // trouver les différences entre le texte d'entrée et le texte re-traduit
            setDifferenceWords(diffWords(inputText, retranslated));

            // ajouter ChatGPT pour améliorer la traduction
            axios
              .post(
                `https://api.openai.com/v1/chat/completions`,
                {
                  prompt: `Traduisez ce texte de l'allemand à l'anglais : ${outputText}`,
                  max_tokens: 1024,
                  temperature: 0.7,
                  n: 1,
                  stop: ['\n'],
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                      'Bearer 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', // ajouter votre clé API OpenAI ici
                  },
                }
              )
              .then((response) => {
                const improvedTranslation =
                  response.data.choices[0].text.trim();
                setRetranslatedText(improvedTranslation);

                // mettre à jour les scores de similarité et les différences de mots pour la traduction améliorée
                setSimilarityScore(
                  stringSimilarity.compareTwoStrings(
                    inputText,
                    improvedTranslation
                  )
                );
                setDifferenceWords(diffWords(inputText, improvedTranslation));
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className='container max-w-2xl mx-auto my-10'>
      <form onSubmit={translateText}>
        <label htmlFor='inputText' className='block mb-2 font-bold'>
          Texte en anglais :
        </label>
        <textarea
          id='inputText'
          className='w-full p-2 border border-gray-400 rounded-md'
          rows='5'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className='px-4 py-2 mt-3 font-bold text-white bg-cyan-600 rounded hover:bg-cyan-700'
          type='submit'
        >
          Traduire
        </button>
      </form>

      {outputText && (
        <div>
          <label htmlFor='outputText' className='block mt-5 mb-2 font-bold'>
            Texte traduit en allemand :
          </label>
          <textarea
            id='outputText'
            className='w-full p-2 border border-gray-400 rounded-md'
            rows='5'
            value={outputText}
            readOnly
          />
        </div>
      )}

      {retranslatedText && (
        <div>
          <label
            htmlFor='retranslatedText'
            className='block mt-5 mb-2 font-bold'
          >
            Texte ré-traduit en anglais :
          </label>
          <textarea
            id='retranslatedText'
            className='w-full p-2 border border-gray-400 rounded-md'
            rows='5'
            value={retranslatedText}
            readOnly
          />
          <p className='mt-5 font-bold'>Score de similarité :</p>
          <p>{similarityScore.toFixed(2)}</p>

          {differenceWords.length > 0 && (
            <div>
              <p className='mt-2 font-bold'>Mots problématiques :</p>
              {differenceWords.map((word, index) => (
                <span
                  key={index}
                  className={
                    word.added
                      ? 'text-green-500'
                      : word.removed
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }
                >
                  {word.value}{' '}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyTranslate;
