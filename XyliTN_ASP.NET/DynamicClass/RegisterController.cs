namespace XyliTN_ASP.NET.DynamicClass
{
    using Microsoft.AspNetCore.Mvc;
    using XyliTN_ASP.NET.StaticClass;

    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register([FromBody] User request)
        {
            try
            {
                var result = UserData.UserDataInstance.JudgeUser(request.Username, request.Password);
                if (result == UserData.LoginResult.NoUser)
                {
                    UserData.UserDataInstance.InsertUser(request.Username, request.Password);
                    return Ok(new { success = true });
                }
                else
                {
                    return Ok(new { success = false, message = "用户名已存在。" });
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
