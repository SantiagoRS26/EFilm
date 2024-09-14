namespace Data_Access_Layer.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Data_Access_Layer.Context;
    using Data_Access_Layer.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DataContext context;

        public RefreshTokenRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<RefreshToken> GetRefreshTokenByTokenHashAsync(string tokenHash)
        {
            return await this.context.RefreshTokens.Include(rt => rt.User).FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash);
        }

        public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
        {
            await this.context.RefreshTokens.AddAsync(refreshToken);
        }

        public async Task RevokeRefreshTokenAsync(RefreshToken refreshToken)
        {
            refreshToken.Revoked = DateTime.UtcNow;
            this.context.RefreshTokens.Update(refreshToken);
        }

        public async Task SaveChangesAsync()
        {
            await this.context.SaveChangesAsync();
        }
    }
}
