import React from "react";
import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:cursor-not-allowed disabled:bg-opacity-50"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
