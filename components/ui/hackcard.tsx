import Image from "next/image";
import { FollowerPointerCard } from "../ui/following-pointer";

type BlogContent = {
  slug: string;
  author: string;
  date: string;
  title: string;
  description: string;
  image: string;
  authorAvatar: string;
};

type FollowingPointerDemoProps = {
  blogContent: BlogContent;
};

export function FollowingPointerDemo({ blogContent }: FollowingPointerDemoProps) {
  return (
    <div className="w-80 mx-auto">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-black hover:shadow-xl border border-zinc-100">
          <div className="relative w-full pb-[56.25%] bg-black-100 rounded-tr-lg rounded-tl-lg overflow-hidden">
            <Image
              src={blogContent.image}
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 left-0 w-full h-full group-hover:scale-95 group-hover:rounded-2xl transform transition duration-200"
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold my-4 text-lg text-white">
              {blogContent.title}
            </h2>
            <h2 className="font-normal my-4 text-sm text-zinc-400">
              {blogContent.description}
            </h2>
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-gray-500">{blogContent.date}</span>
              <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
                Read More
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height={20}
      width={20}
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);