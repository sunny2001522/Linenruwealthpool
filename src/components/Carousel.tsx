import { useState, useEffect, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[];
  autoplaySpeed?: number;
}

export function Carousel({ children, autoplaySpeed = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [autoplaySpeed, children.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white opacity-100 scale-125"
                : "bg-white opacity-40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}