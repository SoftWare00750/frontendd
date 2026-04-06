// user.ts — OgaLandlord local user store
// Supports multiple registered users; enforces global email + phone uniqueness.

export type UserRole = "agent" | "tenant_landlord";

export interface User {
  fullName: string;
  phoneNumber: string;
  email?: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const USERS_KEY    = "ogalandlord_users";      // all registered users (array)
const SESSION_KEY  = "ogalandlord_session";    // currently logged-in user

// ─── Users array helpers ──────────────────────────────────────────────────────

/** Return the full list of registered users */
export function getAllUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

/** Persist the full list of users */
function saveAllUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Uniqueness check ─────────────────────────────────────────────────────────

/**
 * Returns true if the email OR phone is already taken by ANY user
 * (regardless of role).  Pass the id of an existing user to exclude
 * them from the check during an update (not used on signup).
 */
export function isAlreadyRegistered(
  phoneNumber: string,
  email?: string
): { taken: boolean; field?: "phone" | "email" } {
  const phone = phoneNumber.replace(/\s/g, "");
  const users = getAllUsers();

  for (const u of users) {
    if (u.phoneNumber === phone) {
      return { taken: true, field: "phone" };
    }
    if (email && email.trim() && u.email && u.email.toLowerCase() === email.trim().toLowerCase()) {
      return { taken: true, field: "email" };
    }
  }
  return { taken: false };
}

// ─── Register new user ────────────────────────────────────────────────────────

/**
 * Add a new user to the store.
 * Throws if phone or email already exists.
 */
export function registerUser(user: User): void {
  const check = isAlreadyRegistered(user.phoneNumber, user.email);
  if (check.taken) {
    throw new Error(
      check.field === "phone"
        ? "This phone number is already registered."
        : "This email address is already registered."
    );
  }
  const users = getAllUsers();
  const normalised: User = {
    ...user,
    phoneNumber: user.phoneNumber.replace(/\s/g, ""),
    email: user.email?.trim() || undefined,
  };
  users.push(normalised);
  saveAllUsers(users);
}

// ─── Session helpers ──────────────────────────────────────────────────────────

/** Persist the logged-in user to session */
export function saveSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

/** Retrieve the current session user (null if not logged in) */
export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/** Clear the current session (logout) */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Attempt login using phone-or-email + password.
 * Returns the User on success, null on failure.
 */
export function loginUser(identifier: string, password: string): User | null {
  const id = identifier.trim().replace(/\s/g, "");
  const users = getAllUsers();

  const user = users.find(
    (u) =>
      (u.phoneNumber === id || (u.email && u.email.toLowerCase() === id.toLowerCase())) &&
      u.password === password
  );

  if (user) {
    saveSession(user);
    return user;
  }
  return null;
}

// ─── Legacy compat (keep old single-user helpers working if anything imports them) ──

/** @deprecated use registerUser() */
export function saveUser(user: User): void {
  registerUser(user);
}

/** @deprecated use getSession() */
export function getUser(): User | null {
  return getSession();
}

/** @deprecated use clearSession() */
export function clearUser(): void {
  clearSession();
}