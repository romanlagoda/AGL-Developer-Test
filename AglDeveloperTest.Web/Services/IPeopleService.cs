using AglDeveloperTest.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AglDeveloperTest.Web.Services
{
    public interface IPeopleService
    {
        Task<IEnumerable<Person>> GetPeople();
    }
}
