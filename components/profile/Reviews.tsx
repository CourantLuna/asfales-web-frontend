import { ShowIfAuth } from "../ShowIfAuth";

export default function Reviews() {
  return (
    <ShowIfAuth>
    <div className="bg-white rounded-lg lg:border p-6">
      <h2 className="mb-4 text-xl font-semibold text-secondary hidden lg:block">Reseñas</h2>
      <p className="text-muted-foreground">Contenido de reseñas</p>
    </div>
    </ShowIfAuth>
  );
}
