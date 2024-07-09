﻿namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();

        Task<User> CreateUserAsync(User user);

        Task<User> GetUserByIdAsync(int id);

        Task<User> GetUserByEmailAsync(string email);

        Task<User> UpdateUserAsync(User user);

        Task<User> DeleteUserAsync(int id);
    }
}
