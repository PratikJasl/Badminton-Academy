import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import slide1 from "../../assets/carasol-8.png";
import slide2 from "../../assets/carasol-1.png";
import slide3 from "../../assets/carasol-3.jpg";

function Carousel() {
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  // Only set the imageLinks array once on component mount.
  useEffect(() => {
    setImageLinks([slide1, slide2, slide3]);
  }, []);

  // Change the image every 5 second using setInterval.
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
        setIsFading(false); 
      }, 500); 
    }, 50000);
    return () => clearInterval(interval);
  }, [imageLinks]);

  //Introduce a delay of 500ms before changing the image
  const nextImage = () => {
    setIsFading(true); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
      setIsFading(false); 
    }, 500);
  };

  //Introduce a delay of 500ms before changing the image
  const previousImage = () => {
    setIsFading(true); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageLinks.length) % imageLinks.length);
      setIsFading(false);
    }, 500);
  };

  return (
    <section id="carousel" className="flex flex-col gap-10 items-center justify-center mt-5">
      <div className="flex flex-col items-center justify-center lg:gap-8 lg:w-full w-86 gap-5">
        <h1 className="lg:text-8xl text-6xl font-bold text-center bg-gradient-to-t from-white to-green-500 text-transparent bg-clip-text">Simple Carousel</h1>
        <h2 className="lg:text-2xl text-xl">5x interactive images</h2>
      </div>

      <div className="flex flex-row justify-center items-center relative">
        {imageLinks.length > 0 && (
          <div className="flex flex-col justify-center relative">
            <img
              src={imageLinks[currentIndex]}
              alt="carousel"
              className={`md:w-180 w-80 h-72 md:h-90 object-cover transition-opacity duration-1000 ease-in-out rounded-4xl ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
              key={currentIndex}
            />
          </div>
        )}
        <button
            onClick={previousImage}
            className="absolute left-0 hover:cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-300"
        >
            <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
        </button>

        <button
            onClick={nextImage}
            className="absolute right-0 hover:cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-300"
        >
            <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
