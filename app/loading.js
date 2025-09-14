export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-secondary"></span>
      <p className="mt-4 text-primary font-semibold">Loading, please wait...</p>
    </div>
  );
}
