using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using infraestructura;
using todoList.Models;

namespace todoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteCategoriesController : ControllerBase
    {
        private readonly dbContextContext _context;

        public NoteCategoriesController(dbContextContext context)
        {
            _context = context;
        }

        // GET: api/NoteCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteCategory>>> GetTaskCategories()
        {
            if (_context.NoteCategories == null)
            {
                return NotFound();
            }
            return await _context.NoteCategories.ToListAsync();
        }

        // GET: api/NoteCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NoteCategory>> GetNoteCategory(int id)
        {
            if (_context.NoteCategories == null)
            {
                return NotFound();
            }
            var noteCategory = await _context.NoteCategories.FindAsync(id);

            if (noteCategory == null)
            {
                return NotFound();
            }

            return noteCategory;
        }

        // PUT: api/NoteCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNoteCategory(int id, NoteCategoryDTO noteCategory)
        {
            var existingNoteCategory = await _context.NoteCategories.FindAsync(id);

            if (existingNoteCategory == null)
            {
                return NotFound();
            }

            existingNoteCategory.Name = noteCategory.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/NoteCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NoteCategory>> PostNoteCategory(NoteCategoryDTO note)
        {
            if (_context.NoteCategories == null)
            {
                return Problem("Entity set 'dbContextContext.TaskCategories' is null.");
            }

            var noteCategory = new NoteCategory
            {
                Name = note.Name,
                UserId = note.UserId
            };

            _context.NoteCategories.Add(noteCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNoteCategory", new { id = noteCategory.Id }, noteCategory);
        }

        // DELETE: api/NoteCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNoteCategory(int id)
        {
            if (_context.NoteCategories == null)
            {
                return NotFound();
            }
            var noteCategory = await _context.NoteCategories.FindAsync(id);
            if (noteCategory == null)
            {
                return NotFound();
            }

            _context.NoteCategories.Remove(noteCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteCategoryExists(int id)
        {
            return (_context.NoteCategories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
