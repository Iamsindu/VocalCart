import React, { useState } from "react";
import axios from "axios";

const SearchButton = () => {
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
      if (response.data && response.data.results) {
        setOutput(response.data.results);
      } else {
        setOutput([
          {
            name: "No results found",
            description: "Try searching for something else.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error occured: ", error);
      setOutput([
        { name: "Error fetching data", description: "Please try again later." },
      ]);
    }
  };

  return (
    <div>
      <button onClick={enableListening} disabled={isListening}>
        {isListening ? "Listening ..." : "Please Speak ... "}
      </button>
      <p>Input: {text}</p>
      <ul>
        {output.length > 0 ? (
          output.map((item, index) => (
            <li key={index}>
              {item.name} - {item.description}
            </li>
          ))
        ) : (
          <p>No result found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchButton;
