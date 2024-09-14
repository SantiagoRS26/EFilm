using Business_Logic_Layer.Interfaces;
using Data_Access_Layer.Interfaces;
using Data_Access_Layer.Repositories;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.Services
{
    public class GenderService : IGenderService
    {
        private readonly IGenderRepository genderRepository;

        public GenderService(IGenderRepository genderRepository)
        {
            this.genderRepository = genderRepository;
        }

        public async Task<Gender?> GetGenderByNameAsync(string name)
        {
            return await this.genderRepository.GetByNameAsync(name);
        }
    }
}
