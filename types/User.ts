export interface AuthUser {
  id: any;
  name: string;
  email: string;
  firebaseUid: string;
  createdAt: string;
  avatar?: string; // URL del avatar, opcional
  phoneNumber?: any;
}
  