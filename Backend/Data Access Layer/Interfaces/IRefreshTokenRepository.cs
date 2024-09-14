namespace Data_Access_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> GetRefreshTokenByTokenHashAsync(string tokenHash);

        Task AddRefreshTokenAsync(RefreshToken refreshToken);

        Task RevokeRefreshTokenAsync(RefreshToken refreshToken);

        Task SaveChangesAsync();
    }
}
