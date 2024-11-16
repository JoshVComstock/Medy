import { Heart, Baby, Hospital, Brain, Clock, ChartBar } from "lucide-react";

const BenefitsSection = () => { 
  const benefitItems = [
    {
      title: "Beneficios para el Bebé y la Familia",
      icon: <Baby className="w-12 h-12 text-primary-500" />,
      items: [
        {
          icon: <Heart size={20} className="text-gray-400" />,
          text: "Detección temprana de enfermedades tratables",
        },
        {
          icon: <Brain size={20} className="text-gray-400" />,
          text: "Prevención de complicaciones graves",
        },
        {
          icon: <Clock size={20} className="text-gray-400" />,
          text: "Mejor pronóstico y calidad de vida",
        },
        {
          icon: <ChartBar size={20} className="text-gray-400" />,
          text: "Reducción del impacto emocional y económico familiar",
        },
        {
          icon: <Hospital size={20} className="text-gray-400" />,
          text: "Acceso a tratamiento oportuno",
        },
      ],
    },
    {
      title: "Impacto en la Salud Pública",
      icon: <Hospital className="w-12 h-12 text-primary-500" />,
      items: [
        {
          icon: <Heart size={20} className="text-gray-400" />,
          text: "Reducción de la mortalidad infantil",
        },
        {
          icon: <ChartBar size={20} className="text-gray-400" />,
          text: "Disminución de costos en atención médica",
        },
        {
          icon: <Brain size={20} className="text-gray-400" />,
          text: "Mejora en planificación de recursos",
        },
        {
          icon: <Clock size={20} className="text-gray-400" />,
          text: "Desarrollo de políticas más efectivas",
        },
        {
          icon: <Hospital size={20} className="text-gray-400" />,
          text: "Avance en la investigación médica",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white from-white to-gray-50">
      <style>
        {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
  
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
  
            .benefit-card {
              animation: slideIn 0.6s ease-out forwards;
              opacity: 0;
            }
  
            .benefit-card:nth-child(2) {
              animation-delay: 0.2s;
            }
  
            .floating-icon {
              animation: float 3s ease-in-out infinite;
            }
  
            .item-appear {
              opacity: 0;
              transform: translateX(-20px);
              animation: appearFromLeft 0.5s ease-out forwards;
            }
  
            @keyframes appearFromLeft {
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
      </style>

      <div className="text-center mb-16">
        <div className="floating-icon inline-block mb-4">
          <Baby className="w-16 h-16 text-primary-500" />
        </div>
        <h2 className="text-4xl font-bold text-gray-400 mb-4">
          Importancia y Beneficios
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre cómo nuestro programa de tamizaje neonatal mejora la vida de
          los bebés y sus familias
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {benefitItems.map((section, idx) => (
          <div
            key={idx}
            className="benefit-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="floating-icon">{section.icon}</div>
                <h3 className="text-xl font-semibold text-primary-500">
                  {section.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mb-4 item-appear"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-gray-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
