import { AuthGuard } from "../auth/AuthGuard";
import { ShowIfAuth } from "../ShowIfAuth";

export default function Coupons() {
  return (
        <AuthGuard parentPath="/profile">

    <ShowIfAuth>
      <div className="bg-white rounded-lg lg:border p-6">
      <h2 className="text-xl font-semibold text-secondary mb-4 hidden lg:block">Cupones</h2>
      <p className="text-muted-foreground">Contenido de cupones</p>
    </div>
    </ShowIfAuth>
        </AuthGuard>
  );
}
