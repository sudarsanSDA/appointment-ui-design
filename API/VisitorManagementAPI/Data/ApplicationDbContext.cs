using Microsoft.EntityFrameworkCore;
using VisitorManagementAPI.Models;

// Make sure this namespace matches your project name!
namespace VisitorManagementAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
    }
}