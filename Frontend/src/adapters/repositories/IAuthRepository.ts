export interface IAuthRepository {
    login(UserNameOrEmail: string, Password: string): Promise<void>;
    logout(): Promise<void>;
    register(name: string, email: string, password: string): Promise<void>;
    checkAuth(): Promise<boolean>;
}