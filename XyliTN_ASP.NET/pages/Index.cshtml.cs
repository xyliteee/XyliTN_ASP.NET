using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics;

namespace XyliTN_ASP.NET.pages
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
            
        }
        public JsonResult OnGetUserAgent()//避免好事者反复切换标识，直接写进方法内
        {
            var ua = Request.Headers.UserAgent.ToString();
            bool isPC = ua.Contains("Windows");
            return new JsonResult(new { isPC });
        }
    }   

}
