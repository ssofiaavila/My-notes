using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using infraestructura;
using todoList.Models;
using Microsoft.Data.SqlClient;

namespace todoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly dbContextContext _context;

        public NotesController(dbContextContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }
            return await _context.Notes.ToListAsync();
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, NoteDTO note)
        {
            if (id != note.Id)
            {
                return BadRequest("The note ID in the URL does not match the ID in the provided data.");
            }

            // Check if the specified user exists
            var existingUser = await _context.Users.FindAsync(note.UserId);
            if (existingUser == null)
            {
                return NotFound("The specified user does not exist.");
            }

            // Get the database entity to update
            var existingNote = await _context.Notes
                .Include(n => n.User) // Include the relationship with the user
                .FirstOrDefaultAsync(n => n.Id == id);

            if (existingNote == null)
            {
                return NotFound("The note does not exist.");
            }

            // Update relevant properties with the values from the DTO
            existingNote.Name = note.Name;
            existingNote.Description = note.Description;
            existingNote.NoteCategoryId = note.NoteCategoryId;
            existingNote.IsArchived = note.IsArchived;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound("The note does not exist.");
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException ex)
            {
                // Specifically handle foreign key constraint exceptions
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 547)
                {
                    return BadRequest("The update violates the foreign key constraint.");
                }
                else
                {
                    throw;
                }
            }
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(NoteDTO note)
        {
            try
            {
                // Check if the category exists before inserting the note
                var existingCategory = await _context.NoteCategories.FindAsync(note.NoteCategoryId);
                if (existingCategory == null)
                {
                    // The category does not exist, you can handle this as needed
                    return NotFound("The specified category does not exist.");
                }

                // The category exists, now you can insert the note
                var newNote = new Note
                {
                    Name = note.Name,
                    UserId = note.UserId,
                    Description = note.Description,
                    NoteCategoryId = note.NoteCategoryId,
                    IsArchived = note.IsArchived,
                };

                _context.Notes.Add(newNote);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle other exceptions if necessary
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Notes/ByUser/5
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotesByUser(int userId)
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }

            var userNotes = await _context.Notes
                .Where(note => note.UserId == userId)
                .Include(note => note.NoteCategory) // Include the NoteCategory property
                .ToListAsync();

            if (userNotes == null || userNotes.Count == 0)
            {
                return NotFound("No notes found for the specified user.");
            }

            return userNotes;
        }

        [HttpPut("archive/{id}")]
        public async Task<IActionResult> ArchiveNote(int id)
        {
            var existingNote = await _context.Notes.FindAsync(id);

            if (existingNote == null)
            {
                return NotFound("The note does not exist.");
            }

            existingNote.IsArchived = true;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle other exceptions if necessary
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("unarchive/{id}")]
        public async Task<IActionResult> UnarchiveNote(int id)
        {
            var existingNote = await _context.Notes.FindAsync(id);

            if (existingNote == null)
            {
                return NotFound("The note does not exist.");
            }

            existingNote.IsArchived = false;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle other exceptions if necessary
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }

            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound("The note does not exist.");
            }

            _context.Notes.Remove(note);

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle other exceptions if necessary
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
