using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using server.Constants;
using server.Models;

namespace server.Data
{
    public class DBContext : DbContext
    {
        private readonly IHttpContextAccessor contextAccessor;
        public DBContext(DbContextOptions<DBContext> options, IHttpContextAccessor _contextAccessor) : base(options)
        {
            contextAccessor = _contextAccessor;
        }
        //pesquisas
        public DbSet<Ciudad> Ciudad => Set<Ciudad>();
        public DbSet<Provincia> Provincia => Set<Provincia>();
        public DbSet<Municipio> Municipio => Set<Municipio>();
        public DbSet<Centro> Centro => Set<Centro>();
        public DbSet<Laboratorio> Laboratorio => Set<Laboratorio>();
        public DbSet<Red> Red => Set<Red>();
        public DbSet<ManejoCartilla> ManejoCartilla => Set<ManejoCartilla>();
        public DbSet<Madre> Madre => Set<Madre>();
        public DbSet<Paciente> Paciente => Set<Paciente>();
        public DbSet<Cartilla> Cartilla => Set<Cartilla>();
        public DbSet<Resultado> Resultado => Set<Resultado>();


        //END

        public DbSet<RiCategoriaModulo> RiCategoriaModulo => Set<RiCategoriaModulo>();
        public DbSet<RecUsuario> RecUsuario => Set<RecUsuario>();
        public DbSet<RecGrupo> RecGrupo => Set<RecGrupo>();
        public DbSet<RiMenu> RiMenu => Set<RiMenu>();
        public DbSet<RiMenuGrupoRel> RiMenuGrupoRel => Set<RiMenuGrupoRel>();
        public DbSet<RecContactoCategoria> RecContactoCategoria => Set<RecContactoCategoria>();
        public DbSet<RecContacto> RecContacto => Set<RecContacto>();
        public DbSet<RecContactoCategoriaRel> RecContactoCategoriaRel => Set<RecContactoCategoriaRel>();
        public DbSet<RiAccesoModelo> RiAccesoModelo => Set<RiAccesoModelo>();
        public DbSet<RiModelo> RiModelo => Set<RiModelo>();
        public DbSet<RecTipoUsuario> RecTipoUsuario => Set<RecTipoUsuario>();
        public DbSet<RecUsuarioGrupo> RecUsuarioGrupo => Set<RecUsuarioGrupo>();
        public DbSet<UmCategoria> UmCategoria => Set<UmCategoria>();

        public DbSet<PvConfig> PvConfig => Set<PvConfig>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Pesquisas
            modelBuilder.Entity<Provincia>()
                        .HasOne(ca => ca.Ciudad)
                        .WithMany(ctc => ctc.Provincia)
                        .HasForeignKey(cfa => cfa.IdCiudad);
            modelBuilder.Entity<Municipio>()
                        .HasOne(ca => ca.Provincia)
                        .WithMany(ctc => ctc.Municipio)
                        .HasForeignKey(cfa => cfa.IdProvincia);
            modelBuilder.Entity<Centro>()
                        .HasOne(ca => ca.Municipio)
                        .WithMany(ctc => ctc.Centro)
                        .HasForeignKey(cfa => cfa.IdMunicipio);
            modelBuilder.Entity<Laboratorio>()
                        .HasOne(ca => ca.Provincia)
                        .WithMany(ctc => ctc.Laboratorio)
                        .HasForeignKey(cfa => cfa.IdProvincia);
            modelBuilder.Entity<ManejoCartilla>()
                        .HasOne(ca => ca.Centro)
                        .WithMany(ctc => ctc.ManejoCartilla)
                        .HasForeignKey(cfa => cfa.IdCentro);
            modelBuilder.Entity<Madre>()
                        .HasOne(ca => ca.Provincia)
                        .WithMany(ctc => ctc.Madre)
                        .HasForeignKey(cfa => cfa.IdProvincia);
            modelBuilder.Entity<Paciente>()
                        .HasOne(ca => ca.Madre)
                        .WithMany(ctc => ctc.Paciente)
                        .HasForeignKey(cfa => cfa.IdMadre);
            modelBuilder.Entity<Cartilla>()
                        .HasOne(ca => ca.Paciente)
                        .WithMany(ctc => ctc.Cartilla)
                        .HasForeignKey(cfa => cfa.IdPaciente);
            modelBuilder.Entity<Resultado>()
                      .HasOne(ca => ca.Cartilla)
                      .WithOne(ctc => ctc.Resultado)
                      .HasForeignKey<Resultado>(cfa => cfa.IdCartilla);
            modelBuilder.Entity<Resultado>()
                        .HasOne(ca => ca.Laboratorio)
                        .WithMany(ctc => ctc.Resultado)
                        .HasForeignKey(cfa => cfa.IdLaboratorio);

