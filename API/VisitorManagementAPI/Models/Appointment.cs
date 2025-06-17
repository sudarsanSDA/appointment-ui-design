using System.ComponentModel.DataAnnotations;


namespace VisitorManagementAPI.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }

        public string? VisitorType { get; set; }
        public string? VisitorName { get; set; }
        public string? VisitorEmail { get; set; }
        public string? VisitorMobile { get; set; }
        public string? Purpose { get; set; }
        public string? Location { get; set; }
        public string? Gate { get; set; }
        public string? Area { get; set; }
        public DateTime MeetingOn { get; set; }
        public DateTime? MeetingTo { get; set; }
        public bool AllDay { get; set; }
        public bool RepeatVisit { get; set; }
        public string? Scheduler { get; set; }
        public string? Recurrence { get; set; }
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
