using Microsoft.AspNetCore.Mvc;
using XyliTN_ASP.NET.StaticClass;
namespace XyliTN_ASP.NET.DynamicClass
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var res = UserData.JudgeUser(user.Username, user.Password);
            if (res == UserData.LoginResult.Success)
            {
                return Ok(new { success = true });
            }
            if (res == UserData.LoginResult.PasswordError)
            {
                return Unauthorized(new { success = false, message = "密码错误" });
            }
            else 
            {
                return Unauthorized(new { success = false, message = "没有该用户" });
            }
        }
    }
}
