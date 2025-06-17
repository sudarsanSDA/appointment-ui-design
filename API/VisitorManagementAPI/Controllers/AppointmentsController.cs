using Microsoft.AspNetCore.Mvc;
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
