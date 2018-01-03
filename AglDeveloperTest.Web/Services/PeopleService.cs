using System.Collections.Generic;
using System.Threading.Tasks;
using AglDeveloperTest.Web.Models;

namespace AglDeveloperTest.Web.Services
{
    public class PeopleService : IPeopleService
    {
        private readonly IHttpClient httpClient;

        public PeopleService(IHttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<IEnumerable<Person>> GetPeople()
        {
            return await httpClient.GetAsync<IEnumerable<Person>>("people.json");
        }
    }
}
