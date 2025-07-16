using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitorManagementAPI.Data;
using VisitorManagementAPI.Models;

// Make sure this namespace matches your project name!
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

        // --- THIS METHOD IS UPGRADED ---
        // It now handles two types of requests:
        // 1. GET: api/Appointments (gets all appointments)
        // 2. GET: api/Appointments?status=CheckedIn (gets only appointments with a specific status)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments([FromQuery] string? status)
        {
            // Start with a query for all appointments.
            // Using AsQueryable() lets us build the query step-by-step.
            var query = _context.Appointments.AsQueryable();

            // If a 'status' is provided in the URL (e.g., "?status=CheckedIn"),
            // we add a filter to our database query.
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(a => a.Status == status);
            }

            // Execute the final query, order by the newest first, and return the list.
            return await query.OrderByDescending(a => a.MeetingOn).ToListAsync();
        }

        // POST: api/appointments
        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Because our model has a default value for Status, we don't need to set it here.
            // It will automatically be "Expected".

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            // Return the created object with its new DB-generated Id
            return Ok(appointment);
        }
    }
}