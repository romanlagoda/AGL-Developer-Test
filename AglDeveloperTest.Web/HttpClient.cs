using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace AglDeveloperTest.Web
{
    public class HttpClient : System.Net.Http.HttpClient, IHttpClient
    {
        private static HttpClient client = new HttpClient();

        public async Task<T> GetAsync<T>(string path)
        {
            T result = default(T);
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("http://agl-developer-test.azurewebsites.net/" + path);
            if (response.IsSuccessStatusCode)
            {
                var responseContentString = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<T>(responseContentString);
            }
            return result;
        }
    }
}
