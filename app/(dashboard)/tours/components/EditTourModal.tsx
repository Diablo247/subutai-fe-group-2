"use client";

import { useState } from "react";
import { updateTour } from "../action";

interface EditTourModalProps {
  tour: {
    id: string;
    title: string;
    description?: string;
  };
  close: () => void;
  refresh: () => void;
}

export default function EditTourModal({ tour, close, refresh }: EditTourModalProps) {
  const [title, setTitle] = useState(tour.title);
  const [description, setDescription] = useState(tour.description || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await updateTour(tour.id, { title, description });
      await refresh();
      close();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[450px] shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Edit Tour</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          className="w-full border rounded-lg px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-indigo-500/70"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full border rounded-lg px-4 py-2 h-24 outline-none focus:ring-2 focus:ring-indigo-500/70"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="text-gray-500 font-medium disabled:opacity-60"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading || !title.trim()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
