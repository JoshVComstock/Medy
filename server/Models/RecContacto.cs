﻿using server.Constants;

using System.Security;

namespace server.Models
{
    public class RecContacto : Base
    {
        public int? IdEmpresa { get; set; }
        public int? IdPadre { get; set; }
        public required string TipoContacto { get; set; }
        public required string Nombre { get; set; }
        public required string Profesion { get; set; }
        public required string NombreDespliegue { get; set; }
        public required string IdentFiscal { get; set; }
        public required int Color { get; set; }
        public required int IdPais { get; set; }
        public required int IdCiudad { get; set; }
        public required bool EsEmpresa { get; set; }
        public required string Direccion1 { get; set; }
        public required string Direccion2 { get; set; }
        public required string Numeracion { get; set; }
        public required string Zona { get; set; }
        public required int Longitud { get; set; }
        public required int Latitud { get; set; }
        public required string TelefonoFijo { get; set; }
        public required string TelefonoMovil { get; set; }
        public required string PuestoTrabajo { get; set; }
        public required string Email { get; set; }
        public required string SitioWeb { get; set; }
        public required string Comentario { get; set; }
        public List<RecContactoCategoriaRel> ContactoCategoriaRel { get; set; } = new List<RecContactoCategoriaRel>();
        public List<RecUsuario> RecUsuario { get; set; } = new List<RecUsuario>();
        public List<RecEmpresa> RecEmpresa { get; set; } = new List<RecEmpresa>();
        public required RecEmpresa? Empresa { get; set; }
        public List<CompraOrden> CompraOrden { get; set; } = new List<CompraOrden>();
        public List<RecContactoBanco> ContactoBancoRel { get; set; } = new List<RecContactoBanco>();

    }
}