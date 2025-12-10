"use client";

import { useState } from "react";
import { createTour } from "../action";

export default function CreateTourModal({ close, refresh }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    await createTour({ title, description });
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[450px] shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Create Tour</h2>

        <input
          placeholder="Title"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="text-gray-500 font-medium">
            Cancel
          </button>

          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
