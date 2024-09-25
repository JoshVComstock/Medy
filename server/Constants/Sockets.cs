namespace server.Constants
{
    public static class Sockets
    {
        public static class Types
        {
            public static string CONNECT { get; } = "connect";
            public static string COUNT { get; } = "count";
            public static string DISCONNECT { get; } = "disconnect";
            public static string MESSAGE { get; } = "message";
            public static string USERMODIFY { get; } = "userModify";
            public static string USERGROUP { get; } = "userGroup";
        }

        public static class Asiento
        {
            public static string LOCAL { get; } = "asientoLocal";
            public static string POST { get; } = "asientoPost";
            public static string PUT { get; } = "asientoPut";
            public static string DELETE { get; } = "asientoDelete";
        }
    }
}
