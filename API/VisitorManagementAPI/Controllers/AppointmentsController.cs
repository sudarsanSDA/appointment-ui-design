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


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments([FromQuery] string? status)
        {
            var query = _context.Appointments.AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                if (status == "Expected")
                {
                    var today = DateTime.Now.Date; 
                    query = query.Where(a => a.Status == "Expected" && a.MeetingOn >= today);
                }
                else
                {
                    query = query.Where(a => a.Status == status);
                }
            }

            return await query.OrderByDescending(a => a.MeetingOn).ToListAsync();
        }

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

        
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateAppointmentStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            appointment.Status = request.Status;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

   
    public class UpdateStatusRequest
    {
        public string? Status { get; set; }
    }
}