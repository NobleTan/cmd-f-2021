import "./App.css";
import Canvas from "./components/Canvas";
import Landing from "./components/Landing";
import { backgroundsList } from "./constants/backgrounds";
import { characterList } from "./constants/characters";
import { useState } from "react";

function App() {
  const [isLanding, setLanding] = useState(true);

  return (
    <div className="App">
      {isLanding ? (
        <Landing setLanding={setLanding}></Landing>
      ) : (
        <Canvas
          backgroundList={backgroundsList}
          characterList={characterList}
        />
      )}
    </div>
  );
}

export default App;
