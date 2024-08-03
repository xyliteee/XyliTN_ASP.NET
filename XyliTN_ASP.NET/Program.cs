using Microsoft.AspNetCore.Hosting;
using System.Diagnostics;
using XyliTN_ASP.NET.StaticClass;

namespace XyliTN_ASP.NET
{
    public class MainClass
    {
        public static void DataInit() 
        {
            UserData.CreateDatabase();
            UserData.InsertUser("xyliteee", "xylitol1128");

        }
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddRazorPages();
            builder.Services.AddControllers();
            var app = builder.Build();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.MapRazorPages();
            app.MapControllers();
            app.Run();

        }

    }
}
