using System.Text.Json;

namespace XyliTN_ASP.NET.StaticClass
{
    public static class LogManager
    {
        
        private static string logPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs");
        static LogManager()
        {
            Directory.CreateDirectory(logPath);
        }
        private readonly static JsonSerializerOptions jsonSerializerOptions = new()
        {
            WriteIndented = true,
            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };
        public async static Task LogWriteAsync(string title, string message, string suggestion = "None")
        {
            string time = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            string fileName = time + ".log";
            var log = new { Title = title, Message = message, Time = time, Suggestion = suggestion };
            string json = JsonSerializer.Serialize(log, jsonSerializerOptions);
            string filePath = Path.Combine(logPath, fileName);
            await File.WriteAllTextAsync(filePath, json);
        }
        public static void LogWrite(string title, string message, string suggestion = "None")
        {
            string time = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            string fileName = time + ".log";
            var log = new { Title = title, Message = message, Time = time, Suggestion = suggestion };
            string json = JsonSerializer.Serialize(log, jsonSerializerOptions);
            string filePath = Path.Combine(logPath, fileName);
            File.WriteAllText(filePath, json);
        }
    }
}
