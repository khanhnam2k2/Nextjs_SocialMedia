"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import React, { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string | undefined;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequest: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      if (!userId) return;

      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequest:
          !prev.following && !prev.followingRequest ? true : false,
      }));
    } catch (error) {}
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      if (!userId) return;

      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequest:
              !state.following && !state.followingRequest ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );
  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white p-2 text-xs rounded-lg">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequest
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button>
          <span className="text-red-400 self-end text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock user" : "Block user"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
