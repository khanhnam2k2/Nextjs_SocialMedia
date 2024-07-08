"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
    await prisma.follower.create({
      data: {
        followerId: userId,
        followingId: currentUserId,
      },
    });
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const updateProfile = async (formData: FormData, cover: string) => {
  const fields = Object.fromEntries(formData);
  const filterFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );
  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(1).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(60).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
  });
  const validateFields = Profile.safeParse(filterFields);
  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return "error";
  }
  const { userId } = auth();
  if (!userId) {
    return "error";
  }
  const data = validateFields.data;
  if (cover) {
    data.cover = cover;
  }
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: data,
    });
    return "success";
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = auth();
  if (!userId) {
    return { success: false, msg: "User is not authenticated" };
  }
  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
    return { success: true, msg: "Thanh cong" };
  } catch (error) {
    return { success: false, msg: "Thanh cong" };
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  try {
    const createComment = await prisma.comment.create({
      data: {
        postId,
        userId,
        desc,
      },
      include: {
        user: true,
      },
    });
    return createComment;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;
  const Desc = z.string().min(5).max(255);
  const validatedDesc = Desc.safeParse(desc);
  if (!validatedDesc.success) {
    return;
  }
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
