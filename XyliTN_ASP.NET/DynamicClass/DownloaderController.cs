using Microsoft.AspNetCore.Mvc;

namespace XyliTN_ASP.NET.DynamicClass
{
    [ApiController]
    [Route("api/download")]
    public class DownloaderController : ControllerBase
    {
        [HttpGet("randomPicture")]
        public IActionResult DownloadRandomPicture()
        {
            Random rnd = new();
            int randomNumber = rnd.Next(1, 6);
            var filePath = $"D:\\ProgramFiles\\内网穿透\\Pictures\\{randomNumber}.jpg";
            var fileName = "RandomPicture.jpg";
            var mimeType = "application/octet-stream";
            return PhysicalFile(filePath, mimeType, fileName);
        }

    }
}
