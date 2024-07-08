import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const UserMediaCard = async ({ user }: { user?: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user?.id,
      img: {
        not: "",
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* BOTTOM */}
      <div className="flex gap-4 justify-between  flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div key={post.id} className="relative w-1/5 h-24">
                <Image
                  src={post.img!}
                  fill
                  alt=""
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "Not found media"}
      </div>
    </div>
  );
};

export default UserMediaCard;
