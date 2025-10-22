import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, BriefcaseBusiness, ChevronLeft, ChevronRight } from 'lucide-react';
import { DsJobsDrives } from './data/DsJobsDrives';


interface CardsProps {
  sectionClass?: string,
}

const JobDrives = ({ sectionClass }: CardsProps) => {


  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const dots = useMemo(() => {
    if (!emblaApi) return [];
    return emblaApi.scrollSnapList().map((_, index) => index);
  }, [emblaApi]);

  return (
    <section className={`${sectionClass ?? 'px-5 py-12 md:px-8 md:py-16 bg-primary-50'}` }>
      <div className="container max-w-7xl mx-auto">

               <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            Job drives
          </h2>
          {/* <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p> */}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: studentss */}

          <div className="lg:col-span-4">
            <p className='md:mt-40'>Get a chance to hear directly from Hiring Managers and Business Heads about job roles, projects, growth opportunities, and the recruitment process. Ask questions, clarify doubts, and perform your best in the interview</p>
          </div>

          <div className="lg:col-span-8">
          <div className="relative px-6">
          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute z-10 top-1/2 left-0 -translate-y-1/2 bg-white  shadow p-2 rounded-full hover:bg-primary-50 text-primary-600 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute z-10 top-1/2 right-0 -translate-y-1/2 bg-white  shadow p-2 rounded-full hover:bg-primary-50 text-primary-600 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {DsJobsDrives.map((item) => (
                <div key={item.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2">
                  <Card className={`bg-white border border-border-gray hover:border-primary-green transition-all duration-300 h-full`}>
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                      <div className="mb-4">
                        <div className="relative mb-6 flex items-center rounded-md shadow-sm border border-gray-100 px-3 py-2 w-fit">
                          <img
                            src={item.jobCompanyLogo}
                            alt={item.jobDesignation}
                            className="w-[100px] h-[40px]"
                            loading="lazy"
                            width={100}
                            height={40}
                          />
                        </div>
                        <h3 className="font-bold text-md mb-1 text-gray-900">{item.jobDesignation}</h3>
                      </div>

                      <div className="mb-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {item.jobLocation}
                        </div>
                        <div className="flex items-center">
                          <Building size={16} className="mr-2" />
                          Full-time
                        </div>
                        <div className="flex items-center">
                          <BriefcaseBusiness size={16} className="mr-2" />
                          {item.jobExp}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.jobSkills.map((skill: string, idx: number) => (
                          <Badge key={idx} className="bg-gray-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center flex-wrap mt-6 gap-2">
            {dots.map((index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`md:w-2 md:h-2  w-[0.4rem] h-[0.4rem] rounded-full transition-all duration-200 ${index === selectedIndex ? 'bg-blue-600 md:w-[28px] w-[1.5rem] shadow' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default JobDrives;
