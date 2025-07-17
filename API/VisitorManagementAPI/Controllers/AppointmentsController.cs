using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitorManagementAPI.Data;
using VisitorManagementAPI.Models;

namespace VisitorManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // --- THIS METHOD HAS BEEN UPGRADED WITH THE FINAL LOGIC ---
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments([FromQuery] string? status)
        {
            // Start with a query for all appointments.
            var query = _context.Appointments.AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                // --- THIS IS THE NEW, SMARTER LOGIC ---
                if (status == "Expected")
                {
                    // For the "Expected" status, we only want appointments from today onwards.
                    // DateTime.Now.Date gets today's date at midnight (00:00:00).
                    var today = DateTime.Now.Date; 
                    query = query.Where(a => a.Status == "Expected" && a.MeetingOn >= today);
                }
                else
                {
                    // For all other statuses (like "CheckedIn", "CheckedOut"), we don't need a date filter.
                    query = query.Where(a => a.Status == status);
                }
            }

            // Execute the final query, ordering by the newest meetings first.
            return await query.OrderByDescending(a => a.MeetingOn).ToListAsync();
        }

        // The POST method remains the same. No changes are needed here.
        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok(appointment);
        }
    }
}