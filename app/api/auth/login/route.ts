import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { message: "Token no enviado" },
        { status: 400 }
      );
    }

    // Llamada al backend real: /users/me
    const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
    throw new Error(data.message || "Error al registrarse");
  }

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("API /api/auth/login Error:", error);
    return NextResponse.json(
      { message: "Error interno en login" },
      { status: 500 }
    );
  }
}
