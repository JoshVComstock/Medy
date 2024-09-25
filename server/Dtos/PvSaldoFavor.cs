namespace server.Dtos
{
    public class PvSaldoFavorDTO
    {
        public required string Descripcion { get; set; }
        public required double TotalFavor { get; set; }
        public required int IdVenta { get; set; }
    }
}
