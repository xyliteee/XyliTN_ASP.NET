namespace XyliTN_ASP.NET.DynamicClass
{
    using Microsoft.AspNetCore.Mvc;
    using static XyliTN_ASP.NET.StaticClass.UserData;

    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register([FromBody] User request)
        {
            var result = JudgeUser(request.Username, request.Password);
            if (result == LoginResult.NoUser)
            {
                InsertUser(request.Username, request.Password);
                return Ok(new { success = true });
            }
            else
            {
                return BadRequest(new { success = false, message = "用户名已存在。" });
            }
        }
    }
}
