// import { useState } from 'react';
// import axios from 'axios';
// import stringSimilarity from 'string-similarity';
// import { diffWords } from 'diff';

// function Translate() {
//   const [inputText, setInputText] = useState('');
//   const [outputText, setOutputText] = useState('');
//   const [similarityScore, setSimilarityScore] = useState(0);
//   const [differenceWords, setDifferenceWords] = useState([]);

//   const translateText = (e) => {
//     e.preventDefault();
//     const apiKey = 'AIzaSyBBw8gEJFT14QqjFRt3mV4dHIieJFlk2Lw';

//     axios
//       .post(
//         `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
//         {
//           q: inputText,
//           target: 'de',
//         }
//       )
//       .then((response) => {
//         setOutputText(response.data.data.translations[0].translatedText);
//         setSimilarityScore(
//           stringSimilarity.compareTwoStrings(
//             inputText,
//             response.data.data.translations[0].translatedText
//           )
//         );
//         setDifferenceWords(
//           diffWords(
//             inputText,
//             response.data.data.translations[0].translatedText
//           )
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className='container max-w-2xl mx-auto my-10 '>
//       <form onSubmit={translateText}>
//         <label htmlFor='inputText' className='block mb-2 font-bold'>
//           Texte en anglais :
//         </label>
//         <textarea
//           id='inputText'
//           className='w-full p-2 border border-gray-400'
//           rows='5'
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         ></textarea>
//         <button
//           className='px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded'
//           type='submit'
//         >
//           Traduire
//         </button>
//       </form>
//       {outputText && (
//         <div>
//           <label htmlFor='outputText' className='block mt-5 mb-2 font-bold'>
//             Texte traduit en allemand :
//           </label>
//           <textarea
//             id='outputText'
//             className='w-full p-2 border border-gray-400'
//             rows='5'
//             value={outputText}
//             readOnly
//           ></textarea>
//           <p className='mt-5 font-bold'>Score de similarité :</p>
//           <p>{similarityScore.toFixed(2)}</p>
//           {differenceWords.length > 0 && (
//             <div>
//               <p className='mt-2 font-bold'>Mots posant problème :</p>
//               {differenceWords.map((word, index) => (
//                 <span
//                   key={index}
//                   className={
//                     word.added
//                       ? 'text-green-500'
//                       : word.removed
//                       ? 'text-red-500'
//                       : 'text-gray-500'
//                   }
//                 >
//                   {word.value}{' '}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Translate;
import { useState } from 'react';
import axios from 'axios';
import stringSimilarity from 'string-similarity';
import { diffWords } from 'diff';

function Translate() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [retranslatedText, setRetranslatedText] = useState('');
  const [similarityScore, setSimilarityScore] = useState(0);
  const [differenceWords, setDifferenceWords] = useState([]);

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

        axios
          .post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
              q: response.data.data.translations[0].translatedText,
              target: 'en',
            }
          )
          .then((response) => {
            const retranslated =
              response.data.data.translations[0].translatedText;
            setRetranslatedText(retranslated);

            setSimilarityScore(
              stringSimilarity.compareTwoStrings(inputText, retranslated)
            );

            setDifferenceWords(diffWords(inputText, retranslated));
            // setRetranslatedText(
            //   response.data.data.translations[0].translatedText
            // );

            // setSimilarityScore(
            //   stringSimilarity.compareTwoStrings(
            //     inputText,
            //     response.data.data.translations[0].translatedText
            //   )
            // );

            // setDifferenceWords(
            //   diffWords(
            //     inputText,
            //     response.data.data.translations[0].translatedText
            //   )
            // );
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
          Texte in Englisch :
        </label>
        <textarea
          id='inputText'
          className='w-full p-2 border border-gray-400 rounded-md'
          rows='5'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className='px-4 py-2 mt-3 font-bold text-white  bg-cyan-600 rounded hover:bg-cyan-700'
          type='submit'
        >
          Übersetzen
        </button>
      </form>
      {outputText && (
        <div>
          <label htmlFor='outputText' className='block mt-5 mb-2 font-bold'>
            Text ins Deutsche übersetzt :
          </label>
          <textarea
            id='outputText'
            className='w-full p-2 border border-gray-400 rounded-md'
            rows='5'
            value={outputText}
            readOnly
          ></textarea>
        </div>
      )}
      {outputText && (
        <div>
          <label
            htmlFor='retranslatedText'
            className='block mt-5 mb-2 font-bold'
          >
            Text ins Englische übersetzt :
          </label>
          <textarea
            id='retranslatedText'
            className='w-full p-2 border border-gray-400 rounded-md'
            rows='5'
            value={retranslatedText}
            readOnly
          ></textarea>
          <p className='mt-5 font-bold'>Ähnlichkeitsfaktor :</p>
          <p>{similarityScore.toFixed(2)}</p>
          {differenceWords.length > 0 && (
            <div>
              <p className='mt-2 font-bold'>Problemwörter :</p>
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

export default Translate;
