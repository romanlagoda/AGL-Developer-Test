using System.Collections.Generic;
using System.Threading.Tasks;
using AglDeveloperTest.Web.Models;
using AglDeveloperTest.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace AglDeveloperTest.Web.Controllers
{
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        private readonly IPeopleService peopleService;

        public PeopleController(IPeopleService peopleService)
        {
            this.peopleService = peopleService;
        }

        [HttpGet]
        public async Task<IEnumerable<Person>> Get()
        {
            return await peopleService.GetPeople();
        }
    }
}
