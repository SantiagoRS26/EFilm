export interface IAuthRepository {
    login(UserNameOrEmail: string, Password: string): Promise<{ accessToken: string }>;
    logout(): Promise<void>;
}