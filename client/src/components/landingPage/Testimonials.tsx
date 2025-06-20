import { useRef, useState, useEffect } from 'react';
import Testimonial1 from "../../assets/Testimonial1.png";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function Testimonials() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    //@dev: Array of testimonials
    const testimonialsData = [
        {
            image: Testimonial1,
            name: "Mr. Rohan Sahi",
            title: "Manager @British Telecom",
            batch: "Adults Batch",
            quote: "This academy is a game-changer! From day one, I felt the passion and professionalism. My footwork and shot placement have improved immensely."
        },
        {
            image: Testimonial1,
            name: "Ms. Priya Sharma",
            title: "Software Engineer @Google",
            batch: "Advanced Batch",
            quote: "The personalized coaching here is unmatched. I've significantly improved my strategy and control. Highly recommend for serious players!"
        },
        {
            image: Testimonial1,
            name: "Master Aryan Singh",
            title: "Student @DPS",
            batch: "Juniors Batch",
            quote: "I love coming here! The coaches are fun and teach us so many new techniques. My smashes are much stronger now!"
        },
        {
            image: Testimonial1,
            name: "Dr. Anjali Verma",
            title: "Physician @Apollo Hospitals",
            batch: "Morning Batch",
            quote: "A fantastic way to stay active and learn. The flexible timings and friendly environment make it perfect for busy professionals."
        },
        {
            image: Testimonial1,
            name: "Coach David Lee",
            title: "Ex-Pro Player",
            batch: "Pro Training",
            quote: "As a former pro, I'm impressed by the structured training and dedication. They develop true champions."
        },
    ];

    //@dev: Function to calculate and update scrollability of buttons
    const updateScrollability = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    //@dev: Use useEffect to update scrollability on mount and resize
    useEffect(() => {
        updateScrollability();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollability);
            window.addEventListener('resize', updateScrollability);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', updateScrollability);
                window.removeEventListener('resize', updateScrollability);
            }
        };
    }, []);

    const slide = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const isDesktop = window.innerWidth >= 1024;
        const cardWidth = isDesktop ? 520 : 256; // lg:w-130 (520px), min-w-64 (256px)
        const gapWidth = 30; // gap-10 (30px)
        const scrollAmount = cardWidth + gapWidth;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }

        // Update current index for potential future pagination dots/indicators
        const newIndex = currentIndex + (direction === 'right' ? 1 : -1);
        setCurrentIndex(Math.max(0, Math.min(newIndex, testimonialsData.length - 1))); // Keep index within bounds
    };

    return (
        <section id="testimonials" className="w-full 2xl:mt-30 mt-20 mb-20 flex flex-col items-center gap-15 p-10 relative">

            <div className="flex flex-col items-center gap-5">
                <h1 className="2xl:text-9xl md:text-8xl text-5xl font-bold"><span className="bg-gradient-to-t from-white to-green-500 text-transparent bg-clip-text">Testimonials</span> </h1>
                <h2 className="md:text-4xl text-3xl"> what our <span className="text-green-500 lg:text-4xl text-3xl italic">players say</span></h2>
            </div>

            <div className="relative lg:w-full w-70 flex items-center justify-center">
                <button
                    onClick={() => slide('left')}
                    className={`absolute left-0 z-10 p-2 rounded-full bg-gray-800 text-white shadow-lg
                                hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
                                transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                    disabled={!canScrollLeft}
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex flex-row items-center justify-start gap-5 p-2 overflow-x-hidden scrollbar-hide
                                w-[calc(256px + 40px)] lg:w-[calc(2*520px+40px)] 2xl:w-[101rem]"
                >
                    {testimonialsData.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex md:flex-row flex-col gap-5 lg:justify-start justify-center items-center min-w-[256px] lg:flex-shrink-0 2xl:h-70 md:w-[520px] md:h-60 h-90 relative p-5 bg-white rounded-xl text-center"
                        >
                            <div>
                                <img src={testimonial.image} alt="person" className="md:h-45 h-30 md:w-60 w-15"/>
                            </div>

                            <div className="flex flex-col items-center lg:gap-5 gap-2">
                                <div className="text-black">
                                    <h1 className="lg:text-xl text-md font-bold text-black italic">{testimonial.name}</h1>
                                    <p className="lg:text-md text-sm">{testimonial.title}</p>
                                    <p className="lg:text-md text-sm">{testimonial.batch}</p>
                                </div>
                                <p className="text-gray-600 lg:text-md text-sm">
                                    {testimonial.quote}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => slide('right')}
                    className={`absolute right-0 z-10 p-2 rounded-full bg-gray-800 text-white shadow-lg
                                hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
                                transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                    disabled={!canScrollRight}
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        
        </section>
    );
}

export default Testimonials;