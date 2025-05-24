export default function MemberForm({ agreed, setAgreed, onCancel, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-blue-900">Become a Member!</h2>
      <p className="text-gray-700 text-center">
        Enjoy exclusive chat features, connect deeply, and be part of our supportive community.
      </p>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
          required
        />
        <span className="text-gray-700 text-sm">
          I agree to the{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            terms and conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!agreed}
        className={`w-full py-2 rounded text-white transition ${
          agreed ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Join
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full py-2 rounded border border-blue-700 text-blue-700 hover:bg-blue-100 transition"
      >
        Cancel
      </button>
    </form>
  );
}
