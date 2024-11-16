import {
  Clock,
  HelpCircle,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { alertSuccess } from "@/utils/alertsToast";
import imagenContact from "@/assets/images/imagenContact.png"
const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alertSuccess("Mensaje enviado con éxito!");
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden bg-white from-white to-teal-50 py-12">
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-teal-50 opacity-20 blur-3xl" />
      <div className="absolute right-0 top-3/4 h-64 w-64 rounded-full bg-blue-50 opacity-20 blur-3xl" />

      <style>
        {`
          .input-focus {
            transition: all 0.3s ease;
          }

          .input-focus:focus {
            transform: scale(1.01);
          }

          .form-appear {
            animation: formAppear 0.6s ease-out forwards;
          }

          .image-appear {
            animation: imageAppear 0.8s ease-out forwards;
          }

          @keyframes formAppear {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes imageAppear {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .loading-spin {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="form-appear">
            <div className="mb-8">
              <div className="mb-3 inline-block rounded-full bg-teal-100 p-3">
                <MessageSquare className="h-6 w-6 text-teal-500" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                Contacto para Consultas
              </h2>
              <p className="text-gray-600">
                Estamos aquí para responder todas tus dudas sobre el tamizaje
                neonatal
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <User className="h-5 w-5 text-teal-500" />
                    <span>Nombre</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm outline-none input-focus focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder="Tu nombre"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Mail className="h-5 w-5 text-teal-500" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm outline-none input-focus focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder="tu@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <HelpCircle className="h-5 w-5 text-teal-500" />
                  <span>Tipo de Consulta</span>
                </label>
                <select
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm outline-none input-focus focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  value={formState.type}
                  onChange={(e) =>
                    setFormState({ ...formState, type: e.target.value })
                  }
                >
                  <option value="general">Información General</option>
                  <option value="medical">Consulta Médica</option>
                  <option value="results">Resultados</option>
                  <option value="other">Otros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <MessageSquare className="h-5 w-5 text-teal-500" />
                  <span>Mensaje</span>
                </label>
                <textarea
                  className="h-32 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm outline-none input-focus focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  placeholder="Escribe tu consulta aquí..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-lg bg-teal-500 p-3 text-sm font-medium text-white transition-all hover:bg-teal-600"
              >
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <span className="loading-spin">◌</span>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Enviar Consulta</span>
                    </>
                  )}
                </div>
              </button>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Clock className="h-5 w-5 text-teal-500" />
                <span>Responderemos tu consulta en menos de 24 horas</span>
              </div>
            </form>
          </div>
          <div className="image-appear hidden lg:block">
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-64 w-64 rounded-full bg-teal-50 opacity-50" />
              <div className="absolute -right-6 -bottom-6 h-64 w-64 rounded-full bg-blue-50 opacity-50" />

              <div className="relative rounded-2xl bg-white p-6 shadow-lg">
                <img
                  src={imagenContact}
                  alt="Contact Support"
                  className="rounded-lg object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-teal-500/90 to-transparent p-6">
                  <div className="space-y-2 text-white">
                    <h3 className="text-lg font-semibold">¿Necesitas ayuda?</h3>
                    <p className="text-sm opacity-90">
                      Nuestro equipo de expertos está listo para asistirte en
                      cada paso del proceso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
