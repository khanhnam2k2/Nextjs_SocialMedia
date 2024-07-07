import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const UserInfoCard = ({ userId }: { userId?: string }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">Name</span>
          <span className="text-sm">@danghanam</span>
        </div>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          molestias.
        </p>
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin size={15} />
            <span>
              Living in <span className="font-semibold">VietNam</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap size={15} />
            <span>
              Went to <span className="font-semibold">Vinh University</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={15} />
            <span>
              Work at <span className="font-semibold">Vinh University</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            <span>Joined Noverber 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white p-2 text-xs rounded-lg">
          Following
        </button>
        <span className="text-red-400 self-end text-xs cursor-pointer">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
