using System.Threading.Tasks;

namespace AglDeveloperTest.Web
{
    public interface IHttpClient
    {
        Task<T> GetAsync<T>(string path);
    }
}
