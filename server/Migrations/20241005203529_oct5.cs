using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class oct5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ciudad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ciudad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PvConfig",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    LimiteProducto = table.Column<int>(type: "integer", nullable: false),
                    LimiteContactos = table.Column<int>(type: "integer", nullable: false),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    IdTipoTerminal = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PvConfig", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecContacto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    IdPadre = table.Column<int>(type: "integer", nullable: true),
                    TipoContacto = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Profesion = table.Column<string>(type: "text", nullable: false),
                    NombreDespliegue = table.Column<string>(type: "text", nullable: false),
                    IdentFiscal = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false),
                    IdPais = table.Column<int>(type: "integer", nullable: false),
                    IdCiudad = table.Column<int>(type: "integer", nullable: false),
                    EsEmpresa = table.Column<bool>(type: "boolean", nullable: false),
                    Direccion1 = table.Column<string>(type: "text", nullable: false),
                    Direccion2 = table.Column<string>(type: "text", nullable: false),
                    Numeracion = table.Column<string>(type: "text", nullable: false),
                    Zona = table.Column<string>(type: "text", nullable: false),
                    Longitud = table.Column<int>(type: "integer", nullable: false),
                    Latitud = table.Column<int>(type: "integer", nullable: false),
                    TelefonoFijo = table.Column<string>(type: "text", nullable: false),
                    TelefonoMovil = table.Column<string>(type: "text", nullable: false),
                    PuestoTrabajo = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    SitioWeb = table.Column<string>(type: "text", nullable: false),
                    Comentario = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecContacto", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecContactoCategoria",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdPadre = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    PathPadre = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecContactoCategoria", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecGrupo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCategoria = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecGrupo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecTipoUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecTipoUsuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Red",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Red", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiCategoriaModulo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdPadre = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    Visible = table.Column<bool>(type: "boolean", nullable: false),
                    Exclusivo = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiCategoriaModulo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiMenu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdPadre = table.Column<int>(type: "integer", nullable: true),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    PathIcono = table.Column<string>(type: "text", nullable: true),
                    PathPadre = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Accion = table.Column<string>(type: "text", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiMenu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RiMenu_RiMenu_IdPadre",
                        column: x => x.IdPadre,
                        principalTable: "RiMenu",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UmCategoria",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Agrupable = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UmCategoria", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provincia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCiudad = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provincia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Provincia_Ciudad_IdCiudad",
                        column: x => x.IdCiudad,
                        principalTable: "Ciudad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecContactoCategoriaRel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdContacto = table.Column<int>(type: "integer", nullable: false),
                    IdCategContacto = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecContactoCategoriaRel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecContactoCategoriaRel_RecContactoCategoria_IdCategContacto",
                        column: x => x.IdCategContacto,
                        principalTable: "RecContactoCategoria",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecContactoCategoriaRel_RecContacto_IdContacto",
                        column: x => x.IdContacto,
                        principalTable: "RecContacto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdTipoUsuario = table.Column<int>(type: "integer", nullable: true),
                    IdContacto = table.Column<int>(type: "integer", nullable: true),
                    IdAccion = table.Column<int>(type: "integer", nullable: false),
                    Telefono = table.Column<string>(type: "text", nullable: false),
                    Login = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    CodigoSecreto = table.Column<string>(type: "text", nullable: true),
                    Firma = table.Column<string>(type: "text", nullable: true),
                    Notificacion = table.Column<string>(type: "text", nullable: true),
                    EstadoBot = table.Column<string>(type: "text", nullable: true),
                    CodigoBot = table.Column<string>(type: "text", nullable: true),
                    Activo = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecUsuario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecUsuario_RecContacto_IdContacto",
                        column: x => x.IdContacto,
                        principalTable: "RecContacto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RecUsuario_RecTipoUsuario_IdTipoUsuario",
                        column: x => x.IdTipoUsuario,
                        principalTable: "RecTipoUsuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RiMenuGrupoRel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMenu = table.Column<int>(type: "integer", nullable: false),
                    IdGrupo = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiMenuGrupoRel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RiMenuGrupoRel_RecGrupo_IdGrupo",
                        column: x => x.IdGrupo,
                        principalTable: "RecGrupo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RiMenuGrupoRel_RiMenu_IdMenu",
                        column: x => x.IdMenu,
                        principalTable: "RiMenu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RiModelo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Modelo = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Tipo = table.Column<string>(type: "text", nullable: false),
                    Secuencia = table.Column<string>(type: "text", nullable: false),
                    IdMenu = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiModelo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RiModelo_RiMenu_IdMenu",
                        column: x => x.IdMenu,
                        principalTable: "RiMenu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Laboratorio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Direccion = table.Column<string>(type: "text", nullable: false),
                    Telefono = table.Column<int>(type: "integer", nullable: false),
                    IdProvincia = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laboratorio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Laboratorio_Provincia_IdProvincia",
                        column: x => x.IdProvincia,
                        principalTable: "Provincia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Madre",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Ci = table.Column<string>(type: "text", nullable: false),
                    Direccion = table.Column<string>(type: "text", nullable: false),
                    DetalleDireccion = table.Column<string>(type: "text", nullable: true),
                    Telefono = table.Column<string>(type: "text", nullable: false),
                    TelefonoEmergencia = table.Column<string>(type: "text", nullable: false),
                    TratamientoHiportiroidismo = table.Column<bool>(type: "boolean", nullable: false),
                    TratamientoHipertiroidismo = table.Column<bool>(type: "boolean", nullable: false),
                    Tratamiento = table.Column<string>(type: "text", nullable: false),
                    Enfermedad = table.Column<string>(type: "text", nullable: false),
                    IdProvincia = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Madre", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Madre_Provincia_IdProvincia",
                        column: x => x.IdProvincia,
                        principalTable: "Provincia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Municipio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdProvincia = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Municipio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Municipio_Provincia_IdProvincia",
                        column: x => x.IdProvincia,
                        principalTable: "Provincia",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecUsuarioGrupo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdUsuario = table.Column<int>(type: "integer", nullable: false),
                    IdGrupo = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecUsuarioGrupo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecUsuarioGrupo_RecGrupo_IdGrupo",
                        column: x => x.IdGrupo,
                        principalTable: "RecGrupo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecUsuarioGrupo_RecUsuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "RecUsuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RiAccesoModelo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdGrupo = table.Column<int>(type: "integer", nullable: false),
                    IdModelo = table.Column<int>(type: "integer", nullable: false),
                    Ver = table.Column<bool>(type: "boolean", nullable: false),
                    Crear = table.Column<bool>(type: "boolean", nullable: false),
                    Editar = table.Column<bool>(type: "boolean", nullable: false),
                    Eliminar = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiAccesoModelo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RiAccesoModelo_RecGrupo_IdGrupo",
                        column: x => x.IdGrupo,
                        principalTable: "RecGrupo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RiAccesoModelo_RiModelo_IdModelo",
                        column: x => x.IdModelo,
                        principalTable: "RiModelo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paciente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Sexo = table.Column<string>(type: "text", nullable: false),
                    EdadGestacionalSemana = table.Column<int>(type: "integer", nullable: false),
                    EdadGestacionalDia = table.Column<int>(type: "integer", nullable: false),
                    FechaNacimiento = table.Column<DateOnly>(type: "date", nullable: false),
                    PesoNacimiento = table.Column<double>(type: "double precision", nullable: false),
                    NacimientoTermino = table.Column<bool>(type: "boolean", nullable: false),
                    IdMadre = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paciente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Paciente_Madre_IdMadre",
                        column: x => x.IdMadre,
                        principalTable: "Madre",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Centro",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMunicipio = table.Column<int>(type: "integer", nullable: false),
                    Direccion = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Area = table.Column<string>(type: "text", nullable: false),
                    SeguimientoCasos = table.Column<string>(type: "text", nullable: true),
                    Contacto = table.Column<string>(type: "text", nullable: false),
                    Telefono = table.Column<string>(type: "text", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Centro", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Centro_Municipio_IdMunicipio",
                        column: x => x.IdMunicipio,
                        principalTable: "Municipio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cartilla",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CodigoBarras = table.Column<string>(type: "text", nullable: false),
                    FechaTomaMuestras = table.Column<DateOnly>(type: "date", nullable: false),
                    NumeroMuestra = table.Column<int>(type: "integer", nullable: false),
                    Transfucion = table.Column<bool>(type: "boolean", nullable: true),
                    Antibioticos = table.Column<string>(type: "text", nullable: true),
                    Notas = table.Column<string>(type: "text", nullable: true),
                    IdPaciente = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cartilla", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cartilla_Paciente_IdPaciente",
                        column: x => x.IdPaciente,
                        principalTable: "Paciente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ManejoCartilla",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TipoManejo = table.Column<string>(type: "text", nullable: false),
                    IdCentro = table.Column<int>(type: "integer", nullable: false),
                    CantidadEntrega = table.Column<int>(type: "integer", nullable: false),
                    CantidadRecivida = table.Column<int>(type: "integer", nullable: true),
                    CodigoTarjetaInicio = table.Column<int>(type: "integer", nullable: false),
                    CodigoTarjetaFinal = table.Column<int>(type: "integer", nullable: false),
                    EntregadoPor = table.Column<string>(type: "text", nullable: false),
                    RecibidoPor = table.Column<string>(type: "text", nullable: true),
                    Telefono = table.Column<string>(type: "text", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManejoCartilla", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ManejoCartilla_Centro_IdCentro",
                        column: x => x.IdCentro,
                        principalTable: "Centro",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Resultado",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FechaIngreso = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaResultado = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaEntregado = table.Column<DateOnly>(type: "date", nullable: false),
                    ResultadoPaciente = table.Column<string>(type: "text", nullable: false),
                    Metodo = table.Column<string>(type: "text", nullable: false),
                    ValorResultado = table.Column<string>(type: "text", nullable: false),
                    ValorReferencia = table.Column<string>(type: "text", nullable: false),
                    Observacion = table.Column<string>(type: "text", nullable: true),
                    IdCartilla = table.Column<int>(type: "integer", nullable: false),
                    IdLaboratorio = table.Column<int>(type: "integer", nullable: false),
                    Envio = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resultado", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resultado_Cartilla_IdCartilla",
                        column: x => x.IdCartilla,
                        principalTable: "Cartilla",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Resultado_Laboratorio_IdLaboratorio",
                        column: x => x.IdLaboratorio,
                        principalTable: "Laboratorio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cartilla_IdPaciente",
                table: "Cartilla",
                column: "IdPaciente");

            migrationBuilder.CreateIndex(
                name: "IX_Centro_IdMunicipio",
                table: "Centro",
                column: "IdMunicipio");

            migrationBuilder.CreateIndex(
                name: "IX_Laboratorio_IdProvincia",
                table: "Laboratorio",
                column: "IdProvincia");

            migrationBuilder.CreateIndex(
                name: "IX_Madre_IdProvincia",
                table: "Madre",
                column: "IdProvincia");

            migrationBuilder.CreateIndex(
                name: "IX_ManejoCartilla_IdCentro",
                table: "ManejoCartilla",
                column: "IdCentro");

            migrationBuilder.CreateIndex(
                name: "IX_Municipio_IdProvincia",
                table: "Municipio",
                column: "IdProvincia");

            migrationBuilder.CreateIndex(
                name: "IX_Paciente_IdMadre",
                table: "Paciente",
                column: "IdMadre");

            migrationBuilder.CreateIndex(
                name: "IX_Provincia_IdCiudad",
                table: "Provincia",
                column: "IdCiudad");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoCategoriaRel_IdCategContacto",
                table: "RecContactoCategoriaRel",
                column: "IdCategContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoCategoriaRel_IdContacto",
                table: "RecContactoCategoriaRel",
                column: "IdContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecUsuario_IdContacto",
                table: "RecUsuario",
                column: "IdContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecUsuario_IdTipoUsuario",
                table: "RecUsuario",
                column: "IdTipoUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_RecUsuarioGrupo_IdGrupo",
                table: "RecUsuarioGrupo",
                column: "IdGrupo");

            migrationBuilder.CreateIndex(
                name: "IX_RecUsuarioGrupo_IdUsuario",
                table: "RecUsuarioGrupo",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Resultado_IdCartilla",
                table: "Resultado",
                column: "IdCartilla",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Resultado_IdLaboratorio",
                table: "Resultado",
                column: "IdLaboratorio");

            migrationBuilder.CreateIndex(
                name: "IX_RiAccesoModelo_IdGrupo",
                table: "RiAccesoModelo",
                column: "IdGrupo");

            migrationBuilder.CreateIndex(
                name: "IX_RiAccesoModelo_IdModelo",
                table: "RiAccesoModelo",
                column: "IdModelo");

            migrationBuilder.CreateIndex(
                name: "IX_RiMenu_IdPadre",
                table: "RiMenu",
                column: "IdPadre");

            migrationBuilder.CreateIndex(
                name: "IX_RiMenuGrupoRel_IdGrupo",
                table: "RiMenuGrupoRel",
                column: "IdGrupo");

            migrationBuilder.CreateIndex(
                name: "IX_RiMenuGrupoRel_IdMenu",
                table: "RiMenuGrupoRel",
                column: "IdMenu");

            migrationBuilder.CreateIndex(
                name: "IX_RiModelo_IdMenu",
                table: "RiModelo",
                column: "IdMenu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ManejoCartilla");

            migrationBuilder.DropTable(
                name: "PvConfig");

            migrationBuilder.DropTable(
                name: "RecContactoCategoriaRel");

            migrationBuilder.DropTable(
                name: "RecUsuarioGrupo");

            migrationBuilder.DropTable(
                name: "Red");

            migrationBuilder.DropTable(
                name: "Resultado");

            migrationBuilder.DropTable(
                name: "RiAccesoModelo");

            migrationBuilder.DropTable(
                name: "RiCategoriaModulo");

            migrationBuilder.DropTable(
                name: "RiMenuGrupoRel");

            migrationBuilder.DropTable(
                name: "UmCategoria");

            migrationBuilder.DropTable(
                name: "Centro");

            migrationBuilder.DropTable(
                name: "RecContactoCategoria");

            migrationBuilder.DropTable(
                name: "RecUsuario");

            migrationBuilder.DropTable(
                name: "Cartilla");

            migrationBuilder.DropTable(
                name: "Laboratorio");

            migrationBuilder.DropTable(
                name: "RiModelo");

            migrationBuilder.DropTable(
                name: "RecGrupo");

            migrationBuilder.DropTable(
                name: "Municipio");

            migrationBuilder.DropTable(
                name: "RecContacto");

            migrationBuilder.DropTable(
                name: "RecTipoUsuario");

            migrationBuilder.DropTable(
                name: "Paciente");

            migrationBuilder.DropTable(
                name: "RiMenu");

            migrationBuilder.DropTable(
                name: "Madre");

            migrationBuilder.DropTable(
                name: "Provincia");

            migrationBuilder.DropTable(
                name: "Ciudad");
        }
    }
}
