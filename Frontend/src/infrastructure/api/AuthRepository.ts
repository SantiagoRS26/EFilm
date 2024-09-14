import { IAuthRepository } from '@/adapters/repositories/IAuthRepository';
import { httpClient } from '@/infrastructure/http/HttpClient';

export class AuthRepository implements IAuthRepository {
  async login(UserNameOrEmail: string, Password: string): Promise<{ accessToken: string }> {
    const data = await httpClient.post<{ accessToken: string }>('/Auth/login', { UserNameOrEmail, Password });
    return data;
  }

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout', {});
  }
}