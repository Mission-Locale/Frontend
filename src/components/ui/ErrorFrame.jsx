export default function ErrorFrame({ error }) {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-red-600">Une erreur a eu lieu !</h2>
        <h3>{error.name}</h3>
        <p>{error.message}</p>
        <p>{error.stack}</p>
      </div>
    </div>
  );
}
