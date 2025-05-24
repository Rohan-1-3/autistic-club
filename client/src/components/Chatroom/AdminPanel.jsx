export default function AdminPanel({ adminMode, setAdminMode }) {
  return (
    <div className="bg-purple-200 text-purple-900 p-4 rounded-lg shadow-md flex justify-between items-center">
      <p className="font-semibold">It seems you are an admin.</p>
      <button
        onClick={() => setAdminMode((prev) => !prev)}
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded transition"
      >
        {adminMode ? 'Deactivate Admin Mode' : 'Activate Admin Mode'}
      </button>
    </div>
  );
}
