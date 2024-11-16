using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server.Data;
using server.Endpoints;
using server.Seeds;
using server.Utils;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connection = builder.Configuration.GetConnectionString("PostgreSQLConnection");

// =========== START: SEED ===========
builder.Services.AddTransient<DataSeeder>();
// =========== END: SEED ===========

builder.Services.AddDbContext<DBContext>(options => options.UseNpgsql(connection));

 /* builder.Services.AddDbContext<DBContext>(options =>
    options.UseNpgsql(connection, npgsqlOptions =>
    {
        npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5, // Número máximo de reintentos
            maxRetryDelay: TimeSpan.FromSeconds(30), // Tiempo máximo entre reintentos
            errorCodesToAdd: null // Opcional: puedes agregar códigos de error adicionales que quieras manejar
        );
    })); */
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins(
            "http://localhost:80",
            "http://localhost:5173",
            "http://localhost:5174",
            "https://medisync-e4231.web.app"
        ).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? string.Empty))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services
    .AddSwaggerGen(option =>
    {


        option.SwaggerDoc("v1", new OpenApiInfo { Title = "Ticket API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Ingresar token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });

        var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

        option.EnableAnnotations();
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
        });
    });
var app = builder.Build();

if (args.Length == 1)
{
    await SeedData(app, args[0].ToLower());
}
// =========== START: SEED ===========
static async Task SeedData(IHost app, string arg)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using var scope = scopedFactory?.CreateScope();
    var service = scope?.ServiceProvider.GetService<DataSeeder>();
    if (service != null)
    {
        if (arg == "seeddata")
        {
            service.Seed();
        }
        if (arg == "reset")
        {
            await service.Reset();
        }
    }
}
// =========== END: SEED ===========

if (app.Environment.IsDevelopment())
{
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseWebSockets();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
    RequestPath = "/Static"
});

app.MapGet("/", () => "Server").WithTags("#");
app.MapGet("/common/data", () =>
{
    var res = new Response();
    string connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection") ?? "";
    if (connectionString == null) return res.BadRequestResponse("No se encontraron los datos");
    string[] connectionStringParts = connectionString.Split(';');
    string databaseName = "";

    foreach (string part in connectionStringParts)
    {
        if (part.StartsWith("Database="))
        {
            databaseName = part.Split('=')[1];
            break;
        }
    }

    return res.SuccessResponse("Datos obtenidos correctamente", new
    {
        DB = databaseName
    });
}).WithTags("#");
app.AuthEndpoints();
app.RiCategoriaModuloEndpoints();
app.RecContactoCategoriaEndpoints();
app.RecContactoEndpoints();
app.RecGrupoEndpoints();
app.RiMenuEndpoints();
app.SeedsEndpoints();
app.WebSocketEndpoints(app);
app.RecUsuarioEndpoints();
app.RecTipoUsuarioEndpoints();
app.RiModeloEndpoints();
app.UmCategoriaEndpoints();
app.PvConfigEndpoints();
//pesquisas
app.CiudadEndpoints();
app.ProvinciaEndpoints();
app.MunicipioEndpoints();
app.CentroEndpoints();
app.LaboratorioEndpoints();
app.RedEndpoints();
app.ManejoCartillaEndpoints();
app.CartillaEndpoints();
app.PacienteEndpoints();
app.ResultadoEndpoints();
app.Run();


