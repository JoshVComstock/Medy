import  { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, Baby, Activity,  } from "lucide-react";


const QueSon = () => {
  const features: {
    title: string;
    icon: any; 
    content: string[];
  }[] = [
    {
      title: "Definición y Alcance",
      icon: Baby,
      content: [
        "Las pesquisas neonatales son un conjunto de análisis que se realizan a todos los recién nacidos durante sus primeras horas de vida, generalmente entre las 48-72 horas después del nacimiento.",
        "Estas pruebas permiten detectar enfermedades congénitas que no presentan síntomas al momento del nacimiento pero que pueden causar problemas graves de salud si no son tratadas a tiempo.",
        "El objetivo principal es la identificación temprana de condiciones tratables para iniciar intervenciones oportunas que prevengan o minimicen complicaciones serias."
      ]
    },
    {
      title: "Importancia en la Salud Pública",
      icon: Heart,
      content: [
        "Las pesquisas neonatales constituyen una de las estrategias más efectivas en salud pública para:",
        "• Prevenir discapacidades intelectuales y físicas",
        "• Reducir la mortalidad infantil",
        "• Mejorar la calidad de vida de los afectados",
        "• Disminuir el impacto económico en las familias y el sistema de salud",
        "Se considera un programa exitoso de salud preventiva con alto impacto en la sociedad."
      ]
    }
  ];


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

  const DetailedInfoCard = ({ title, content, Icon }: { title: string; content: string[]; Icon: any }) => {
    const [ref, isVisible] = useScrollAnimation();

    return (
      <div
      ref={ref as React.MutableRefObject<HTMLDivElement | null>}
        className={`group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-700 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-20 transition-transform duration-500 group-hover:scale-150" />
        
        <div className="mb-6 flex items-center">
          <div className="mr-4 rounded-full bg-blue-50 p-3">
            <Icon className="h-6 w-6 text-primary-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        </div>

        <div className="space-y-4 text-gray-600">
          {content.map((text: string, index: number) => (
            <p key={index} className="flex items-start">
              {text.startsWith("•") ? (
                <>
                  <ArrowRight className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span>{text.substring(2)}</span>
                </>
              ) : (
                text
              )}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-white from-gray-50 to-white py-20">
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-100 opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2">
            <Activity className="mr-2 inline h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-primary-700">Salud Infantil</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            ¿Qué son las Pesquisas Neonatales?
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Descubre cómo estas pruebas esenciales protegen la salud de los recién nacidos
            y contribuyen a un futuro más saludable.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <DetailedInfoCard
              key={index}
              title={feature.title}
              content={feature.content}
              Icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default QueSon;