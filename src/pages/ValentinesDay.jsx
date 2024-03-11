import React, { useState } from 'react';
// import '../vDayStyles.css';

function App() {
  const [yesButtonSize, setYesButtonSize] = useState(100);
  const [notReallyButtonText, setNotReallyButtonText] = useState('Not really');
  const [buttonClickCounter, setButtonClickCounter] = useState(0)
  const [showButton, setShowButton] = useState(true)
  const [yesButtonClicked, setYesButtonClicked] = useState(false)
  const MAX_BUTTON_CLICKS = 31
  const noPhrases = [
    "Still no?",
    "Why not?",
    "I love you though :(",
    "Please",
    "Pretty Please",
    "I want you to be mine though",
    "Can you just click yes?",
    "please",
    "PLEASE",
    "PLEASE BUBSTER BROWNIE!!!",
    "PLEASEEWWEAEWA!!!!!!!",
    "I'll give you a brownie :)",
    "...",
    "You really just clicked that again...",
    "STOP",
    "CLICKING",
    "THIS",
    "BUTTON!!!!",
    "I'M SICK OF THIS",
    "JUST CLICK THE OTHER ONE",
    "OR ELSE >:(",
    "FINE",
    "THIS",
    "BUTTON",
    "WILL",
    "BE",
    "NO",
    "MORE",
    "MUHAHAHAHAH",
    "HAHAHHAWHADWHAWH",
    "GOODBYE!!!!",
  ]
  const handleNotReallyClick = () => {
    setYesButtonSize(yesButtonSize + 50); // Increase yes button size
    if(buttonClickCounter === MAX_BUTTON_CLICKS) {
      setShowButton(false)
      setButtonClickCounter(buttonClickCounter + 1)
    } else {
      setButtonClickCounter(buttonClickCounter + 1)
    }
    setNotReallyButtonText(noPhrases[buttonClickCounter]); // Change not really button text
  };

  return (
    <div className="App">
      {!yesButtonClicked && (
        <>
        {buttonClickCounter <= 2 && (
          <>
            <iframe src="https://giphy.com/embed/pJNCzYKh5AbLXTpnew" width="320" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/pudgypenguins-please-cmon-pretty-pJNCzYKh5AbLXTpnew"></a></p>
          </>
        )}
        {buttonClickCounter <=6 && buttonClickCounter > 2 &&(
          <>
            <iframe src="https://giphy.com/embed/I1nwVpCaB4k36" width="480" height="476" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/atinum-I1nwVpCaB4k36"></a></p>
          </>
        )}
        {buttonClickCounter <=11 && buttonClickCounter > 6 &&(
          <>
            <iframe src="https://giphy.com/embed/f42N2PQhjDpWU" width="480" height="261" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/disney-face-aww-f42N2PQhjDpWU"></a></p>
          </>
        )}
        {buttonClickCounter === 12 &&(
          <>
            <iframe src="https://giphy.com/embed/l0MYEU0YyoTEpTDby" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/papajohns-pizza-l0MYEU0YyoTEpTDby"></a></p>
          </>
        )}
        {buttonClickCounter > 12 && buttonClickCounter < MAX_BUTTON_CLICKS &&(
          <>
            <iframe src="https://giphy.com/embed/MLhIi4DoxeUjC" width="348" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/angry-MLhIi4DoxeUjC"></a></p>
          </>
        )}
        {buttonClickCounter === MAX_BUTTON_CLICKS && (
          <>
            <img src="src/images/NootNootA1.jpg" alt="NootNootA1"></img>
          </>
        )}
        {buttonClickCounter > MAX_BUTTON_CLICKS && (
          <>
            <img src="src/images/NootNootA2.jpg" alt="NootNootA2"></img>
          </>
        )}
          
          <h1>Will you be my valentine?</h1>
          <button class={"btn"}onClick={() => setYesButtonClicked(true)} style={{ fontSize: `${yesButtonSize}%` }}>Yes</button>
          {showButton && (<button class={"btn"} onClick={handleNotReallyClick}>{notReallyButtonText}</button>)}
        </>
      )}
      {yesButtonClicked && (
        <>
          <h1>YAY!!!!!!! I love you!</h1>
          <iframe src="https://giphy.com/embed/XxEy4h6YxKE2H5TZ1x" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bestfriends-best-friends-animal-society-save-them-all-bfas-XxEy4h6YxKE2H5TZ1x"></a></p>
        </>
      )}
    </div>
  );
}

export default App;
