import { ShowIfAuth } from "../ShowIfAuth";

export default function SecuritySettings() {
  return (
    <ShowIfAuth>
    <div className="bg-white rounded-lg lg:border p-6">
      <h2 className="text-xl font-semibold text-secondary hidden lg:block mb-4">Seguridad y configuración</h2>
      <p className="text-muted-foreground">Contenido de seguridad y configuración</p>
    </div>
    </ShowIfAuth>
  );
}
