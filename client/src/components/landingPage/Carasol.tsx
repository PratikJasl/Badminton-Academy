import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import slide1 from "../../assets/carasol-2.png";
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

  //@dev: Previous and next image indices
  const prevIndex = (currentIndex - 1 + imageLinks.length) % imageLinks.length;
  const nextIndex = (currentIndex + 1) % imageLinks.length;
  
  return (
    <section id="carousel" className="flex flex-col gap-10 items-center justify-center 2xl:mt-15 mt-5">
      <div className="flex flex-col items-center justify-center 2xl:gap-8 md:gap-5 md:w-full w-86 gap-5">
        <h1 className="2xl:text-9xl md:text-8xl text-6xl font-bold text-center bg-gradient-to-t from-white to-green-500 text-transparent bg-clip-text">Gallery</h1>
        <h2 className="2xl:text-3xl md:text-2xl text-xl">Meet our champions !!</h2>
      </div>

      <div className="flex flex-row justify-center items-center relative">
        {imageLinks.length > 0 && (
          <div className="flex justify-center relative">
            {/* Previous Image */}
            <img
              src={imageLinks[prevIndex]}
              alt="previous carousel slide"
              className="w-48 h-64 md:w-64 md:h-80 2xl:w-100 2xl:h-110 object-cover rounded-2xl shadow-lg cursor-pointer
                         transform scale-90 opacity-70 transition-all duration-500 ease-in-out
                         hover:scale-95 hover:opacity-85 z-10"
              onClick={previousImage}
            />
            {/* Current Image */}
            <img
              src={imageLinks[currentIndex]}
              alt="current carousel slide"
              className={`w-64 h-80 md:w-80 md:h-90 2xl:w-150 2xl:h-120 object-cover transition-opacity duration-1000 ease-in-out rounded-4xl ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
              key={currentIndex}
            />

            {/* Next Image */}
            <img
              src={imageLinks[nextIndex]}
              alt="next carousel slide"
              className="w-48 h-64 md:w-64 md:h-80 2xl:w-100 2xl:h-110 object-cover rounded-2xl shadow-lg cursor-pointer
                         transform scale-90 opacity-70 transition-all duration-500 ease-in-out
                         hover:scale-95 hover:opacity-85 z-10"
              onClick={nextImage}
            />
          </div>
        )}
        <button
            onClick={previousImage}
            className="absolute md:-left-9 md:block hidden hover:cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-300"
        >
            <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
        </button>

        <button
            onClick={nextImage}
            className="absolute md:-right-9 md:block hidden hover:cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-300"
        >
            <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
