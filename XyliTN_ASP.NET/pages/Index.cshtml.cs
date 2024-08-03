using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics;

namespace XyliTN_ASP.NET.pages
{
    public static class Data
    {
        public static bool IsPC { get; set; }
    }
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
            var ua = Request.Headers.UserAgent.ToString();
            Data.IsPC = ua.Contains("Windows");
        }
        public JsonResult OnGetUserAgent()
        {
            return new JsonResult(new { Data.IsPC });
        }
    }   

}
