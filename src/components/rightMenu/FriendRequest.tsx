import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FriendRequestList from "./FriendRequestList";

const FriendRequest = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const requestsFriend = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });
  if (requestsFriend.length === 0) return null;
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
      {/* Friend Request */}
      <FriendRequestList requests={requestsFriend} />
    </div>
  );
};

export default FriendRequest;
