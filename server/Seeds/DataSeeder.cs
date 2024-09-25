using System.Collections;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Endpoints;
using server.Models;



namespace server.Seeds
{
  public class DataSeeder
  {
    private readonly DBContext dbContext;
    public DataSeeder(DBContext _dbContext)
    {
      dbContext = _dbContext;
    }

    private List<RiMenu> OrderSequence(List<RiMenu> values)
    {
      return values.Select((p, i) =>
            {
              p.Secuencia = i + 1;
              return p;
            }).ToList();
    }

    public async Task Reset()
    {
      await dbContext.Database.EnsureDeletedAsync();
      await dbContext.Database.MigrateAsync();
      Seed();
    }

    public void Seed()
    {
      try
      {
        if (!dbContext.RiMenu.Any())
        {
          //Menus
          var menuList = new List<RiMenu>();
          menuList.AddRange(OrderSequence(Seeds_RiMenu.List));
          menuList.AddRange(OrderSequence(Seeds_GestionClinica.List));
          menuList.AddRange(OrderSequence(Seeds_Regiones.List));
          menuList.AddRange(OrderSequence(Seeds_Contacto.List));
          menuList.AddRange(OrderSequence(Seeds_ControlCartilla.List));
          menuList.AddRange(OrderSequence(Seeds_Laboratorio.List));
          menuList.AddRange(OrderSequence(Seeds_Reportes.List));
          menuList.AddRange(OrderSequence(Seeds_Pacientes.List));
          menuList.AddRange(OrderSequence(Seeds_GestionResultados.List));
          /*   menuList.AddRange(OrderSequence(Seeds_ERP_ConfiguracionCompras.List));
            */
          menuList.AddRange(OrderSequence(Seeds_Configuracion.List));
          dbContext.RiMenu.AddRange(menuList);
        }

        if (!dbContext.RiModelo.Any())
        {
          //Modelos
          var riModeloList = new List<RiModelo>();
          riModeloList.AddRange(Seeds_ERP_RiModelo.List);
          dbContext.RiModelo.AddRange(riModeloList);
        }
        if (!dbContext.RecGrupo.Any())
        {
          //RecGrupo
          var recGrupoList = new List<RecGrupo>();
          recGrupoList.AddRange(Seeds_ERP_RecGrupo.List);
          dbContext.RecGrupo.AddRange(recGrupoList);
        }
        if (!dbContext.RecUsuario.Any())
        {
          //RecUsuario
          var recUsuarioList = new List<RecUsuario>();
          recUsuarioList.AddRange(Seeds_ERP_RecUsuario.List);
          dbContext.RecUsuario.AddRange(recUsuarioList);
        }
        if (!dbContext.RecUsuarioGrupo.Any())
        {
          //RecUsuarioGrupo
          var recUsuarioGrupoList = new List<RecUsuarioGrupo>();
          recUsuarioGrupoList.AddRange(Seeds_ERP_RecUsuarioGrupo.List);
          dbContext.RecUsuarioGrupo.AddRange(recUsuarioGrupoList);
        }
        if (!dbContext.RiMenuGrupoRel.Any())
        {
          //RiMenuGrupoRel
          var riMenuGrupoRel = new List<RiMenuGrupoRel>();
          riMenuGrupoRel.AddRange(Seeds_ERP_RiMenuGrupoRel.List);
          dbContext.RiMenuGrupoRel.AddRange(riMenuGrupoRel);
        }
        if (!dbContext.RiAccesoModelo.Any())
        {
          //RiAccesoModelo
          var riAccesoModeloList = new List<RiAccesoModelo>();
          riAccesoModeloList.AddRange(Seeds_ERP_RiAccesoModelo.List);
          dbContext.RiAccesoModelo.AddRange(riAccesoModeloList);
        }
        if (!dbContext.ProdCategoria.Any())
        {
          //ProdCategoria
          var prodCategoriaList = new List<ProdCategoria>();
          prodCategoriaList.AddRange(Seeds_ERP_ProdCategoria.List);
          dbContext.ProdCategoria.AddRange(prodCategoriaList);
        }
        if (!dbContext.RecMoneda.Any())
        {
          //RecMoneda
          var recMonedaList = new List<RecMoneda>();
          recMonedaList.AddRange(Seeds_ERP_RecMoneda.List);
          dbContext.RecMoneda.AddRange(recMonedaList);
        }
        if (!dbContext.PvEfectivo.Any())
        {
          //PvEfectivo
          var recEfectivoList = new List<PvEfectivo>();
          recEfectivoList.AddRange(Seeds_ERP_PvEfectivo.List);
          dbContext.PvEfectivo.AddRange(recEfectivoList);
        }
        if (!dbContext.RecTipoUsuario.Any())
        {
          //RecTipoUsuario
          var recTipoUsuarioList = new List<RecTipoUsuario>();
          recTipoUsuarioList.AddRange(Seeds_ERP_RecTipoUsuario.List);
          dbContext.RecTipoUsuario.AddRange(recTipoUsuarioList);
        }
        dbContext.SaveChanges();

      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error al hacer el seed: {ex.Message}");
      }

    }
  }
}

