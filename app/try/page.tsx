"use client";

import goodie1 from "/public/be.png";
import goodie2 from "/public/c.png";
import goodie3 from "/public/canva.jpg";
import goodie4 from "/public/aws.png";
import goodie5 from "/public/android.jpg";
import goodie6 from "/public/cert.jpg";
import goodie7 from "/public/be.png";
import goodie9 from "/public/c.png";
import goodie8 from "/public/canva.jpg";
import goodie10 from "/public/aws.png";
import goodie11 from "/public/android.jpg";
import goodie12 from "/public/cert.jpg";
import gsap from "gsap";
import Image, { StaticImageData } from "next/image";
import { useRef, useEffect, useState } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMediaQuery } from "react-responsive";
interface ImageObject {
  id: number;
  imageSrc: StaticImageData;
  tag: string;
}

interface ImageProps {
  src: StaticImageData;
  alt: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  id: number;
}

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 ${className}`}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const DraggableImage = ({ src, alt, index, moveImage, id }: ImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "image",
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      gsap.fromTo(
        element,
        { x: 0, y: 0 },
        { x: isDragging ? 100 : 0, y: isDragging ? 100 : 0, duration: 0.5 }
      );
    }
  }, [isDragging]);

  return (
    <div
      ref={ref}
      className={`cursor-move transition-transform duration-700 ease-in-out ${
        isDragging ? "opacity-50" : "transform hover:scale-105"
      }`}
      onMouseEnter={() => gsap.to(ref.current, { x: 10, y: -10, duration: 0.5 })}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5 })}
    >
      <Card>
        <Image src={src} alt={alt} className="pointer-events-none h-[100px] w-[100px]" priority />
        <p className="text-center text-sm font-bold">{alt}</p>
      </Card>
    </div>
  );
};

export default function Home() {
  const initialImages: ImageObject[] = [
    { id: 1, imageSrc: goodie1, tag: "Image 1" },
    { id: 2, imageSrc: goodie2, tag: "Image 2" },
    { id: 3, imageSrc: goodie3, tag: "Image 3" },
    { id: 4, imageSrc: goodie4, tag: "Image 4" },
    { id: 5, imageSrc: goodie5, tag: "Image 5" },
    { id: 6, imageSrc: goodie6, tag: "Image 6" },
    { id: 7, imageSrc: goodie7, tag: "Image 7" },
    { id: 8, imageSrc: goodie8, tag: "Image 8" },
    { id: 9, imageSrc: goodie9, tag: "Image 9" },
    { id: 10, imageSrc: goodie10, tag: "Image 10" },
    { id: 11, imageSrc: goodie11, tag: "Image 11" },
    { id: 12, imageSrc: goodie12, tag: "Image 12" },
  ];

  const [search, setSearch] = useState("");
  const [images, setImages] = useState<ImageObject[]>(initialImages);

  const handleSearch = () => {
    if (search) {
      const newImages = images.filter((image) =>
        image.tag.toLowerCase().includes(search.toLowerCase())
      );
      setImages(newImages);
    } else {
      setImages(initialImages);
    }
    setSearch("");
  };

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const draggedImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <main>
      <div className="flex flex-col mb-10 gap-10">
        <h4 className="text-center text-2xl mt-[90px]">
          This is the home. Your place for Drag and Drop Gallery
        </h4>
        <div className="flex flex-col lg:flex-row justify-around px-10 gap-4">
          <input
            value={search}
            onChange={(event) => setSearch(event?.target.value)}
            type="text"
            placeholder="Search using tags present underneath the images"
            className="grow-[2] h-10 p-6 border border-black rounded-md"
          />
          <button onClick={handleSearch} className="grow bg-black text-white rounded-md">
            {search ? "Search" : "Restore all pictures"}
          </button>
        </div>
      </div>

      {images.length === 0 && (
        <p className="text-xl text-center font-extrabold">
          There are no images with that kind of tag. Click Restore all pictures to see all images
        </p>
      )}

      <DndProvider backend={HTML5Backend}>
        <div
          className={`grid gap-4 ${
            isDesktopOrLaptop ? "grid-cols-4" : "grid-cols-2"
          } overflow-auto scroll-smooth w-full h-[500px] lg:w-[75%] lg:h-[400px] mx-auto`}
        >
          {images.map((item, index) => (
            <DraggableImage
              key={item.id}
              index={index}
              id={item.id}
              src={item.imageSrc}
              alt={item.tag}
              moveImage={moveImage}
            />
          ))}
        </div>
      </DndProvider>
    </main>
  );
}
