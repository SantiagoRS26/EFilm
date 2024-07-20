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

    public class GenderRepository : IGenericRepository<Gender>
    {
        private readonly DataContext context;

        public GenderRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Gender> CreateAsync(Gender newGender)
        {
            try
            {
                await this.context.AddAsync(newGender);
                await this.context.SaveChangesAsync();

                return newGender;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error saving gender to database", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Gender? genderToDelete = await this.context.Genders.FindAsync(id);
                this.context.Remove(genderToDelete);
                await this.context.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error deleting gender from database", ex);
            }
        }

        public Task<IQueryable<Gender>> GetAll()
        {
            try
            {
                IQueryable<Gender> genders = this.context.Genders;
                return Task.FromResult(genders);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving genders from database", ex);
            }
        }

        public async Task<Gender> GetByIdAsync(string id)
        {
            try
            {
                Gender? gender = await this.context.Genders.FindAsync(id);
                return gender;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching gender from database", ex);
            }
        }

        public async Task<Gender> UpdateAsync(Gender genderUpdated)
        {
            try
            {
                this.context.Update(genderUpdated);
                await this.context.SaveChangesAsync();
                return genderUpdated;
            }
            catch (Exception ex)
            {
                throw new Exception("Unexpected error occurred while updating gender", ex);
            }
        }
    }
}
