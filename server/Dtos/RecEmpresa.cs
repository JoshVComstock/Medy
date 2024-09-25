namespace server.Dtos
{
    public class RecEmpresaDTO 
    {
        public required int IdContacto { get; set; }
        public required int IdMoneda { get; set; }
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
}
