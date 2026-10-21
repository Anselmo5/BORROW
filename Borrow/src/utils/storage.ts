const TOKEN_KEY = "borrow_token";
const USER_KEY = "borrow_user";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveUser(user: { id: number; name: string; email: string }) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as { id: number; name: string; email: string };
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}