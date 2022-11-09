export default function FetchButton({ isFetching = false }) {
    return (
      <button
        className="mt-5 bg-slate-200 py-3 px-6 rounded-lg hover:bg-green-400"
        type="submit"
        disabled={isFetching}
      >
        {isFetching ? 'Fetching...' : 'Fetch'}
      </button>
    );
  }
  