export interface IAuthRepository {
    login(UserNameOrEmail: string, Password: string): Promise<{ accessToken: string }>;
    logout(): Promise<void>;
    register(name: string, email: string, password: string): Promise<{ accessToken: string }>;
}