var builder = WebApplication.CreateBuilder(args);

//CORS
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins(
                            "http://localhost:5173",
                            "http://localhost",
                            "http://localhost:80" 
                        )
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddControllers(); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<Google.GenAI.Client>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myAllowSpecificOrigins);

app.UseHttpsRedirection();

app.MapControllers();

app.Run();