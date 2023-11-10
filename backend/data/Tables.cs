using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace infraestructura
{

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        [JsonIgnore]
        public List<Note> Notes { get; set; } = new List<Note>();
        [JsonIgnore] 
        public List<NoteCategory> Categories { get; set; } = new List<NoteCategory>();
    }

    public class NoteCategory
    { 
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId {  get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }

    public class Note
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public int NoteCategoryId { get; set; }
        public NoteCategory NoteCategory { get; set; }
        public bool IsArchived { get; set; }
    }


}