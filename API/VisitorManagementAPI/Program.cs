// This using statement is needed for DbContext
using Microsoft.EntityFrameworkCore;
// This using statement is needed for your ApplicationDbContext
using VisitorManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add the Database Context service
// This line stays exactly the same.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add the CORS policy service
// This line stays exactly the same.
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

// --- START: NEW CODE TO ADD ---
// This new block will run your database migrations automatically.
// It's the only change needed in this file.
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
// --- END: NEW CODE TO ADD ---


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Activate the CORS policy
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();