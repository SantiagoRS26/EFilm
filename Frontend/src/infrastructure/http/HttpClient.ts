import { HttpError } from "@/shared/utils/HttpError";

// Define un tipo para la función de logout
type LogoutCallback = () => void;

export class HttpClient {
  private logoutCallback: LogoutCallback | null = null;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  // Método para establecer la función de logout
  setLogoutCallback(callback: LogoutCallback) {
    this.logoutCallback = callback;
  }

  // Método para renovar el token
  private async refreshToken(): Promise<boolean> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Enviar cookies
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error durante la renovación del token:', error);
      return false;
    }
  }

  // Método genérico para realizar peticiones
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let response = await fetch(`${apiUrl}${url}`, {
        ...options,
        credentials: 'include', // Enviar cookies
      });

      // Si la respuesta es 401, intentar renovar el token
      if (response.status === 401) {
        const refreshed = await this.handle401();

        if (refreshed) {
          // Reintentar la petición original después de renovar el token
          response = await fetch(`${apiUrl}${url}`, {
            ...options,
            credentials: 'include',
          });

          if (response.ok) {
            return (await response.json()) as T;
          }
        }

        // Si no se pudo renovar el token, lanzar un error
        throw new HttpError('No autorizado', 401);
      }

      if (!response.ok) {
        throw new HttpError(`Error en la solicitud: ${response.statusText}`, response.status);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

  // Maneja la renovación del token
  private async handle401(): Promise<boolean> {
    if (this.isRefreshing) {
      if (this.refreshPromise) {
        return await this.refreshPromise;
      }
      return false;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.refreshToken();

    const refreshed = await this.refreshPromise;
    this.isRefreshing = false;
    this.refreshPromise = null;

    if (!refreshed && this.logoutCallback) {
      this.logoutCallback();
    }

    return refreshed;
  }

  // Métodos HTTP específicos
  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}

export const httpClient = new HttpClient();