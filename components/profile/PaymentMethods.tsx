import { ShowIfAuth } from "../ShowIfAuth";

export default function PaymentMethods() {
  return (
    <ShowIfAuth>
    <div className="bg-white rounded-lg lg:border p-6">
      <h2 className="text-xl font-semibold text-secondary mb-4 hidden lg:block">Métodos de pago</h2>
      <p className="text-muted-foreground">Contenido de métodos de pago</p>
    </div>
    </ShowIfAuth>
  );
}
