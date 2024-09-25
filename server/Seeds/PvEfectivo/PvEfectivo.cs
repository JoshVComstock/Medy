using server.Models;

namespace server.Seeds
{
        public static class Seeds_ERP_PvEfectivo
        {
                public static PvEfectivo[] PvEfectivoData = new PvEfectivo[]{

  new PvEfectivo {
        Descripcion = "BILLETE DE 200 BOLIVIANOS",
        Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
        Valor = 200,
        IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
    },
    new PvEfectivo {
            Descripcion = "BILLETE DE 100 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 100,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "BILLETE DE 50 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 50,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "BILLETE DE 20 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 20,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "BILLETE DE 10 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 10,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "MONEDA DE 5 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 5,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "MONEDA DE 2 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 2,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "MONEDA DE 1 BOLIVIANO",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 1,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "MONEDA DE 0.50 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 0.5,
            IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "MONEDA DE 0.20 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 0.2,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        },
    new PvEfectivo {
            Descripcion = "MONEDA DE 0.10 BOLIVIANOS",
            Moneda = Seeds_ERP_RecMoneda.MonedaData[0],
            Valor = 0.1,
                    IdMoneda = Seeds_ERP_RecMoneda.MonedaData[0].Id
        }

    };



                public static List<PvEfectivo> List = new List<PvEfectivo>(PvEfectivoData);
        }
}