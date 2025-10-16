import { useEffect, useState, useRef } from "react";

// Assuming this constant is available globally or configured in your environment
const API_URL = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT; 

const VideoSection = () => {
  const videoRef = useRef<HTMLDivElement>(null); // Reference for the container div
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Intersection Observer for lazy loading the video element
  useEffect(() => {
    const currentRef = videoRef.current;
    
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      // Check visibility when 30% of the element is in view
      { threshold: 0.3 } 
    );

    observer.observe(currentRef);

    return () => {
        if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div 
      ref={videoRef} 
      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
    >
      {isVideoVisible && (
        // The video element is absolutely positioned to cover the entire container (16:9)
        <video
          src={`${API_URL}/uploads/Shruti_Corporate_video_GC_Enterprise_8a697545f0.mp4`}
          controls
          muted
          playsInline
          poster={`${API_URL}/uploads/GC_20_20_Enterprise_20_Intro_65f395cc1d.webp`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
      {/* Optional: Add a placeholder while the video is loading/not visible yet */}
      {!isVideoVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            Loading Video...
        </div>
      )}
    </div>
  );
};

export default VideoSection;
