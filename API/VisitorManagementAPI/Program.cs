// This using statement is needed for DbContext
using Microsoft.EntityFrameworkCore;
// This using statement is needed for your ApplicationDbContext
using VisitorManagementAPI.Data;
// This using statement is required for logging
using Microsoft.Extensions.Logging;
// --- NEW --- This using statement is required for the Forwarded Headers fix
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

// --- START: NEW CODE FOR AZURE HOSTING ---
// This tells the app to trust the proxy headers from Azure.
// It must be placed before other middleware like UseHttpsRedirection.
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});
// --- END: NEW CODE FOR AZURE HOSTING ---


// This block runs your database migrations automatically on startup.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        // Get the database context service
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        // Apply any pending migrations to the database
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        // Log an error if the migration fails. This helps with debugging in Azure.
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during database migration.");
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// This will now work correctly because of the Forwarded Headers middleware
app.UseHttpsRedirection();

// Activate the CORS policy
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();