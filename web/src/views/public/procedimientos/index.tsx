import { useEffect, useRef, useState } from "react";
import {
  Baby,
  Hospital,
  TestTube,
  Microscope,
  ClipboardCheck,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const ProcedimientoPesquisas = () => {
  const useScrollAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }, []);

    return [elementRef, isVisible];
  };

  const procedures: {
    icon: any;
    title: String;
    description: String;
    details: string[];
    alert: String;
  }[] = [
    {
      icon: Baby,
      title: "Momento Óptimo",
      description:
        "Se realiza entre las 48-72 horas de vida del recién nacido, antes del alta hospitalaria.",
      details: [
        "Período ideal para detectar alteraciones",
        "Evita falsos positivos o negativos",
        "Coordinación con el alta médica",
      ],
      alert: "Es crucial respetar este tiempo para resultados precisos",
    },
    {
      icon: TestTube,
      title: "Toma de Muestra",
      description:
        "Extracción de gotas de sangre del talón del bebé que se colocan en papel filtro especial.",
      details: [
        "Procedimiento mínimamente invasivo",
        "Personal especializado capacitado",
        "Material estéril y específico",
      ],
      alert: "Proceso rápido y seguro para el bebé",
    },
    {
      icon: Microscope,
      title: "Análisis Laboratorial",
      description:
        "Las muestras son procesadas en laboratorios especializados con tecnología avanzada.",
      details: [
        "Espectrometría de masas",
        "Control de calidad riguroso",
        "Validación por expertos",
      ],
      alert: "Tecnología de última generación",
    },
    {
      icon: ClipboardCheck,
      title: "Resultados y Seguimiento",
      description:
        "Se informan en 7-14 días. Casos positivos son contactados inmediatamente para seguimiento.",
      details: [
        "Notificación inmediata si urgente",
        "Seguimiento personalizado",
        "Asesoramiento familiar",
      ],
      alert: "Comunicación continua y apoyo",
    },
  ];

  const ProcedureCard = ({
    icon: Icon,
    title,
    description,
    details,
    alert,
    index,
  }: any) => {
    const [ref, isVisible] = useScrollAnimation() as [
      React.MutableRefObject<HTMLDivElement | null>,
      boolean
    ];

    return (
      <div
        ref={ref as React.MutableRefObject<HTMLDivElement | null>}
        className={`group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-700
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-teal-50 to-blue-50  opacity-20 transition-transform duration-500 group-hover:scale-150" />

        <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
          {index + 1}
        </div>

        <div className="relative ">
          <div className="mb-4 flex items-center">
            <div className="mr-3 rounded-full bg-teal-50 p-3">
              <Icon className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>

          <p className="mb-4 text-gray-600">{description}</p>

          <ul className="mb-4 space-y-2">
            {details.map((detail: string, idx: number) => (
              <li key={idx} className="flex items-center text-gray-600">
                <ArrowRight className="mr-2 h-4 w-4 text-teal-400" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start rounded-lg bg-teal-50 p-3 text-sm text-teal-700">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>{alert}</p>
          </div>
        </div>
        {index < procedures.length - 1 && (
          <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-teal-200 md:block" />
        )}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-white from-white  to-teal-50 py-20">
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-teal-50 opacity-20 blur-3xl" />
      <div className="absolute right-0 top-3/4 h-64 w-64 rounded-full bg-blue-50 opacity-20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-2">
            <Hospital className="mr-2 inline h-5 w-5 text-teal-500" />
            <span className="text-sm font-medium text-teal-700">
              Proceso Médico
            </span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Procedimiento de las Pesquisas
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Conoce el proceso paso a paso de las pesquisas neonatales, diseñado
            para asegurar la detección temprana de condiciones tratables.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {procedures.map((procedure, index) => (
            <ProcedureCard key={index} {...procedure} index={index} />
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Información Importante
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start rounded-lg bg-gray-50 p-4">
              <CheckCircle2 className="mr-3 h-6 w-6 text-teal-500" />
              <div>
                <h4 className="mb-2 font-medium text-gray-800">
                  Contacto para Consultas
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" /> Teléfono: 0800-999-9999
                  </p>
                  <p className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" /> Email:
                    consultas@pesquisas.org
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start rounded-lg bg-gray-50 p-4">
              <AlertCircle className="mr-3 h-6 w-6 text-teal-500" />
              <div>
                <h4 className="mb-2 font-medium text-gray-800">
                  Recordatorios
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Traer documento de identidad</li>
                  <li>• Respetar el ayuno indicado</li>
                  <li>• Programar la visita con anticipación</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcedimientoPesquisas;
