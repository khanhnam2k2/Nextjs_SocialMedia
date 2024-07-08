"use client";
import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:cursor-not-allowed disabled:bg-opacity-50"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent">
            <Loader />
          </div>
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
};

export default AddPostButton;
