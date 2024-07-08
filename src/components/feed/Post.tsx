import Image from "next/image";
import React from "react";
import Comment from "./Comment";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type FeedPostType = PostType & {
  user: User;
} & { likes: [{ userId: string }] } & { _count: { comments: number } };

const Post = ({ post }: { post: FeedPostType }) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4  rounded-lg shadow-md">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-medium">
            {post.user?.name && post.user.surname
              ? post.user.surname + " " + post.user.name
              : post.user?.username}
          </span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4 ml-2">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className=" object-cover rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* Interaction */}
      <PostInteraction
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNumber={post._count.comments}
      />
      <Comment postId={post.id} />
    </div>
  );
};

export default Post;
