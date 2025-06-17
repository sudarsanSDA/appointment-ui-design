using System.ComponentModel.DataAnnotations;

// Make sure this namespace matches your project name!
namespace VisitorManagementAPI.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }

        // Details Tab
        public string? VisitorType { get; set; }
        public string? VisitorName { get; set; }
        public string? VisitorEmail { get; set; }
        public string? VisitorMobile { get; set; }
        public string? Purpose { get; set; }
        public string? Location { get; set; }
        public string? Gate { get; set; }
        public string? Area { get; set; }
        public DateTime MeetingOn { get; set; }
        public DateTime? MeetingTo { get; set; } // Nullable DateTime
        public bool AllDay { get; set; }
        public bool RepeatVisit { get; set; }
        public string? Scheduler { get; set; }
        public string? Recurrence { get; set; }

        // Additional Tab
        public bool AssistanceRequired { get; set; }
        public bool ServiceProviderAccess { get; set; }
        public bool WifiRequired { get; set; }
        public bool EscortRequired { get; set; }
        public bool AdditionalNotification { get; set; }
        public string? NotifyTo { get; set; }
        public string? VisitorMessage { get; set; }
        public string? CheckInInstructions { get; set; }
    }
}