// asfales-web-frontend/lib/services/authService.ts
import { signInWithEmailAndPassword, sendPasswordResetEmail,
    GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup
 } from "firebase/auth";
import { auth } from "../firebase";
import { AuthUser } from "@/types/User";

export async function loginUser(email: string, password: string): Promise<{ token: string; user: AuthUser }> {
  // Iniciar sesión con Firebase
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  // Obtener token
  const idToken = await userCred.user.getIdToken();

  // Obtener perfil del backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  if (!res.ok) {
    throw new Error("Error al obtener perfil de usuario");
  }

  const profile: AuthUser = await res.json();
  return { token: idToken, user: profile };
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<void> {
  const photoURLGenerated = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: "",
      photoURL: photoURLGenerated,
      disabled: false,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al registrarse");
  }
}

export const resetPassword = async (email: string) => {
  try {
    console.log("Enviando correo de restablecimiento a:", email);
    await sendPasswordResetEmail(auth, email, {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`, // URL a la que será redirigido el usuario después de resetear
      handleCodeInApp: false, // true si quieres manejar el link dentro de la app
    });
    return { success: true, message: "Correo de restablecimiento enviado." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};  

export async function loginWithGoogle(): Promise<AuthUser> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return {
    id: result.user.uid,
    email: result.user.email!,
    name: result.user.displayName!,
    avatar: result.user.photoURL || "",
    firebaseUid: result.user.uid,
    createdAt: result.user.metadata.creationTime || "",
    phoneNumber:result.user.phoneNumber
  };
}

export async function loginWithFacebook(): Promise<AuthUser> {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return {
    id: result.user.uid,
    email: result.user.email!,
    name: result.user.displayName!,
    avatar: result.user.photoURL || "",
    firebaseUid: result.user.uid,
    createdAt: result.user.metadata.creationTime || "",
    phoneNumber:result.user.phoneNumber

  };
}

export async function loginWithApple(): Promise<AuthUser> {
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");
  const result = await signInWithPopup(auth, provider);
  return {
    id: result.user.uid,
    email: result.user.email!,
    name: result.user.displayName!,
    avatar: result.user.photoURL || "",
    firebaseUid: result.user.uid,
    createdAt: result.user.metadata.creationTime || "",
        phoneNumber:result.user.phoneNumber

  };
}