import { useRef } from "react";

import {
  Slider
} from "./components/Slider";

import type {
  SliderRef
} from "./components/Slider";

import { slides } from "./data/slides";

import "./App.css";

function App() {
  const sliderRef =
    useRef<SliderRef>(null);

  return (
    <main className="app">
      <h1>Orbit Slider</h1>

      <Slider
        ref={sliderRef}
        slides={slides}
        slidesPerView={{
          mobile: 1,
          tablet: 2,
          desktop: 2,
        }}
        gap={{
          mobile: 10,
          tablet: 16,
          desktop: 28,
        }}
        loop={true}
        autoplay={{
          enabled: true,
          interval: 3000,
          pauseOnHover: true,
          pauseOnInteraction: true
        }}
        navigation={{
          enabled: true
        }}
        pagination={{
          enabled: true,
          type: "dots"
        }}
      />

      <div className="controls">
        <button
          onClick={() =>
            sliderRef.current?.prev()
          }
        >
          Previous
        </button>

        <button
          onClick={() =>
            sliderRef.current?.next()
          }
        >
          Next
        </button>

        <button
          onClick={() =>
            sliderRef.current?.goTo(2)
          }
        >
          Go to Slide 3
        </button>

        <button
          onClick={() =>
            sliderRef.current?.startAutoplay()
          }
        >
          Start Autoplay
        </button>

        <button
          onClick={() =>
            sliderRef.current?.stopAutoplay()
          }
        >
          Stop Autoplay
        </button>
      </div>
    </main>
  );
}

export default App;