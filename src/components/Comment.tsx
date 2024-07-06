import Image from "next/image";
import React from "react";

const Comment = () => {
  return (
    <div>
      {/* Write */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 object-cover rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            className="cursor-pointer"
            alt=""
            width={16}
            height={16}
          />
        </div>
      </div>
      {/* Comments */}
      <div className="">
        {/* Comment */}
        <div className="flex gap-4  justify-between mt-6">
          {/* Avatar */}
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          {/* Desc */}
          <div className="flex flex-col gap-2  flex-1">
            <span className="font-semibold">John</span>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut,
              assumenda.
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  className="cursor-pointer w-4 h-4"
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  123 <span className="hidden md:inline"> Likes</span>
                </span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* Icon */}
          <Image
            src="/more.png"
            className="cursor-pointer w-4 h-4"
            alt=""
            width={16}
            height={16}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
