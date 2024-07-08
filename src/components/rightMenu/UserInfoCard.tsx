import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user?: User }) => {
  const createdAtDate = user?.createdAt ? new Date(user.createdAt) : null;
  const formatDate = createdAtDate?.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user?.id,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user?.id,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);
    const followRequestRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user?.id,
      },
    });
    followRequestRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }
  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user?.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user?.name && user.surname
              ? user.surname + " " + user.name
              : user?.username}
          </span>
          <span className="text-sm">@{user?.username}</span>
        </div>
        {user?.description && <p className="text-xs">{user.description}</p>}

        <div className="flex flex-col gap-3 text-xs">
          {user?.city && (
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              <span>
                Living in <span className="font-semibold">{user.city}</span>
              </span>
            </div>
          )}
          {user?.school && (
            <div className="flex items-center gap-2">
              <GraduationCap size={15} />
              <span>
                Went to <span className="font-semibold">{user.school}</span>
              </span>
            </div>
          )}
          {user?.work && (
            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={15} />
              <span>
                Work at <span className="font-semibold">{user.work}</span>
              </span>
            </div>
          )}
          {formatDate && (
            <div className="flex items-center gap-2">
              <CalendarDays size={15} />
              <span>Joined {formatDate}</span>
            </div>
          )}
        </div>
        {currentUserId && currentUserId !== user?.id && (
          <UserInfoCardInteraction
            userId={user && user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
