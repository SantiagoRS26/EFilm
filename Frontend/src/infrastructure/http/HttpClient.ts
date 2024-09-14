import { HttpError } from "@/shared/utils/HttpError";

export class HttpClient {
    async get<T>(url: string, accessToken?: string): Promise<T> {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          credentials: 'include', // Para enviar cookies si es necesario
        });
  
        if (!response.ok) {
          throw new HttpError(`Error en la solicitud GET: ${response.statusText}`, response.status);
        }
  
        return (await response.json()) as T;
      } catch (error) {
        console.error('Error en GET:', error);
        throw error;
      }
    }
  
    async post<T>(url: string, body: any, accessToken?: string): Promise<T> {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify(body),
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new HttpError(`Error en la solicitud POST: ${response.statusText}`, response.status);
        }
  
        return (await response.json()) as T;
      } catch (error) {
        console.error('Error en POST:', error);
        throw error;
      }
    }
  }
  
  export const httpClient = new HttpClient();
  