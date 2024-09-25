using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ago21 : Migration
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
                name: "ContableBanco",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCuenta = table.Column<int>(type: "integer", nullable: false),
                    NumeroCuenta = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContableBanco", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProdAtributo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    TipoVisualizacion = table.Column<string>(type: "text", nullable: false),
                    ModoCreacion = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdAtributo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProdCategoria",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdPadre = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    NombreCompleto = table.Column<string>(type: "text", nullable: false),
                    PathPadre = table.Column<string>(type: "text", nullable: false),
                    IdEstrategiaEliminacion = table.Column<int>(type: "integer", nullable: false),
                    MetodoEmbalaje = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdCategoria", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecBanco",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Direccion = table.Column<string>(type: "text", nullable: false),
                    Direccion2 = table.Column<string>(type: "text", nullable: false),
                    CodigoPostal = table.Column<string>(type: "text", nullable: false),
                    Ciudad = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Telefono = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecBanco", x => x.Id);
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
                name: "RecMoneda",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Codigo = table.Column<string>(type: "text", nullable: false),
                    Simbolo = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Decimales = table.Column<int>(type: "integer", nullable: false),
                    UnidadMonetaria = table.Column<string>(type: "text", nullable: false),
                    SubUnidadMonetaria = table.Column<string>(type: "text", nullable: false),
                    Redondeo = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecMoneda", x => x.Id);
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
                name: "ProdAtributoValor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdAtributo = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false),
                    ColorHtml = table.Column<string>(type: "text", nullable: false),
                    Personalizable = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdAtributoValor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdAtributoValor_ProdAtributo_IdAtributo",
                        column: x => x.IdAtributo,
                        principalTable: "ProdAtributo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PvEfectivo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Valor = table.Column<double>(type: "double precision", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PvEfectivo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PvEfectivo_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
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
                name: "UmUnidadMedida",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCategoria = table.Column<int>(type: "integer", nullable: true),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Tipo = table.Column<string>(type: "text", nullable: false),
                    Ratio = table.Column<decimal>(type: "numeric", nullable: false),
                    Redondeo = table.Column<decimal>(type: "numeric", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UmUnidadMedida", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UmUnidadMedida_UmCategoria_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "UmCategoria",
                        principalColumn: "Id");
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
                name: "PvCaja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdEfectivo = table.Column<int>(type: "integer", nullable: true),
                    Valor = table.Column<double>(type: "double precision", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Cantidad = table.Column<int>(type: "integer", nullable: false),
                    Fecha = table.Column<DateOnly>(type: "date", nullable: false),
                    Tipo = table.Column<string>(type: "text", nullable: false),
                    EfectivoId = table.Column<int>(type: "integer", nullable: false),
                    RecMonedaId = table.Column<int>(type: "integer", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PvCaja", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PvCaja_PvEfectivo_EfectivoId",
                        column: x => x.EfectivoId,
                        principalTable: "PvEfectivo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PvCaja_RecMoneda_RecMonedaId",
                        column: x => x.RecMonedaId,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
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

            migrationBuilder.CreateTable(
                name: "CompraOrden",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CodOrden = table.Column<string>(type: "text", nullable: false),
                    IdProveedor = table.Column<int>(type: "integer", nullable: true),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    RefProveedor = table.Column<string>(type: "text", nullable: false),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    EstadoCompra = table.Column<int>(type: "integer", nullable: false),
                    Prioridad = table.Column<int>(type: "integer", nullable: false),
                    Nota = table.Column<string>(type: "text", nullable: false),
                    IdUsrComprador = table.Column<int>(type: "integer", nullable: false),
                    MontoSinImpuesto = table.Column<int>(type: "integer", nullable: false),
                    MontoImpuesto = table.Column<int>(type: "integer", nullable: false),
                    MontoTotal = table.Column<int>(type: "integer", nullable: false),
                    FechaLimitePedido = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaConfirmacion = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaEntregaPlani = table.Column<DateOnly>(type: "date", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompraOrden", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompraOrden_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompraOrdenDetalle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCompraOrden = table.Column<int>(type: "integer", nullable: true),
                    IdProducto = table.Column<int>(type: "integer", nullable: true),
                    IdUnidadMedida = table.Column<int>(type: "integer", nullable: true),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdEmpaquetado = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Cantidad = table.Column<int>(type: "integer", nullable: false),
                    PrecioUnitario = table.Column<int>(type: "integer", nullable: false),
                    PrecioSubtotal = table.Column<int>(type: "integer", nullable: false),
                    PrecioTotal = table.Column<int>(type: "integer", nullable: false),
                    PrecioImpuesto = table.Column<int>(type: "integer", nullable: false),
                    CantidadSolicitada = table.Column<int>(type: "integer", nullable: false),
                    CantidadRecibida = table.Column<int>(type: "integer", nullable: false),
                    CantidadPaquete = table.Column<int>(type: "integer", nullable: false),
                    FechaEsperada = table.Column<DateOnly>(type: "date", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompraOrdenDetalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompraOrdenDetalle_CompraOrden_IdCompraOrden",
                        column: x => x.IdCompraOrden,
                        principalTable: "CompraOrden",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CompraOrdenDetalle_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CompraOrdenDetalle_UmUnidadMedida_IdUnidadMedida",
                        column: x => x.IdUnidadMedida,
                        principalTable: "UmUnidadMedida",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProdBaseAtribValorRel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdAtribValor = table.Column<int>(type: "integer", nullable: false),
                    IdProdBase = table.Column<int>(type: "integer", nullable: false),
                    PrecioExtra = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdBaseAtribValorRel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdBaseAtribValorRel_ProdAtributoValor_IdAtribValor",
                        column: x => x.IdAtribValor,
                        principalTable: "ProdAtributoValor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProdProducto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdProdBase = table.Column<int>(type: "integer", nullable: false),
                    CodInterno = table.Column<string>(type: "text", nullable: false),
                    CodFabricante = table.Column<string>(type: "text", nullable: false),
                    CodBarras = table.Column<string>(type: "text", nullable: false),
                    Volumen = table.Column<int>(type: "integer", nullable: false),
                    Peso = table.Column<int>(type: "integer", nullable: false),
                    PathImagen = table.Column<string>(type: "text", nullable: true),
                    ProdBaseAtribValorRelId = table.Column<int>(type: "integer", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdProducto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdProducto_ProdBaseAtribValorRel_ProdBaseAtribValorRelId",
                        column: x => x.ProdBaseAtribValorRelId,
                        principalTable: "ProdBaseAtribValorRel",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProdProductoAtribValorRel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdProdBaseAtriValorRel = table.Column<int>(type: "integer", nullable: false),
                    IdProdProducto = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdProductoAtribValorRel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdProductoAtribValorRel_ProdBaseAtribValorRel_IdProdBaseA~",
                        column: x => x.IdProdBaseAtriValorRel,
                        principalTable: "ProdBaseAtribValorRel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProdProductoAtribValorRel_ProdProducto_IdProdProducto",
                        column: x => x.IdProdProducto,
                        principalTable: "ProdProducto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProdProductoBase",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCategoria = table.Column<int>(type: "integer", nullable: true),
                    IdUnidadMedida = table.Column<int>(type: "integer", nullable: true),
                    IdUnidadMedCompra = table.Column<int>(type: "integer", nullable: false),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    IdTipoProducto = table.Column<int>(type: "integer", nullable: false),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false),
                    CodInterno = table.Column<string>(type: "text", nullable: false),
                    CodFabricante = table.Column<string>(type: "text", nullable: false),
                    CodBarras = table.Column<string>(type: "text", nullable: false),
                    Prioridad = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    DescripcionCompra = table.Column<string>(type: "text", nullable: false),
                    DescripcionVenta = table.Column<string>(type: "text", nullable: false),
                    PrecioVenta = table.Column<int>(type: "integer", nullable: false),
                    PrecioCosto = table.Column<int>(type: "integer", nullable: false),
                    Volumen = table.Column<int>(type: "integer", nullable: false),
                    Peso = table.Column<int>(type: "integer", nullable: false),
                    Vendible = table.Column<bool>(type: "boolean", nullable: false),
                    Comprable = table.Column<bool>(type: "boolean", nullable: false),
                    Configurable = table.Column<bool>(type: "boolean", nullable: false),
                    Trazabilidad = table.Column<string>(type: "text", nullable: false),
                    PlazoEntregaCli = table.Column<string>(type: "text", nullable: false),
                    TipoServEnt = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdProductoBase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdProductoBase_ProdCategoria_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "ProdCategoria",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProdProductoBase_UmUnidadMedida_IdUnidadMedida",
                        column: x => x.IdUnidadMedida,
                        principalTable: "UmUnidadMedida",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProdTarifa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    PoliticaDescuento = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdTarifa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdTarifa_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProdTarifaDetalle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdTarifa = table.Column<int>(type: "integer", nullable: true),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdProductoCategoria = table.Column<int>(type: "integer", nullable: true),
                    IdProductoBase = table.Column<int>(type: "integer", nullable: true),
                    IdProducto = table.Column<int>(type: "integer", nullable: true),
                    PrecioComputable = table.Column<string>(type: "text", nullable: false),
                    PrecioFijo = table.Column<int>(type: "integer", nullable: false),
                    Descuento = table.Column<int>(type: "integer", nullable: false),
                    AplicadoEn = table.Column<string>(type: "text", nullable: false),
                    CantidadMin = table.Column<int>(type: "integer", nullable: false),
                    FechaInicio = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaFin = table.Column<DateOnly>(type: "date", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdTarifaDetalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdTarifaDetalle_ProdCategoria_IdProductoCategoria",
                        column: x => x.IdProductoCategoria,
                        principalTable: "ProdCategoria",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProdTarifaDetalle_ProdProductoBase_IdProductoBase",
                        column: x => x.IdProductoBase,
                        principalTable: "ProdProductoBase",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProdTarifaDetalle_ProdProducto_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "ProdProducto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProdTarifaDetalle_ProdTarifa_IdTarifa",
                        column: x => x.IdTarifa,
                        principalTable: "ProdTarifa",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProdTarifaDetalle_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
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
                name: "RecEmpresa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdContacto = table.Column<int>(type: "integer", nullable: true),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdPadre = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    EmpresaDetalles = table.Column<string>(type: "text", nullable: false),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    TelefonoFijo = table.Column<string>(type: "text", nullable: false),
                    TelefonoMovil = table.Column<string>(type: "text", nullable: false),
                    FuenteLetra = table.Column<string>(type: "text", nullable: false),
                    ColorPrimario = table.Column<string>(type: "text", nullable: false),
                    ColorSecundario = table.Column<string>(type: "text", nullable: false),
                    ColorBackground = table.Column<string>(type: "text", nullable: false),
                    PieInforme = table.Column<string>(type: "text", nullable: false),
                    CabeceraInforme = table.Column<string>(type: "text", nullable: false),
                    PathLogo = table.Column<string>(type: "text", nullable: false),
                    IdNomenclatura = table.Column<int>(type: "integer", nullable: false),
                    CodigoQR = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecEmpresa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecEmpresa_RecContacto_IdContacto",
                        column: x => x.IdContacto,
                        principalTable: "RecContacto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RecEmpresa_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
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
                name: "RecContactoBanco",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdContacto = table.Column<int>(type: "integer", nullable: true),
                    IdBanco = table.Column<int>(type: "integer", nullable: true),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    NumeroCuenta = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecContactoBanco", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecContactoBanco_RecBanco_IdBanco",
                        column: x => x.IdBanco,
                        principalTable: "RecBanco",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RecContactoBanco_RecContacto_IdContacto",
                        column: x => x.IdContacto,
                        principalTable: "RecContacto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RecContactoBanco_RecEmpresa_IdEmpresa",
                        column: x => x.IdEmpresa,
                        principalTable: "RecEmpresa",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RecContactoBanco_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VentaOrden",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdEmpresa = table.Column<int>(type: "integer", nullable: true),
                    IdCliente = table.Column<int>(type: "integer", nullable: false),
                    IdTerminosPago = table.Column<int>(type: "integer", nullable: false),
                    IdPrecio = table.Column<int>(type: "integer", nullable: false),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdVendedor = table.Column<int>(type: "integer", nullable: false),
                    IdEquipo = table.Column<int>(type: "integer", nullable: false),
                    IdAlmacen = table.Column<int>(type: "integer", nullable: false),
                    Toker = table.Column<string>(type: "text", nullable: false),
                    CodigoOrden = table.Column<string>(type: "text", nullable: false),
                    EstadoOrden = table.Column<string>(type: "text", nullable: false),
                    EstadoFacturacion = table.Column<string>(type: "text", nullable: false),
                    FechaValidez = table.Column<DateOnly>(type: "date", nullable: false),
                    Tc = table.Column<int>(type: "integer", nullable: false),
                    MontoSinImpuesto = table.Column<int>(type: "integer", nullable: false),
                    MontoImpuesto = table.Column<int>(type: "integer", nullable: false),
                    MontoImpago = table.Column<int>(type: "integer", nullable: false),
                    MontoTotal = table.Column<int>(type: "integer", nullable: false),
                    Nota = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VentaOrden", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VentaOrden_RecEmpresa_IdEmpresa",
                        column: x => x.IdEmpresa,
                        principalTable: "RecEmpresa",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VentaOrden_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
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
                name: "VentaOrdenDetalle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdVentaOrden = table.Column<int>(type: "integer", nullable: true),
                    Secuencia = table.Column<int>(type: "integer", nullable: false),
                    IdMoneda = table.Column<int>(type: "integer", nullable: true),
                    IdProducto = table.Column<int>(type: "integer", nullable: true),
                    IdUnidadMedida = table.Column<int>(type: "integer", nullable: true),
                    IdEmpaquetado = table.Column<int>(type: "integer", nullable: false),
                    EstadoOrden = table.Column<string>(type: "text", nullable: false),
                    EstadoFacturacion = table.Column<string>(type: "text", nullable: false),
                    CodigoInterno = table.Column<string>(type: "text", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Cantidad = table.Column<int>(type: "integer", nullable: false),
                    PrecioUnitario = table.Column<int>(type: "integer", nullable: false),
                    Descuento = table.Column<int>(type: "integer", nullable: false),
                    PrecioReducido = table.Column<int>(type: "integer", nullable: false),
                    PrecioImpuesto = table.Column<int>(type: "integer", nullable: false),
                    PrecioUnitConImpuesto = table.Column<int>(type: "integer", nullable: false),
                    PrecioUnitSinImpuesto = table.Column<int>(type: "integer", nullable: false),
                    SubtotalConImpuesto = table.Column<int>(type: "integer", nullable: false),
                    SubtotalSinImpuesto = table.Column<int>(type: "integer", nullable: false),
                    CantidadEnviada = table.Column<int>(type: "integer", nullable: false),
                    TiempoEspera = table.Column<int>(type: "integer", nullable: false),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    IdUsrCreacion = table.Column<int>(type: "integer", nullable: true),
                    IdUsrModificacion = table.Column<int>(type: "integer", nullable: true),
                    FechaModificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VentaOrdenDetalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VentaOrdenDetalle_ProdProducto_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "ProdProducto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VentaOrdenDetalle_RecMoneda_IdMoneda",
                        column: x => x.IdMoneda,
                        principalTable: "RecMoneda",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VentaOrdenDetalle_UmUnidadMedida_IdUnidadMedida",
                        column: x => x.IdUnidadMedida,
                        principalTable: "UmUnidadMedida",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VentaOrdenDetalle_VentaOrden_IdVentaOrden",
                        column: x => x.IdVentaOrden,
                        principalTable: "VentaOrden",
                        principalColumn: "Id");
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
                name: "IX_CompraOrden_IdEmpresa",
                table: "CompraOrden",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_CompraOrden_IdMoneda",
                table: "CompraOrden",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_CompraOrden_IdProveedor",
                table: "CompraOrden",
                column: "IdProveedor");

            migrationBuilder.CreateIndex(
                name: "IX_CompraOrdenDetalle_IdCompraOrden",
                table: "CompraOrdenDetalle",
                column: "IdCompraOrden");

            migrationBuilder.CreateIndex(
                name: "IX_CompraOrdenDetalle_IdMoneda",
                table: "CompraOrdenDetalle",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_CompraOrdenDetalle_IdProducto",
                table: "CompraOrdenDetalle",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_CompraOrdenDetalle_IdUnidadMedida",
                table: "CompraOrdenDetalle",
                column: "IdUnidadMedida");

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
                name: "IX_ProdAtributoValor_IdAtributo",
                table: "ProdAtributoValor",
                column: "IdAtributo");

            migrationBuilder.CreateIndex(
                name: "IX_ProdBaseAtribValorRel_IdAtribValor",
                table: "ProdBaseAtribValorRel",
                column: "IdAtribValor");

            migrationBuilder.CreateIndex(
                name: "IX_ProdBaseAtribValorRel_IdProdBase",
                table: "ProdBaseAtribValorRel",
                column: "IdProdBase");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProducto_IdProdBase",
                table: "ProdProducto",
                column: "IdProdBase");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProducto_ProdBaseAtribValorRelId",
                table: "ProdProducto",
                column: "ProdBaseAtribValorRelId");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProductoAtribValorRel_IdProdBaseAtriValorRel",
                table: "ProdProductoAtribValorRel",
                column: "IdProdBaseAtriValorRel");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProductoAtribValorRel_IdProdProducto",
                table: "ProdProductoAtribValorRel",
                column: "IdProdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProductoBase_IdCategoria",
                table: "ProdProductoBase",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProductoBase_IdEmpresa",
                table: "ProdProductoBase",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_ProdProductoBase_IdUnidadMedida",
                table: "ProdProductoBase",
                column: "IdUnidadMedida");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifa_IdEmpresa",
                table: "ProdTarifa",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifa_IdMoneda",
                table: "ProdTarifa",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifaDetalle_IdMoneda",
                table: "ProdTarifaDetalle",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifaDetalle_IdProducto",
                table: "ProdTarifaDetalle",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifaDetalle_IdProductoBase",
                table: "ProdTarifaDetalle",
                column: "IdProductoBase");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifaDetalle_IdProductoCategoria",
                table: "ProdTarifaDetalle",
                column: "IdProductoCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_ProdTarifaDetalle_IdTarifa",
                table: "ProdTarifaDetalle",
                column: "IdTarifa");

            migrationBuilder.CreateIndex(
                name: "IX_Provincia_IdCiudad",
                table: "Provincia",
                column: "IdCiudad");

            migrationBuilder.CreateIndex(
                name: "IX_PvCaja_EfectivoId",
                table: "PvCaja",
                column: "EfectivoId");

            migrationBuilder.CreateIndex(
                name: "IX_PvCaja_RecMonedaId",
                table: "PvCaja",
                column: "RecMonedaId");

            migrationBuilder.CreateIndex(
                name: "IX_PvConfig_IdEmpresa",
                table: "PvConfig",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_PvEfectivo_IdMoneda",
                table: "PvEfectivo",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_RecContacto_IdEmpresa",
                table: "RecContacto",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoBanco_IdBanco",
                table: "RecContactoBanco",
                column: "IdBanco");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoBanco_IdContacto",
                table: "RecContactoBanco",
                column: "IdContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoBanco_IdEmpresa",
                table: "RecContactoBanco",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoBanco_IdMoneda",
                table: "RecContactoBanco",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoCategoriaRel_IdCategContacto",
                table: "RecContactoCategoriaRel",
                column: "IdCategContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecContactoCategoriaRel_IdContacto",
                table: "RecContactoCategoriaRel",
                column: "IdContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecEmpresa_IdContacto",
                table: "RecEmpresa",
                column: "IdContacto");

            migrationBuilder.CreateIndex(
                name: "IX_RecEmpresa_IdMoneda",
                table: "RecEmpresa",
                column: "IdMoneda");

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
                column: "IdCartilla");

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

            migrationBuilder.CreateIndex(
                name: "IX_UmUnidadMedida_IdCategoria",
                table: "UmUnidadMedida",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrden_IdEmpresa",
                table: "VentaOrden",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrden_IdMoneda",
                table: "VentaOrden",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrdenDetalle_IdMoneda",
                table: "VentaOrdenDetalle",
                column: "IdMoneda");

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrdenDetalle_IdProducto",
                table: "VentaOrdenDetalle",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrdenDetalle_IdUnidadMedida",
                table: "VentaOrdenDetalle",
                column: "IdUnidadMedida");

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrdenDetalle_IdVentaOrden",
                table: "VentaOrdenDetalle",
                column: "IdVentaOrden");

            migrationBuilder.AddForeignKey(
                name: "FK_CompraOrden_RecContacto_IdProveedor",
                table: "CompraOrden",
                column: "IdProveedor",
                principalTable: "RecContacto",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompraOrden_RecEmpresa_IdEmpresa",
                table: "CompraOrden",
                column: "IdEmpresa",
                principalTable: "RecEmpresa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompraOrdenDetalle_ProdProducto_IdProducto",
                table: "CompraOrdenDetalle",
                column: "IdProducto",
                principalTable: "ProdProducto",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProdBaseAtribValorRel_ProdProductoBase_IdProdBase",
                table: "ProdBaseAtribValorRel",
                column: "IdProdBase",
                principalTable: "ProdProductoBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProdProducto_ProdProductoBase_IdProdBase",
                table: "ProdProducto",
                column: "IdProdBase",
                principalTable: "ProdProductoBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProdProductoBase_RecEmpresa_IdEmpresa",
                table: "ProdProductoBase",
                column: "IdEmpresa",
                principalTable: "RecEmpresa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProdTarifa_RecEmpresa_IdEmpresa",
                table: "ProdTarifa",
                column: "IdEmpresa",
                principalTable: "RecEmpresa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PvConfig_RecEmpresa_IdEmpresa",
                table: "PvConfig",
                column: "IdEmpresa",
                principalTable: "RecEmpresa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecContacto_RecEmpresa_IdEmpresa",
                table: "RecContacto",
                column: "IdEmpresa",
                principalTable: "RecEmpresa",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecEmpresa_RecContacto_IdContacto",
                table: "RecEmpresa");

            migrationBuilder.DropTable(
                name: "CompraOrdenDetalle");

            migrationBuilder.DropTable(
                name: "ContableBanco");

            migrationBuilder.DropTable(
                name: "ManejoCartilla");

            migrationBuilder.DropTable(
                name: "ProdProductoAtribValorRel");

            migrationBuilder.DropTable(
                name: "ProdTarifaDetalle");

            migrationBuilder.DropTable(
                name: "PvCaja");

            migrationBuilder.DropTable(
                name: "PvConfig");

            migrationBuilder.DropTable(
                name: "RecContactoBanco");

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
                name: "VentaOrdenDetalle");

            migrationBuilder.DropTable(
                name: "CompraOrden");

            migrationBuilder.DropTable(
                name: "Centro");

            migrationBuilder.DropTable(
                name: "ProdTarifa");

            migrationBuilder.DropTable(
                name: "PvEfectivo");

            migrationBuilder.DropTable(
                name: "RecBanco");

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
                name: "ProdProducto");

            migrationBuilder.DropTable(
                name: "VentaOrden");

            migrationBuilder.DropTable(
                name: "Municipio");

            migrationBuilder.DropTable(
                name: "RecTipoUsuario");

            migrationBuilder.DropTable(
                name: "Paciente");

            migrationBuilder.DropTable(
                name: "RiMenu");

            migrationBuilder.DropTable(
                name: "ProdBaseAtribValorRel");

            migrationBuilder.DropTable(
                name: "Madre");

            migrationBuilder.DropTable(
                name: "ProdAtributoValor");

            migrationBuilder.DropTable(
                name: "ProdProductoBase");

            migrationBuilder.DropTable(
                name: "Provincia");

            migrationBuilder.DropTable(
                name: "ProdAtributo");

            migrationBuilder.DropTable(
                name: "ProdCategoria");

            migrationBuilder.DropTable(
                name: "UmUnidadMedida");

            migrationBuilder.DropTable(
                name: "Ciudad");

            migrationBuilder.DropTable(
                name: "UmCategoria");

            migrationBuilder.DropTable(
                name: "RecContacto");

            migrationBuilder.DropTable(
                name: "RecEmpresa");

            migrationBuilder.DropTable(
                name: "RecMoneda");
        }
    }
}
