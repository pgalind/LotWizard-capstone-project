export default function SubmitButton({ isSubmitting = false }) {
  return (
    <button
      className="mt-5 bg-slate-200 py-3 px-6 rounded-lg hover:bg-green-400"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}
