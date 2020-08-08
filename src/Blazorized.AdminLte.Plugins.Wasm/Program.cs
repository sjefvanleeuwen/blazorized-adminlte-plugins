using System;
using System.Net.Http;
using System.Threading.Tasks;
using Blazor.AdminLte;
using Blazorise;
using Blazorise.Bootstrap;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Blazorized.AdminLte.Plugins.Wasm
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");

            builder.Services.AddTransient(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddAdminLte();
            builder.Services.AddBlazorise();
            builder.Services.AddBootstrapProviders();
            await builder.Build().RunAsync();
        }
    }
}
