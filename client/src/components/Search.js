import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [output, setOutput] = useState([]);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const enableListening = () => {
    const voiceRecognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    voiceRecognition.lang = "en-US";
    voiceRecognition.start();

    setIsListening(true);

    voiceRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      itemSearch(transcript);
    };
    voiceRecognition.onend = () => setIsListening(false);
  };

  const itemSearch = async (query) => {
    try {
      const response = await axios.post("http://localhost:5000/search", {
        query,
      });
      setOutput(response.data.results);
    } catch (error) {
      console.error("Error occured: ", error);
    }
  };

  return (
    <div>
      <button onClick={enableListening} disabled={isListening}>
        {isListening ? "Listening ..." : "Please Speak ... "}
      </button>
      <p>Input: {text}</p>
      <ul>
        {output.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
