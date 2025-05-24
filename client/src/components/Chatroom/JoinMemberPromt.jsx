export default function JoinMemberPrompt({ onJoinClick }) {
  return (
    <div className="bg-blue-200 text-blue-900 p-4 rounded-lg shadow-md flex flex-col items-center space-y-4">
      <p className="font-semibold text-center">
        Join in the mega fun. Chat with autistic people all around the globe. Share and grow your autism.
      </p>
      <button
        onClick={onJoinClick}
        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded transition"
      >
        Join in
      </button>
    </div>
  );
}
