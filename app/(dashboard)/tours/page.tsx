"use client";

import { useEffect, useState } from "react";
import { getTours } from "./action";
import CreateTourModal from "./components/createTourModal";
import TourList from "./components/TourList";

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const refresh = async () => {
    const data = await getTours();
    setTours(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="px-12 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Tours</h1>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-indigo-700 transition"
        >
          Create new tour
        </button>
      </div>

      <div className="mt-6">
        <TourList tours={tours} refresh={refresh} />
      </div>

      {openCreateModal && (
        <CreateTourModal
          close={() => setOpenCreateModal(false)}
          refresh={refresh}
        />
      )}
    </div>
  );
}
