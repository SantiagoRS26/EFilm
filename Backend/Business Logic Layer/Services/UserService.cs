namespace Business_Logic_Layer.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Business_Logic_Layer.Interfaces;
    using Data_Access_Layer.Interfaces;
    using Models;

    public class UserService : IUserService
    {
        private readonly IGenericRepository<ApplicationUser> userRepository;

        public UserService(IGenericRepository<ApplicationUser> userRepository)
        {
            this.userRepository = userRepository;
        }

        public Task<ApplicationUser> CreateUserAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> GetUserByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> UpdateUserAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }
    }
}
