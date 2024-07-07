import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequest = () => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Friends Request</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-medium">MaryLo</span>
        </div>
        <div className="flex gap-2 justify-end">
          <Image
            src="/accept.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <Image
            src="/reject.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
