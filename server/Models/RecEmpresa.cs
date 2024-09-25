

namespace server.Models
{
    public class RecEmpresa : Base
    {
        public int? IdContacto { get; set; }
        public int? IdMoneda { get; set; }
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string EmpresaDetalles { get; set; }
        public required int Secuencia { get; set; }
        public required string Email { get; set; }
        public required string TelefonoFijo { get; set; }
        public required string TelefonoMovil { get; set; }
        public required string FuenteLetra { get; set; }
        public required string ColorPrimario { get; set; }
        public required string ColorSecundario { get; set; }
        public required string ColorBackground { get; set; }
        public required string PieInforme { get; set; }
        public required string CabeceraInforme { get; set; }
        public required string PathLogo { get; set; }
        public required int IdNomenclatura { get; set; }
        public required string CodigoQR { get; set; }
        public required RecContacto Contacto { get; set; }
        public required RecMoneda Moneda { get; set; }
        public List<RecContacto> RecContacto { get; set; } = new List<RecContacto>();
        public List<ProdTarifa> ProdTarifa { get; set; } = new List<ProdTarifa>();
        public List<PvConfig> PvConfig { get; set; } = new List<PvConfig>();
        public List<CompraOrden> CompraOrden { get; set; } = new List<CompraOrden>();
        public List<ProdProductoBase> ProdProductoBase { get; set; } = new List<ProdProductoBase>();
        public List<RecContactoBanco> RecContactoBanco { get; set; } = new List<RecContactoBanco>();
        // public List<RecUsuario> RecUsuario { get; set; } = new List<RecUsuario>();
        public List<VentaOrden> VentaOrden { get; set; } = new List<VentaOrden>();
     
    }
}
