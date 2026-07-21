export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  role_id: number;
  role: Role;
}