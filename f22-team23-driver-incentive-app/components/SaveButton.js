export default function SubmitButton({ isSaving = false }) {
  return (
    <button
      className="mt-5 bg-slate-200 py-3 px-6 rounded-lg hover:bg-slate-200"
      type="submit"
      disabled={isSaving}
    >
      {isSaving ? 'Saving...' : 'Save'}
    </button>
  );
}
