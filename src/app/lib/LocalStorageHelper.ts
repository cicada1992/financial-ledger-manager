export namespace LocalStorageHelper {
  const JWT_KEY = 'token';

  export function getJWT(): string | null {
    if (isSSR()) return null;
    return localStorage.getItem(JWT_KEY);
  }

  export function setJWT(token: string): void {
    if (isSSR()) return;
    return localStorage.setItem(JWT_KEY, token);
  }

  export function removeJWT(): void {
    if (isSSR()) return;
    return localStorage.removeItem(JWT_KEY);
  }

  function isSSR(): boolean {
    return typeof window === 'undefined';
  }
}
