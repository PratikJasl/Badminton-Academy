import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import slide1 from "../../assets/carasol-5.png";
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
    }, 5000);
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

  // //Text to display on top of the slides.
  // const slideTextHeading = [
  //   "OUR MISSION",
  //   "EXTENSIVE SUPPORT",
  //   "ONE TO ONE FEEDBACK"
  // ]

  // const slideTextContent = [
  //   "our mission is to nurture talent and develop players capable of competing at state and national levels",
  //   "We provide Extensive player support and trainig",
  //   "One to One feedback with the coach after every traning session."
  // ]

  return (
    <section id="carousel" className="mt-15">
      <div className="flex flex-row justify-center items-center relative">
        {imageLinks.length > 0 && (
          <div className="flex flex-col justify-center relative">
            <img
              src={imageLinks[currentIndex]}
              alt="carousel"
              className={`w-screen h-72 md:h-150 object-cover transition-opacity duration-1000 ease-in-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
              key={currentIndex}
            />
            {/* <div className="absolute text-sm md:text-xl top-3/5 left-1/20 p-3 text-yellow-400 text-justify">
              <h2 className="font-bold">{slideTextHeading[currentIndex]}</h2>
              <p className="mt-2 text-white rounded-2xl">{slideTextContent[currentIndex]}</p>
            </div> */}
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
