'use client';
import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@/public/burger-menu.png"; // Adjust the path according to your project structure
import MusicIcon from "@/public/music.png"; // Adjust the path according to your project structure

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleNavbar = () => {
    setIsVisible(!isVisible);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
  }, []);

  return (
    <div>
      <button
        onClick={toggleNavbar}
        className="fixed top-4 left-4 z-[50] p-2 rounded"
      >
        <Image
          src={MenuIcon}
          alt="Menu Icon"
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </button>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 z-[40] w-full h-[100px] bg-transparent flex justify-between items-center px-10 md:px-20"
      >
        <div className="flex flex-row gap-3 items-center">
          <div className="relative">
            {/* <Image
              src="/horseLogo.jpg"
              alt="logo"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
            /> */}
          </div>
          <h1 className="text-white text-[25px] font-semibold">
            Aryan Pandey{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
              {" "}
              {" "}
            </span>
          </h1>
        </div>

        <div className="flex flex-row gap-5 items-center mb-2">
          {Socials.map((social) => (
            <Image
              key={social.name}
              src={social.src}
              alt={social.name}
              width={28}
              height={28}
            />
          ))}
          
          <div className="relative group">
            <button
              onClick={toggleMusic}
              className="p-2 rounded"
            >
              <Image
                src={MusicIcon}
                alt="Music Icon"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to get webbed
            </div>
          </div>
        </div>
      </motion.div>

      <audio ref={audioRef} src="/ambient.mp3" />
    </div>
  );
};

export default Navbar;
