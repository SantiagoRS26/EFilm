import { IAuthRepository } from '@/adapters/repositories/IAuthRepository';
import { httpClient } from '@/infrastructure/http/HttpClient';

export class AuthRepository implements IAuthRepository {
  async login(UserNameOrEmail: string, Password: string): Promise<void> {
    await httpClient.post('/Auth/login', { UserNameOrEmail, Password });
  }

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout', {});
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await httpClient.post('/Auth/register', { name, email, password });
  }

  async checkAuth(): Promise<boolean> {
    try {
      await httpClient.get('/auth/check');
      return true;
    } catch {
      return false;
    }
  }
}