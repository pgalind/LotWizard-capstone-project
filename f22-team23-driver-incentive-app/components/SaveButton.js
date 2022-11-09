export default function SaveButton({ isSaving = false }) {
  return (
    <button
      className="mt-5 bg-slate-200 py-3 px-6 rounded-lg hover:text-white hover:bg-green-400"
      type="submit"
      disabled={isSaving}
    >
      {isSaving ? 'Saving...' : 'Save'}
    </button>
  );
}
