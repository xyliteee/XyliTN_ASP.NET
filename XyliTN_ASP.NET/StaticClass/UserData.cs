using Microsoft.Data.Sqlite;
using SQLitePCL;

namespace XyliTN_ASP.NET.StaticClass
{
    public static class UserData
    {
        
        private const string connectionString = "Data Source=E://MixFiles//userdata.db";
        public static void CreateDatabase()
        {
            Batteries.Init();
            using SqliteConnection connection = new(connectionString);
            connection.Open();

            string createTableCommand = @"
                    CREATE TABLE IF NOT EXISTS Users (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Username TEXT NOT NULL,
                        Password TEXT NOT NULL
                    );";

            using SqliteCommand command = new(createTableCommand, connection);
            command.ExecuteNonQuery();
        }
        public static void InsertUser(string username, string password)
        {
            
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            string insertCommand = @"
            INSERT INTO Users (Username, Password)
            VALUES (@Username, @Password);";
            using var command = new SqliteCommand(insertCommand, connection);
            command.Parameters.AddWithValue("@Username", username);
            command.Parameters.AddWithValue("@Password", password);
            command.ExecuteNonQuery();
        }

        public static LoginResult JudgeUser(string username, string password)
        {
            
            using var connection = new SqliteConnection(connectionString);
            connection.Open();
            string queryCommand = @"
            SELECT Password FROM Users
            WHERE Username = @Username;";
            using var command = new SqliteCommand(queryCommand, connection);
            command.Parameters.AddWithValue("@Username", username);
            using var reader = command.ExecuteReader();
            if (reader.Read())
            {
                string storedPassword = reader.GetString(0);
                if (storedPassword == password)
                {
                    return LoginResult.Success;
                }
                else
                {
                    return LoginResult.PasswordError;
                }
            }
            else
            {
                return LoginResult.NoUser;
            }
        }

        public enum LoginResult 
        {
            Success,
            PasswordError,
            NoUser
        }
    }
}
