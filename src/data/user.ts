// user.ts — OgaLandlord local user store

export type UserRole = "agent" | "tenant_landlord";

export interface User {
  fullName: string;
  phoneNumber: string;
  email?: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

const USER_KEY = "ogalandlord_user";

/** Persist user to localStorage */
export function saveUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** Retrieve saved user (null if none) */
export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/** Remove user session */
export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

/**
 * Attempt login — matches phoneNumber + password.
 * Returns the User on success, null on failure.
 */
export function loginUser(phoneNumber: string, password: string): User | null {
  const user = getUser();
  if (
    user &&
    user.phoneNumber === phoneNumber.replace(/\s/g, "") &&
    user.password === password
  ) {
    return user;
  }
  return null;
}