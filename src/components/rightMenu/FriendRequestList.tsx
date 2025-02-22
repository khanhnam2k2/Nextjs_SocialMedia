"use client";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};
const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);
  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };
  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };
  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );
  return (
    <div className="">
      {optimisticRequests.map((request) => (
        <div key={request.id} className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className="font-medium">
              {request.sender?.name && request.sender.surname
                ? request.sender.surname + " " + request.sender.name
                : request.sender?.username}
            </span>
          </div>
          <div className="flex gap-2 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
