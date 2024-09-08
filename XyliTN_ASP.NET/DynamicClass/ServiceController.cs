using Microsoft.AspNetCore.Mvc;
using XyliTN_ASP.NET.StaticClass;
namespace XyliTN_ASP.NET.DynamicClass
{
    [ApiController]
    [Route("api/service")]//代表网址：域名/api/service/*，用作修饰，和类名无关
    public class ServiceController : ControllerBase
    {
        [HttpPost("login")]//表示把*替换为login，也就是访问域名/api/service/login，用作修饰，和方法名称无关
        public async Task<IActionResult> Login([FromBody] User user)
        {
            try
            {
                var res = await UserData.UserDataInstance.JudgeUserAsync(user.Username, user.Password);
                if (res == UserData.LoginResult.Success)
                {
                    return Ok(new { success = true,message = "登陆成功" });
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
                LogManager.LogWrite("登录请求错误", ex.ToString());
                return StatusCode(500, new { success = false, message = "服务器内部错误" });
            }
        }


        [HttpPost("register")]//访问域名/api/service/register
        public async  Task<IActionResult> Register([FromBody] User request)
        {
            try
            {
                var result = await UserData.UserDataInstance.JudgeUserAsync(request.Username, request.Password);
                if (result == UserData.LoginResult.NoUser)
                {
                    await UserData.UserDataInstance.InsertUserAsync(request.Username, request.Password);
                    return Ok(new { success = true,message = "注册成功" });
                }
                else
                {
                    return Ok(new { success = false, message = "用户名已存在" });
                }
            }
            catch (Exception ex)
            {
                LogManager.LogWrite("注册请求错误", ex.ToString());
                return StatusCode(500, new { success = false, message = "服务器内部错误" });
            }
        }

        



    }
}
