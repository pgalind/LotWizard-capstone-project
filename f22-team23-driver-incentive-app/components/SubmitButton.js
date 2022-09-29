export default function SubmitButton({ isSubmitting = false }) {
  return (
    <button className="mt-10" type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting' : 'Submit'}
    </button>
  );
}
