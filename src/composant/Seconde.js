import axios from 'axios';
import stringSimilarity from 'string-similarity';
import { diffWords } from 'diff';
import { useRef, useState } from 'react';

function Seconde() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [similarityScore, setSimilarityScore] = useState(0);
  const [differenceWords, setDifferenceWords] = useState([]);
  const prevOutputTextRef = useRef('');
  const [outputTextPrevious, setOutputTextPrevious] = useState('');
  const [similarityScoreWithPrevious, setSimilarityScoreWithPrevious] =
    useState(0);
  const [differenceWordsWithPrevious, setDifferenceWordsWithPrevious] =
    useState([]);

  const translateText = (e) => {
    e.preventDefault();
    const apiKey = 'AIzaSyBBw8gEJFT14QqjFRt3mV4dHIieJFlk2Lw';

    axios
      .post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: inputText,
          target: 'de',
        }
      )
      .then((response) => {
        setOutputText(response.data.data.translations[0].translatedText);
        const prevOutputText = prevOutputTextRef.current;
        setSimilarityScore(
          stringSimilarity.compareTwoStrings(
            prevOutputText,
            response.data.data.translations[0].translatedText
          )
        );
        prevOutputTextRef.current =
          response.data.data.translations[0].translatedText;
        setDifferenceWords(
          diffWords(
            inputText,
            response.data.data.translations[0].translatedText
          )
        );
        setOutputTextPrevious(prevOutputText);
        setSimilarityScoreWithPrevious(
          stringSimilarity.compareTwoStrings(inputText, prevOutputText)
        );
        setDifferenceWordsWithPrevious(diffWords(inputText, prevOutputText));
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
          className='w-full p-2 border border-gray-400'
          rows='5'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className='px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded'
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
            className='w-full p-2 border border-gray-400'
            rows='5'
            value={outputText}
            readOnly
          ></textarea>
          <p className='mt-5 font-bold'>Score de similarité :</p>
          <p>{similarityScore.toFixed(2)}</p>
          {differenceWords.length > 0 && (
            <div>
              <p className='mt-2 font-bold'>Mots posant problème :</p>
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
          {outputTextPrevious && (
            <div>
              <label
                htmlFor='outputTextPrevious'
                className='block mt-5 mb-2 font-bold'
              >
                Texte traduit en anglais précédemment :
              </label>
              <textarea
                id='outputTextPrevious'
                className='w-full p-2 border border-gray-400'
                rows='5'
                value={outputTextPrevious}
                readOnly
              ></textarea>
              <p className='mt-5 font-bold'>
                Score de similarité avec le texte en anglais actuel :
              </p>
              <p>{similarityScoreWithPrevious.toFixed(2)}</p>
              {differenceWordsWithPrevious.length > 0 && (
                <div>
                  <p className='mt-2 font-bold'>Mots posant problème :</p>
                  {differenceWordsWithPrevious.map((word, index) => (
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
      )}
    </div>
  );
}

export default Seconde;
