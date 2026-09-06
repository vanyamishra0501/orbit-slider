import { Slider } from "./components/Slider";
import { slides } from "./slides";

function App() {
  return (
    <div>
      <h1>Orbit Slider</h1>

      <Slider
        slides={slides}
        loop={true}
      />
    </div>
  );
}

export default App;