using server.Models;

namespace server.Responses
{
    public class RecEmpresaRes : BaseRes
    {
        public required int Id { get; set; }
        public required RecContactoRes Contacto { get; set; }
        public int? IdContactos { get; set; }
        public int? IdMoneda { get; set; }
        public required RecMonedaRes Moneda { get; set; }
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
    }
    public class MonedaRelacion
    {
        public required int Id { get; set; }
        public required string Codigo { get; set; }
        public required string Simbolo { get; set; }
        public required string Nombre { get; set; }
        public required int Decimales { get; set; }
        public required string UnidadMonetaria { get; set; }
        public required string SubUnidadMonetaria { get; set; }
        public required int Redondeo { get; set; }
    }
      public class RecEmpresaInfoRes 
    {
        public required string Nombre { get; set; }
        public required string Email { get; set; }
        public required string TelefonoFijo { get; set; }
        public required string TelefonoMovil { get; set; }
        public required string CodigoQR { get; set; }
    }
}
