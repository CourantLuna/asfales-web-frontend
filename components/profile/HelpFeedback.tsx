import { ShowIfAuth } from "../ShowIfAuth";

export default function HelpFeedback() {
  return (
        <ShowIfAuth>
    
    <div className="bg-white rounded-lg lg:border p-6">
      <h2 className="text-xl font-semibold text-secondary mb-4 hidden lg:block">Ayuda y comentarios</h2>
      <p className="text-muted-foreground">Contenido de ayuda y comentarios</p>
    </div>
        </ShowIfAuth>
  );
}
