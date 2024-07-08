"use client";
import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

type CommentWithUserType = Comment & {
  user: User;
};
const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUserType[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const add = async () => {
    if (!user || !desc) return;
    addOptimisticComments({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        avatar: user.imageUrl || "/noAvatar.png",
        username: "Sending...",
        school: "",
        work: "",
        city: "",
        cover: "",
        createdAt: new Date(Date.now()),
        description: "",
        name: "",
        surname: "",
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
      setDesc("");
    } catch (error) {}
  };
  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentState,
    (state, value: CommentWithUserType) => [value, ...state]
  );

  return (
    <>
      {/* Write */}
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 object-cover rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              value={desc}
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              className="cursor-pointer"
              alt=""
              width={16}
              height={16}
            />
          </form>
        </div>
      )}
      {/* Comments */}
      <div className="">
        {/* Comment */}
        {optimisticComments.map((comment) => (
          <div key={comment.id} className="flex gap-4  justify-between mt-6">
            {/* Avatar */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full"
            />
            {/* Desc */}
            <div className="flex flex-col gap-2  flex-1">
              <span className="font-semibold">
                {comment.user?.name && comment.user.surname
                  ? comment.user.surname + " " + comment.user.name
                  : comment.user?.username}
              </span>
              <p>{comment.desc}</p>
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
        ))}
      </div>
    </>
  );
};

export default CommentList;
