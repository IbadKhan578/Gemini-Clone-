import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");





  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
     const response= await runChat(input);
     let responseArray = response.split("**");
     let newResponse="";
     for(let i=0; i<responseArray.length;i++){

      if(i===0 || i%2===0){
        newResponse+=responseArray[i];
      }else{
        newResponse+= "<b>"+responseArray[i]+ "</b>"
      }


     }
     let newResponse2= newResponse.split("*").join("</br>")

     setResultData(newResponse2);
     setLoading(false);
     setInput("");
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
    setInput
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
