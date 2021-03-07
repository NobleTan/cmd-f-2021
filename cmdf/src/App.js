import "./App.css";
import Canvas from "./components/Canvas";
import DialogueBox from "./components/DialogueBox";
import { backgroundsList } from "./constants/backgrounds";
import { characterList } from "./constants/characters";

function App() {
  return (
    <div className="App">
      <Canvas backgroundList={backgroundsList} characterList={characterList} />
    </div>
  );
}

export default App;
