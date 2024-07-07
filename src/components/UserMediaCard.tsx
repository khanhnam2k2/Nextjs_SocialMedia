import Image from "next/image";
import Link from "next/link";
import React from "react";
const imgMedia = [1, 2, 3, 4, 5, 6, 7, 8];
const UserMediaCard = ({ userId }: { userId?: string }) => {
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
        {imgMedia?.map((item, index) => (
          <div key={index} className="relative w-1/5 h-24">
            <Image
              src="https://images.unsplash.com/photo-1514519273132-6a1abd48302c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt=""
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaCard;
