import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth();
  let posts: any[] = [];
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followerId: true,
      },
    });

    const followingUserIds = following.map((follower) => follower.followerId);
    const ids = [userId, ...followingUserIds];
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
  return (
    <div className=" flex flex-col gap-12">
      {posts?.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "Not found post"}
    </div>
  );
};

export default Feed;
