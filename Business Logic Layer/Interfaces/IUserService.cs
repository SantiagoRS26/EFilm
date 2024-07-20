namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface IUserService
    {
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();

        Task<ApplicationUser> CreateUserAsync(ApplicationUser user);

        Task<ApplicationUser> GetUserByIdAsync(int id);

        Task<ApplicationUser> GetUserByEmailAsync(string email);

        Task<ApplicationUser> UpdateUserAsync(ApplicationUser user);

        Task<ApplicationUser> DeleteUserAsync(int id);
    }
}
