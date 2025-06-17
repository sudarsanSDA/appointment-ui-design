using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisitorManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisitorType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisitorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisitorEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisitorMobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MeetingOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MeetingTo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AllDay = table.Column<bool>(type: "bit", nullable: false),
                    RepeatVisit = table.Column<bool>(type: "bit", nullable: false),
                    Scheduler = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Recurrence = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssistanceRequired = table.Column<bool>(type: "bit", nullable: false),
                    ServiceProviderAccess = table.Column<bool>(type: "bit", nullable: false),
                    WifiRequired = table.Column<bool>(type: "bit", nullable: false),
                    EscortRequired = table.Column<bool>(type: "bit", nullable: false),
                    AdditionalNotification = table.Column<bool>(type: "bit", nullable: false),
                    NotifyTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisitorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CheckInInstructions = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appointments");
        }
    }
}
