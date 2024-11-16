import {
  Database,
  Dna,
  FlaskConical,
  ListChecks,
  Microscope,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TiposPesquisas = () => {
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

  const InfoCard = ({
    icon: Icon,
    title,
    description,
    features = [],
    index,
  }: any) => {
    const [ref, isVisible] = useScrollAnimation();

    return (
      <div
        ref={ref as React.MutableRefObject<HTMLDivElement | null>}
        className={`relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-700 
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 opacity-20" />

        <div className="relative">
          <div className="mb-4 inline-flex rounded-full bg-blue-50 p-3">
            <Icon className="h-6 w-6 text-primary-500" />
          </div>

          <h3 className="mb-4 text-xl font-semibold text-gray-800">{title}</h3>

          <p className="mb-6 text-gray-600">{description}</p>

          {features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <ListChecks className="mr-2 h-4 w-4 text-blue-400" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  const tipos = [
    {
      icon: FlaskConical,
      title: "Pesquisa Básica",
      description:
        "Incluye pruebas fundamentales recomendadas internacionalmente para la detección temprana.",
      features: [
        "Hipotiroidismo congénito",
        "Fenilcetonuria",
        "Fibrosis quística",
        "Pruebas de audiometría básica",
      ],
    },
    {
      icon: Microscope,
      title: "Pesquisa Ampliada",
      description:
        "Conjunto extendido de pruebas que incluye condiciones adicionales importantes.",
      features: [
        "Galactosemia",
        "Hiperplasia suprarrenal",
        "Deficiencia de biotinidasa",
        "Análisis cromosómico básico",
      ],
    },
    {
      icon: Dna,
      title: "Pesquisa Extendida",
      description:
        "Análisis completo utilizando tecnología de espectrometría de masas en tándem.",
      features: [
        "Más de 50 enfermedades metabólicas",
        "Trastornos endócrinos",
        "Análisis genético avanzado",
        "Pruebas moleculares especializadas",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white from-white to-gray-50 py-20">
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-blue-50 opacity-20 blur-3xl" />
      <div className="absolute right-0 top-3/4 h-64 w-64 rounded-full bg-purple-50 opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary-600 px-4 py-2">
            <Database className="mr-2 inline h-5 w-5 text-primary-900" />
            <span className="text-sm font-medium text-primary-500">
              Tipos de Análisis
            </span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Tipos de Pesquisas Neonatales
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Conoce los diferentes niveles de análisis disponibles para asegurar
            la salud de los recién nacidos.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tipos.map((tipo, index) => (
            <InfoCard key={index} {...tipo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiposPesquisas;
