"use client";

import { deleteTour } from "../action";
import { useState } from "react";

interface DeleteConfirmModalProps {
  tour: {
    id: string;
    title: string;
  };
  close: () => void;
  refresh: () => void;
}

export default function DeleteConfirmModal({
  tour,
  close,
  refresh,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTour(tour.id);
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
      <div className="bg-white rounded-2xl p-8 w-[420px] shadow-xl">
        <h2 className="text-2xl font-bold mb-2 text-red-600">Delete tour?</h2>
        <p className="text-gray-600 text-sm mb-6">
          You’re about to permanently delete <span className="font-semibold">{tour.title}</span>.
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="text-gray-500 font-medium disabled:opacity-60"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-red-600 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
