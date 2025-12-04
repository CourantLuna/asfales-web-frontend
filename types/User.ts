export interface AuthUser {
  id: number;
  name: string;
  email: string;
  firebaseUid: string;
  createdAt: string;
  avatar?: string; // URL del avatar, opcional
}
  