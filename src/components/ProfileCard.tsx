import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src="https://images.unsplash.com/photo-1720170494683-48428a09122b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt=""
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
          width={48}
          height={48}
          alt=""
          className="rounded-full w-12 h-12 object-cover absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">Nam</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              width={12}
              height={12}
              alt=""
              className="rounded-full w-3 h-3 object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              width={12}
              height={12}
              alt=""
              className="rounded-full w-3 h-3 object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              width={12}
              height={12}
              alt=""
              className="rounded-full w-3 h-3 object-cover"
            />
          </div>
          <span className="font-semibold text-xs text-gray-500">
            500 Follower
          </span>
        </div>
        <button className="bg-blue-500 text-white p-2 text-xs rounded-lg">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
