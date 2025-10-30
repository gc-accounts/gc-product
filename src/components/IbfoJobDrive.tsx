import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, BriefcaseBusiness, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { DsJobsDrives } from './data/DsJobsDrives';

interface CardsProps {
  sectionClass?: string,
}

const IbfoJobDrive = ({ sectionClass }: CardsProps) => {


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
    <section className={`${sectionClass ?? 'px-5 py-12 md:px-8 md:py-16 bg-primary-50'}`}>
      <div className="container max-w-7xl mx-auto">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            Job Drives
          </h2>

      <div className='max-w-5xl flex flex-col items-center mx-auto'>
       <p>Get exclusive access to Hiring Sprints designed for AI and GenAI aspirants — virtual events that connect you directly with Hiring Managers and AI leads from top companies. Discover job openings, understand their expectations, ask questions, and make a lasting impression before the interview even begins. Every Sprint is a career breakthrough waiting to happen.</p>
          </div>

        </div>

          <div className='md:max-w-5xl max-w-full mx-auto'>
  
        <h2 className="section-title mb-6 text-yellow-400 text-xl md:text-2xl font-bold text-start">
      🔔 J.P. Morgan, through Pride Global, has successfully conducted two Job drives with us
    </h2>

    <h3 className="text-black text-base font-medium mb-6 leading-relaxed text-start">
       Get a chance to hear directly from Hiring Managers and Business Heads about job roles, projects, growth opportunities, and the recruitment process. Ask questions, clarify doubts, and perform your best in the interview.
    </h3>

    <div className="text-black space-y-4 mb-6 text-start inline-block">
      <p className="flex items-start gap-2">
        <Check  className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        2 drives completed
      </p>
      <p className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        350+ participants
      </p>
      <p className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        Candidates from Commerce & Finance backgrounds – B.Com, BBA, MBA, and
        related fields
      </p>
    </div>

   <p className="text-black italic font-medium text-base md:text-lg  mb-6">
      These hiring sprints have opened exciting opportunities for students to
      launch their careers with one of the world’s leading financial institutions.
    </p>

    <p className="text-yellow-400 font-semibold text-lg md:text-xl">
      👉 You could be part of the next hiring sprint — stay tuned for details!
    </p>
  </div>


    </div>
    </section >
  )
}

export default IbfoJobDrive;
