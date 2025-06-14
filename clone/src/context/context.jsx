import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]); // now storing {prompt, result}
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [darkMode,setDarkMode]=useState(false);

  function delayText(index, nextWord) {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, index * 75);
  }


  let newChat=()=>{
    setLoading(false);
    setShowResult(false);


  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const response = await runChat(input);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let NewResponseArray = newResponse2.split(" ");
    for (let i = 0; i < NewResponseArray.length; i++) {
      let nextWord = NewResponseArray[i];
      delayText(i, nextWord + " ");
    }

    // Save to prevPrompt with prompt and result
    setPrevPrompt([...prevPrompt, { prompt: input, result: newResponse2 }]);

    setLoading(false);
    setInput("");
  };

  const showPreviousPrompt = (promptData) => {
    setInput("");
    setRecentPrompt(promptData.prompt);
    setResultData(promptData.result);
    setShowResult(true);
    setLoading(false);
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    showPreviousPrompt,
    newChat,
    darkMode,
    setDarkMode
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
