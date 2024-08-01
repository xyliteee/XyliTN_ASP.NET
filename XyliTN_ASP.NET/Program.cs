using Microsoft.AspNetCore.Hosting;

namespace XyliTN_ASP.NET
{
    public class MainClass
    {
        public static WebApplication? WebApplication { get; set; }
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddRazorPages();
            WebApplication = builder.Build();
            WebApplication.UseHttpsRedirection();
            WebApplication.UseStaticFiles();
            WebApplication.UseRouting();
            WebApplication.UseAuthorization();
            WebApplication.MapRazorPages();
            WebApplication.Run();
        }
    }
}
