namespace Data_Access_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IGenericRepository<TEntityModel>
        where TEntityModel : class
    {
        Task<IQueryable<TEntityModel>> GetAll();

        Task<TEntityModel> GetByIdAsync(string id);

        Task<TEntityModel> CreateAsync(TEntityModel entity);

        Task<TEntityModel> UpdateAsync(TEntityModel entity);

        Task<bool> DeleteAsync(int id);
    }
}
