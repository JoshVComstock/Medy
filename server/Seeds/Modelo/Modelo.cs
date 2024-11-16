using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class Seeds_Modelo
  {
    public static RiModelo RiModeloContactos = new()
    {
      Modelo = "Contactos",
      Descripcion = "CRUD Contactos",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Contacto.MenuContactos,
    };

    public static RiModelo RiModeloCategoriasDeContacto = new()
    {
      Modelo = "Categorías de contacto",
      Descripcion = "CRUD Categorías de contacto",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Contacto.MenuCategoriasDeContacto,
    };


    public static RiModelo RiModeloUsuarios = new()
    {
      Modelo = "Usuarios",
      Descripcion = "CRUD Usuarios",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Configuracion.MenuConfiguracionUsuarios,
    };

    public static RiModelo RiModeloGrupos = new()
    {
      Modelo = "Grupos",
      Descripcion = "CRUD Grupos",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = 1,
      Menu = Seeds_Configuracion.MenuConfiguracionGrupos,
    };

    public static RiModelo RiModeloMenus = new()
    {
      Modelo = "Menús",
      Descripcion = "CRUD Menús",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = 1,
      Menu = Seeds_Configuracion.MenuConfiguracionMenus,
    };

    public static RiModelo RiModeloModelos = new()
    {
      Modelo = "Modelos",
      Descripcion = "CRUD Modelos",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Configuracion.MenuConfiguracionModelos,
    };
    public static RiModelo RiModeloCiudad = new()
    {
      Modelo = "Ciudades",
      Descripcion = "CRUD Ciudad",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Regiones.MenuCiudades,
    };
    public static RiModelo RiModeloMunipios = new()
    {
      Modelo = "Munipios",
      Descripcion = "CRUD Munipios",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Regiones.MenuMunicipios,
    };
    public static RiModelo RiModeloProvincias = new()
    {
      Modelo = "Provincias",
      Descripcion = "CRUD Provincias",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Regiones.MenuProvincias,
    };
    public static RiModelo RiModeloCentros = new()
    {
      Modelo = "Centros",
      Descripcion = "CRUD Centros",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Regiones.MenuCentros,
    };
    public static RiModelo RiModeloLaboratorio = new()
    {
      Modelo = "Laboratorio",
      Descripcion = "CRUD Laboratorio",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Regiones.MenuLaboratorio,
    };
    public static RiModelo RiModeloResultados = new()
    {
      Modelo = "Resultados",
      Descripcion = "CRUD Resultados",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Laboratorio.MenuResultado,
    };
    public static RiModelo RiModeloCartilla = new()
    {
      Modelo = "Cartilla",
      Descripcion = "CRUD Cartilla",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_GestionClinica.MenuCartilla,
    };
    public static RiModelo RiModeloProvinciaCartilla = new()
    {
      Modelo = "Provincia cartilla",
      Descripcion = "CRUD provincia cartilla",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_ControlCartilla.MenuProvinciaCartilla,
    };
    public static RiModelo RiModeloHospitalCartilla = new()
    {
      Modelo = "Hospital cartilla",
      Descripcion = "CRUD hospital cartilla",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_ControlCartilla.MenuHospitalCartilla,
    };
    public static RiModelo RiModeloResultado = new()
    {
      Modelo = "Resultado",
      Descripcion = "CRUD resultado",
      Tipo = "CRUD",
      Secuencia = "1",
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null,
      Menu = Seeds_Laboratorio.MenuResultado,
    };
    public static List<RiModelo> List = new()
    {
      RiModeloContactos,
      RiModeloCategoriasDeContacto,
      RiModeloUsuarios,
      RiModeloGrupos,
      RiModeloProvinciaCartilla,
      RiModeloHospitalCartilla,
      RiModeloMenus,
      RiModeloModelos,
      RiModeloCiudad,
      RiModeloMunipios,
      RiModeloProvincias,
      RiModeloCentros,
      RiModeloLaboratorio,
      RiModeloResultados,
      RiModeloCartilla,
      RiModeloResultado
    };
  }
}