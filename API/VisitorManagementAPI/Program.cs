// This using statement is needed for DbContext
using Microsoft.EntityFrameworkCore;
// This using statement is needed for your ApplicationDbContext
using VisitorManagementAPI.Data;
// This using statement is required for logging
using Microsoft.Extensions.Logging;
// This using statement is required for the Forwarded Headers fix
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add the Database Context service
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add the CORS policy service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        a => a.AllowAnyHeader()
              .AllowAnyOrigin()
              .AllowAnyMethod());
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// This tells the app to trust the proxy headers from Azure.
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});


// This block runs your database migrations automatically on startup.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during database migration.");
    }
}


// --- START: THE FINAL FIX ---
// The original code was inside an "if (app.Environment.IsDevelopment())" block.
// We are moving it outside so Swagger runs in Production (on Azure).
app.UseSwagger();
app.UseSwaggerUI();
// --- END: THE FINAL FIX ---


// This will now work correctly because of the Forwarded Headers middleware
app.UseHttpsRedirection();

// Activate the CORS policy
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();