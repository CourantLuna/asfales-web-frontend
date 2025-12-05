import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      data = { message: 'Error inesperado del backend' };
    }

    if (!res.ok) {
      // Pasamos el mensaje del backend al frontend
      return NextResponse.json(
        { message: data.message || data.error || 'Error al registrar usuario' },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error inesperado' },
      { status: 500 }
    );
  }
}


