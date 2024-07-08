"use client";
import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>("");
  const [message, setMesssage] = useState({ success: true, text: "" });
  const handleClose = () => {
    setOpen(false);
    message.success && router.refresh();
  };
  const handleOpen = () => {
    setOpen(true);
    setMesssage({ success: true, text: "" });
  };
  const handleUpdateProfile = async (formData: FormData) => {
    const res = await updateProfile(formData, cover?.secure_url || "");
    if (res === "success") {
      setMesssage({ success: true, text: "Profile updated successfully" });
    } else {
      setMesssage({ success: false, text: "Profile updated failed" });
    }
  };
  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={handleOpen}
      >
        Update Info
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) => handleUpdateProfile(formData)}
            className="p-8 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            <h1>Update Profile</h1>
            <div className="">
              <p>Use the navbar profile to change the avatar or username</p>
            </div>
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-500">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="ring-1 ring-gray-300 p-[7px] rounded-md text-sm"
                  placeholder={user.name || "John"}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  className="ring-1 ring-gray-300 p-[7px] rounded-md text-sm"
                  placeholder={user.surname || "Doe"}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="ring-1 ring-gray-300 p-[7px] rounded-md text-sm"
                  placeholder={user.description || "Life is beautiful..."}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="ring-1 ring-gray-300 p-[7px] rounded-md text-sm"
                  placeholder={user.city || "Ha Tinh"}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  className="ring-1 ring-gray-300 p-[7px] rounded-md text-sm"
                  placeholder={user.school || "RMIT"}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  className="ring-1 ring-gray-300 p-[7px] rounded-md text-sm"
                  placeholder={user.work || "IT"}
                />
              </div>
            </div>
            <UpdateButton />
            {message && message.success ? (
              <span className="text-green-500">{message.text}</span>
            ) : (
              <span className="text-red-500">{message.text}</span>
            )}
            <div
              className="absolute text-xl right-2 top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
