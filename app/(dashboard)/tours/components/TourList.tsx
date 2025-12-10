import EditTourModal from "./EditTourModal";
import DeleteConfirmModal from "./DeleteConfirmationModal";
import { useState } from "react";

export default function TourList({ tours, refresh }: any) {
  const [editTour, setEditTour] = useState(null);
  const [deleteTour, setDeleteTour] = useState(null);

  return (
    <div>
      {tours.length === 0 && (
        <p className="text-gray-500 mt-10 text-lg">No tours found.</p>
      )}

      <div className="space-y-4">
        {tours.map((tour: any) => (
          <div
            key={tour.id}
            className="p-6 bg-white rounded-xl shadow hover:shadow-md transition border"
          >
            <h2 className="text-xl font-semibold">{tour.title}</h2>
            <p className="text-gray-600 text-sm">{tour.description}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditTour(tour)}
                className="text-indigo-600 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteTour(tour)}
                className="text-red-500 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editTour && (
        <EditTourModal
          tour={editTour}
          close={() => setEditTour(null)}
          refresh={refresh}
        />
      )}

      {deleteTour && (
        <DeleteConfirmModal
          tour={deleteTour}
          close={() => setDeleteTour(null)}
          refresh={refresh}
        />
      )}
    </div>
  );
}
