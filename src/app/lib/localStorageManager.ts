export namespace LocalStorageManager {
  const JWT_KEY = 'token';

  export function getJWT(): string | null {
    return localStorage.getItem(JWT_KEY);
  }

  export function setJWT(token: string): void {
    return localStorage.setItem(JWT_KEY, token);
  }

  export function removeJWT(): void {
    return localStorage.removeItem(JWT_KEY);
  }
}
