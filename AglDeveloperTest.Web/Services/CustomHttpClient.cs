using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AglDeveloperTest.Web
{
    public class CustomHttpClient : IHttpClient
    {
        private HttpClient httpClient;

        public CustomHttpClient()
        {
            httpClient = new HttpClient
            {
                BaseAddress = new Uri("http://agl-developer-test.azurewebsites.net")
            };
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<T> GetAsync<T>(string path)
        {
            HttpResponseMessage response = await httpClient.GetAsync(path);
            using (var stream = await response.Content.ReadAsStreamAsync())
            using (var streamReader = new StreamReader(stream))
            using (var jsonTextReader = new JsonTextReader(streamReader))
            {
                JsonSerializer serializer = new JsonSerializer();
                return serializer.Deserialize<T>(jsonTextReader);
            }
        }
    }
}