            //end
            modelBuilder.Entity<RecContactoCategoriaRel>()
                .HasOne(ca => ca.Contacto)
                .WithMany(ctc => ctc.ContactoCategoriaRel)
                .HasForeignKey(cfa => cfa.IdContacto);
            modelBuilder.Entity<RecContactoCategoriaRel>()
                .HasOne(ca => ca.ContactoCategoria)
                .WithMany(ctc => ctc.ContactoCategoriaRel)
                .HasForeignKey(cfa => cfa.IdCategContacto);
            modelBuilder.Entity<RiMenuGrupoRel>()
                .HasOne(ca => ca.Grupo)
                .WithMany(ctc => ctc.RiMenuGrupoRel)
                .HasForeignKey(cfa => cfa.IdGrupo);
            modelBuilder.Entity<RiMenuGrupoRel>()
                .HasOne(ca => ca.Menu)
                .WithMany(ctc => ctc.RiMenuGrupoRel)
                .HasForeignKey(cfa => cfa.IdMenu);

            modelBuilder.Entity<RiAccesoModelo>()
                .HasOne(ca => ca.Modelo)
                .WithMany(ctc => ctc.RiAccesoModelo)
                .HasForeignKey(cfa => cfa.IdModelo);
            modelBuilder.Entity<RiAccesoModelo>()
                .HasOne(ca => ca.Grupo)
                .WithMany(ctc => ctc.RiAccesoModelo)
                .HasForeignKey(cfa => cfa.IdGrupo);
            modelBuilder.Entity<RecUsuarioGrupo>()
                .HasOne(ca => ca.Usuario)
                .WithMany(ctc => ctc.RecUsuarioGrupo)
                .HasForeignKey(cfa => cfa.IdUsuario);
            modelBuilder.Entity<RecUsuarioGrupo>()
                .HasOne(ca => ca.Grupo)
                .WithMany(ctc => ctc.RecUsuarioGrupo)
                .HasForeignKey(cfa => cfa.IdGrupo);
            modelBuilder.Entity<RecUsuario>()
                .HasOne(ca => ca.TipoUsuario)
                .WithMany(ctc => ctc.RecUsuario)
                .HasForeignKey(cfa => cfa.IdTipoUsuario);
            modelBuilder.Entity<RecUsuario>()
                .HasOne(ca => ca.Contacto)
                .WithMany(ctc => ctc.RecUsuario)
                .HasForeignKey(cfa => cfa.IdContacto);
            modelBuilder.Entity<RiMenu>()
                .HasOne(rm => rm.Padre)
                .WithMany()
                .HasForeignKey(rm => rm.IdPadre);
            modelBuilder.Entity<RiModelo>()
                .HasOne(ca => ca.Menu)
                .WithMany(ctc => ctc.RiModelo)
                .HasForeignKey(cfa => cfa.IdMenu);




            modelBuilder.Entity<RiCategoriaModulo>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RecUsuario>().HasQueryFilter(ru => ru.Estado == States.ACTIVE);
            modelBuilder.Entity<RecContactoCategoria>().HasQueryFilter(pc => pc.Estado == States.ACTIVE);
            modelBuilder.Entity<RecContacto>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RecContactoCategoriaRel>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RecGrupo>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RiMenu>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RiMenuGrupoRel>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RiAccesoModelo>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RiModelo>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RecTipoUsuario>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<RecUsuarioGrupo>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<UmCategoria>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<PvConfig>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);
            modelBuilder.Entity<Resultado>().HasQueryFilter(rcm => rcm.Estado == States.ACTIVE);


        }

        //SOFTDELETE MIDDLEWARE
        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(c => c.State == EntityState.Deleted || c.State == EntityState.Added || c.State == EntityState.Modified)
            )
            {
                if (entry.State == EntityState.Deleted)
                {
                    entry.State = EntityState.Modified;
                    entry.CurrentValues["Estado"] = States.DELETED;
                }
                if (entry.State == EntityState.Added)
                {
                    var token = ObtenerIdUsuarioDesdeToken();
                    if (token != null)
                    {
                        entry.CurrentValues["IdUsrCreacion"] = token;
                    }
                }
                if (entry.State == EntityState.Modified)
                {
                    var token = ObtenerIdUsuarioDesdeToken();
                    if (token != null)
                    {
                        entry.CurrentValues["IdUsrModificacion"] = token;
                    }
                }
                if (entry.State == EntityState.Added)
                {
                    var date = DateTime.UtcNow;
                    entry.CurrentValues["FechaCreacion"] = date;
                    entry.CurrentValues["FechaModificacion"] = date;
                }
                if (entry.State == EntityState.Modified)
                {
                    var date = DateTime.UtcNow;
                    entry.CurrentValues["FechaModificacion"] = date;
                }
            }
        }
        private int? ObtenerIdUsuarioDesdeToken()
        {
            var tokenId = contextAccessor?.HttpContext?.User.FindFirst("Id")?.Value;
            if (tokenId == null) return null;
            int id = int.Parse(tokenId);
            return id;
        }

        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public void LoadContableAsientoLibro(int anioInicio, int anioFinal, int filasAsiento, int filasDetalles)
        {
            Database.ExecuteSqlRaw("SELECT load_contable_asiento_libro({0}, {1}, {2}, {3})", anioInicio, anioFinal, filasAsiento, filasDetalles);
        }
    }
}