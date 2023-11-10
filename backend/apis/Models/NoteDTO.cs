using infraestructura;

namespace todoList.Models
{
    public class NoteDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int NoteCategoryId { get; set; }
        public bool IsArchived { get; set; }
    }
}
