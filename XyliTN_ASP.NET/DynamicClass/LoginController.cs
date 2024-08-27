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
            try
            {
                var res = UserData.UserDataInstance.JudgeUser(user.Username, user.Password);
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
            catch (Exception ex)
            {
                LogManager.LogWrite("登录请求错误",ex.ToString());
                return StatusCode(500, new { success = false, message = "服务器内部错误" });
            }
        }
    }
}
