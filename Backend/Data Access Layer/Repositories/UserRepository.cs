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

    public class UserRepository : IGenericRepository<ApplicationUser>
    {
        private readonly DataContext context;

        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<ApplicationUser> CreateAsync(ApplicationUser newUser)
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
                ApplicationUser? userToDelete = await this.context.Users.FindAsync(id);
                this.context.Remove(userToDelete);
                await this.context.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateException ex)
            {

                throw new Exception("Error deleting user to database" + ex.Message);
            }
        }

        public Task<IQueryable<ApplicationUser>> GetAll()
        {
            try
            {
                IQueryable<ApplicationUser> users = this.context.Users;
                return Task.FromResult(users);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving users from database: " + ex.Message);
            }
        }

        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            try
            {
                ApplicationUser? user = await this.context.Users.FindAsync(id);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching user from database", ex);
            }
        }

        public async Task<ApplicationUser> UpdateAsync(ApplicationUser userUpdated)
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
