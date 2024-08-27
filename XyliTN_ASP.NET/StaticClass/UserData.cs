using MySql.Data.MySqlClient;

namespace XyliTN_ASP.NET.StaticClass
{
    public class UserData
    {
        private readonly MySqlConnection connection;
        private static readonly UserData _userDataInstance = new();
        public static UserData UserDataInstance
        {
            get => _userDataInstance;
        }
        private UserData()
        {
            string passwordFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "MySQLPassWord.txt");
            string password = File.ReadAllText(passwordFilePath).Trim();
            string connectionString = $"server=localhost;database=userdata;uid=root;pwd={password};";
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }
        public void InsertUser(string username, string password)
        {
            string table = "basedata";
            string countQuery = $"SELECT COUNT(*) FROM {table}";
            MySqlCommand countCommand = new MySqlCommand(countQuery, connection);
            int userCount = Convert.ToInt32(countCommand.ExecuteScalar());
            int newId = userCount + 1;
            string insertQuery = $"INSERT INTO {table} (id, username, password) VALUES (@id, @username, @password)";
            MySqlCommand insertCommand = new(insertQuery, connection);
            insertCommand.Parameters.AddWithValue("@id", newId);
            insertCommand.Parameters.AddWithValue("@username", username);
            insertCommand.Parameters.AddWithValue("@password", password);
            insertCommand.ExecuteNonQuery();
        }

        public LoginResult JudgeUser(string username, string password)
        {
            string query = "SELECT password FROM basedata WHERE username = @username";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@username", username);
            MySqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                string storedPassword = reader.GetString(0);
                reader.Close();
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
                reader.Close();
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
