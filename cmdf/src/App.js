import "./App.css";
import Canvas from "./components/Canvas";
import { characterList } from "./constants/characters";

function App() {
  return (
    <div className="App">
      <Canvas
        backgroundUrl="https://maplestory.io/api/THMS/20.1.0/map/110000/render"
        characterList={characterList}
      />
    </div>
  );
}

export default App;
