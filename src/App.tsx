import { useRef } from "react";

import { Slider } from "./components/Slider";
import type { SliderRef } from "./components/Slider";
import { slides } from "./slides";

import "./App.css";
import "./index.css";

function App() {
  const sliderRef = useRef<SliderRef>(null);

  return (
    <main className="app">
      <h1>Orbit Slider</h1>

      <Slider
        ref={sliderRef}
        slides={slides}
        loop
        width="900px"
        height="500px"
        transitionDuration={500}
        transitionEasing="ease-in-out"
        autoplay={{
          enabled: true,
          delay: 4000,
          pauseOnHover: true,
          pauseOnInteraction: true,
        }}
        navigation={{
          enabled: true,
          nextLabel: "Next slide",
          prevLabel: "Previous slide",
        }}
        pagination={{
          enabled: true,
          clickable: true,
          type: "dots",
        }}
      />

      <div className="controls">
        <button
          type="button"
          onClick={() => sliderRef.current?.prev()}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => sliderRef.current?.next()}
        >
          Next
        </button>

        <button
          type="button"
          onClick={() => sliderRef.current?.goTo(0)}
        >
          First Slide
        </button>
      </div>
    </main>
  );
}

export default App;