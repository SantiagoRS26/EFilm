namespace Data_Access_Layer.Services
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

    public class UserRepository : IGenericRepository<User>
    {
        private readonly DataContext context;

        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<User> CreateAsync(User newUser)
        {
            try
            {
                await this.context.AddAsync(newUser);
                await this.context.SaveChangesAsync();

                return newUser;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error saving user to database" + ex.Message);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                User? userToDelete = await this.context.Users.FindAsync(id);
                this.context.Remove(userToDelete);
                await this.context.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateException ex)
            {

                throw new Exception("Error deleting user to database" + ex.Message);
            }
        }

        public Task<IQueryable<User>> GetAll()
        {
            try
            {
                IQueryable<User> users = this.context.Users;
                return Task.FromResult(users);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving users from database: " + ex.Message);
            }
        }

        public async Task<User> GetByIdAsync(int id)
        {
            try
            {
                User? user = await this.context.Users.FindAsync(id);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching user from database", ex);
            }
        }

        public async Task<User> UpdateAsync(User userUpdated)
        {
            try
            {
                this.context.Update(userUpdated);
                await this.context.SaveChangesAsync();
                return userUpdated;
            }
            catch (Exception ex)
            {
                throw new Exception("Unexpected error occurred while updating user", ex);
            }
        }
    }
}
