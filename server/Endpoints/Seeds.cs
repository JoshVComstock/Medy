using server.Data;
using server.Utils;
using Bytescout.Spreadsheet;
using server.Models;

namespace server.Endpoints
{
    public class LibroAsientoSeedDTO
    {
        public required int AnioInicio { get; set; }
        public required int AnioFinal { get; set; }
        public required int FilasAsiento { get; set; }
        public required int FilasDetalle { get; set; }
    }
    public static class Seeds
    {
        public static void SeedsEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Seeds";
            string baseUrl = "/seeds";

            //app.MapPatch(baseUrl + "/llenarCuentas", async (DBContext db) =>
            //{
              
            //}).WithTags(tag);

            app.MapPatch(baseUrl + "/llenarLibrosAsientoDetalles", (DBContext db, LibroAsientoSeedDTO body) =>
            {
                if (body.AnioInicio > body.AnioFinal)
                {
                    return res.BadRequestResponse("El año inicial debe ser menor al año final");
                }
                if (body.FilasDetalle < 3)
                {
                    return res.BadRequestResponse("Filas detalle debe ser mayor a 3");
                }
                db.LoadContableAsientoLibro(body.AnioInicio, body.AnioFinal, body.FilasAsiento, body.FilasDetalle);
                return res.SuccessResponse("Datos añadidos", "");

            }).WithTags(tag);
        }
    }
}
