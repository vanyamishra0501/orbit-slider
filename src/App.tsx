import "./App.css";
import { Slider } from "./components/Slider/Slider";

const slides = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    title: "Explore Nature",
    subtitle: "Beautiful World",
    description: "Discover beautiful places around the world.",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    title: "Modern City",
    subtitle: "Urban Life",
    description: "Experience the energy of modern cities.",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    title: "Ocean Dreams",
    subtitle: "Peaceful Journey",
    description: "Relax and explore the beauty of the ocean.",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    title: "Galaxy",
    subtitle: "Explore Space",
    description: "Journey through the stars and discover the universe.",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    title: "AI Technology",
    subtitle: "Future of Innovation",
    description:
      "Explore the future with artificial intelligence and modern technology.",
  },
];

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Orbit Slider</h1>
        <p>A modern React + TypeScript 3D carousel</p>
      </header>

      <main>
        <section className="slider-section">
          <Slider
            slides={slides}
            loop={true}
            effect="orbit"
            effectOptions={{
              radius: 300,
              depth: 200,
              perspective: 1200,
              rotate: 35,
              scale: 0.8,
            }}
            autoplay={{
              enabled: true,
              delay: 3000,
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
            transitionDuration={600}
            transitionEasing="cubic-bezier(.2,.8,.2,1)"
            width="900px"
            height="500px"
          />
        </section>
      </main>
    </div>
  );
}

export default App;