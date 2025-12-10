"use client";

const mockStats = {
  totalTours: 12,
  completionRate: 80,
  totalViews: 120,
  activeUsers: 10,
};

const mockTopTours = [
  { id: "1", title: "Welcome Tour", views: 234, completion: 78 },
  { id: "2", title: "Product Demo", views: 200, completion: 61 },
];

export default function DashboardPage() {
  const userName = "John"; // later: pull from auth profile

  return (
    <div className="px-12 py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">
        Welcome, <span className="text-indigo-600">{userName}</span> 👋
      </h1>

      {/* Stats card */}
      <div className="bg-white rounded-3xl shadow-sm flex p-8 items-stretch max-w-4xl mb-10">
        {/* Total tours circle */}
        <div className="flex flex-col items-center justify-center border-r pr-10">
          <p className="uppercase text-xs tracking-wide text-gray-400 mb-3">
            total tours
          </p>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
            <span className="text-3xl font-semibold text-indigo-600">
              {mockStats.totalTours}
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-1 gap-4 pl-10">
          <div className="flex-1 border rounded-2xl px-5 py-4 flex flex-col justify-center">
            <span className="text-2xl font-semibold text-indigo-600">
              {mockStats.completionRate}%
            </span>
            <span className="text-xs text-gray-500 mt-1">Completion rates</span>
          </div>

          <div className="flex-1 border rounded-2xl px-5 py-4 flex flex-col justify-center">
            <span className="text-2xl font-semibold text-indigo-600">
              {mockStats.totalViews}
            </span>
            <span className="text-xs text-gray-500 mt-1">Total views</span>
          </div>

          <div className="flex-1 border rounded-2xl px-5 py-4 flex flex-col justify-center">
            <span className="text-2xl font-semibold text-indigo-600">
              {mockStats.activeUsers}
            </span>
            <span className="text-xs text-gray-500 mt-1">Active users</span>
          </div>
        </div>
      </div>

      {/* Top tours */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🏆</span>
          <h2 className="text-lg font-semibold text-indigo-700">
            Top Performing Tours
          </h2>
        </div>

        <div className="space-y-4 max-w-xl">
          {mockTopTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-sm px-6 py-4 border"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {tour.views} views ({tour.completion}% completion)
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
