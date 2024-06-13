'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import ImageSlider from '@/components/ImageSliderGcp';
import EmailSection from '@/components/Email';
import Footer from '@/components/Footer';
import { NavigationMenuDemo } from '@/components/NavigationMenuDemo';
import Home from '@/components/canvas/hack3d';
import Gallery from '@/components/Gallery';
import Galleryy from '@/components/gcpbadges';

export default function GoogleCloudAchievements() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut', duration: 1 } });
    tl.to('.achievements-header', { clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', opacity: 1, y: 0 }, 0.2);
  }, []);

  useEffect(() => {
    document.body.style.scrollBehavior = 'smooth';
    return () => {
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-y-scroll m-0 p-0">
      <div className="fixed top-20 left-0 text-white w-full z-20">
        <NavigationMenuDemo />
      </div>

      {/* Home as Background */}
      <div className="fixed inset-0 z-0">
        <Home />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full z-10">
        <div className="flex flex-col items-center text-center p-5 gap-5 max-w-[850px]">
          <h1 className="text-[25px] md:text-[50px] achievements-header text-white font-semibold transform translate-y-100 opacity-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
            Google Cloud Achievements
          </h1>
          <p className="text-gray-200 text-sm achievements-header md:text-base transform translate-y-100 opacity-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
            Here you can find my achievements on Google Cloud, showcasing my skills and contributions.
          </p>
        </div>
        
      </div>
      
      <Gallery />

      <div className="flex flex-col lg:px-40 sm:px-20 z-10">
        <EmailSection />
        <Footer />
      </div>
    </main>
  );
}
