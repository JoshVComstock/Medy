import { Award, Baby, BookOpen, Brain, Clock, Footprints, Heart, Stethoscope } from "lucide-react";

export const informacionPesquisas = [
    {
      id: 1,
      titulo: "¿Qué es el Tamizaje Neonatal?",
      descripcionCorta:
        "Examen preventivo esencial para todos los recién nacidos",
      icono: Baby,
      categoria: "Información General",
      estadistica: "Detecta más de 50 enfermedades congénitas",
      contenidoCompleto: {
        queEs:
          "El tamizaje neonatal es un conjunto de pruebas que se realizan al recién nacido para detectar enfermedades graves que no son perceptibles al nacimiento.",
        importancia:
          "Permite identificar y tratar condiciones antes de que causen problemas serios de salud.",
        cuando:
          "Se realiza idealmente entre las 48 horas y los 5 días después del nacimiento.",
        datoCurioso:
          "El tamizaje neonatal comenzó en la década de 1960s con la detección de fenilcetonuria.",
        recomendaciones: [
          "Asegúrate de que tu bebé haya sido alimentado antes de la prueba",
          "Mantén todos los documentos del bebé a mano",
          "Pregunta cuándo y cómo recibirás los resultados",
        ],
        beneficios: [
          "Detección temprana de enfermedades",
          "Tratamiento oportuno",
          "Prevención de complicaciones",
          "Mejor calidad de vida",
        ],
      },
    },
    {
      id: 2,
      titulo: "Desarrollo Cerebral del Bebé",
      descripcionCorta: "Etapas cruciales del desarrollo neurológico",
      icono: Brain,
      categoria: "Desarrollo Infantil",
      estadistica: "90% del desarrollo cerebral ocurre antes de los 5 años",
      contenidoCompleto: {
        etapasClaves: [
          "Formación de conexiones neuronales básicas",
          "Desarrollo de los sentidos",
          "Establecimiento de patrones de sueño",
          "Desarrollo del lenguaje",
        ],
        estimulacion: [
          "Juegos interactivos",
          "Música y sonidos",
          "Contacto visual y físico",
          "Lectura temprana",
        ],
        datoCurioso:
          "El cerebro de un bebé forma 1 millón de conexiones neuronales por segundo",
        señalesDesarrollo: [
          "Seguimiento visual",
          "Respuesta a sonidos",
          "Sonrisa social",
          "Balbuceo",
        ],
      },
    },
    {
      id: 3,
      titulo: "Nutrición en los Primeros Meses",
      descripcionCorta: "Guía completa de alimentación temprana",
      icono: Heart,
      categoria: "Nutrición Infantil",
      estadistica:
        "La leche materna contiene más de 200 componentes beneficiosos",
      contenidoCompleto: {
        beneficiosLactancia: [
          "Fortalece el sistema inmunológico",
          "Promueve el desarrollo cerebral",
          "Previene alergias",
          "Favorece el vínculo madre-bebé",
        ],
        etapasAlimentacion: {
          "0-6 meses": "Lactancia materna exclusiva",
          "6-8 meses": "Introducción de alimentos sólidos",
          "8-12 meses": "Diversificación alimentaria",
        },
        datoCurioso:
          "La composición de la leche materna cambia según las necesidades del bebé",
        señalesHambre: [
          "Movimientos de búsqueda",
          "Succión de puños",
          "Inquietud",
          "Llanto (señal tardía)",
        ],
      },
    },
    {
      id: 4,
      titulo: "Hitos del Desarrollo",
      descripcionCorta: "Seguimiento del crecimiento y desarrollo",
      icono: Footprints,
      categoria: "Desarrollo Infantil",
      estadistica: "Cada bebé tiene su propio ritmo de desarrollo",
      contenidoCompleto: {
        primerAño: [
          "Sostén de cabeza (2-4 meses)",
          "Sentarse sin apoyo (6-8 meses)",
          "Gateo (7-10 meses)",
          "Primeros pasos (11-15 meses)",
        ],
        desarrolloSocial: [
          "Sonrisa social (6-8 semanas)",
          "Risa (3-4 meses)",
          "Reconocimiento de padres (4-7 meses)",
          "Juegos interactivos (7-12 meses)",
        ],
        datoCurioso:
          "Los bebés pueden reconocer la voz de su madre desde el útero",
        señalesAlerta: [
          "No responde a sonidos fuertes",
          "No sigue objetos con la mirada",
          "No balbucea",
          "No intenta alcanzar objetos",
        ],
      },
    },
    {
      id: 5,
      titulo: "Vacunación Importante",
      descripcionCorta: "Calendario y beneficios de la inmunización",
      icono: Stethoscope,
      categoria: "Prevención",
      estadistica: "Las vacunas previenen más de 20 enfermedades graves",
      contenidoCompleto: {
        esquemaBasico: [
          "BCG y Hepatitis B al nacer",
          "Pentavalente a los 2, 4 y 6 meses",
          "Triple viral al año",
          "Refuerzos preescolares",
        ],
        beneficios: [
          "Protección individual",
          "Inmunidad colectiva",
          "Prevención de epidemias",
          "Erradicación de enfermedades",
        ],
        datoCurioso:
          "La viruela fue la primera enfermedad erradicada por la vacunación",
        cuidadosPostVacuna: [
          "Vigilar temperatura",
          "Mantener el sitio de aplicación limpio",
          "Aplicar compresas si hay inflamación",
          "Completar esquemas en tiempo",
        ],
      },
    },
    {
      id: 6,
      titulo: "Sueño Seguro",
      descripcionCorta: "Guía para un descanso seguro y reparador",
      icono: Clock,
      categoria: "Cuidados Básicos",
      estadistica: "Los recién nacidos duermen entre 14-17 horas al día",
      contenidoCompleto: {
        recomendaciones: [
          "Dormir boca arriba",
          "Superficie firme y plana",
          "Sin objetos sueltos en la cuna",
          "Temperatura ambiente adecuada",
        ],
        patronesSueño: {
          "Recién nacido": "Ciclos de 2-4 horas",
          "1-3 meses": "Un período más largo nocturno",
          "4-6 meses": "Posible dormir toda la noche",
        },
        datoCurioso: "Los bebés pasan cerca del 50% de su sueño en fase REM",
        señalesSueño: [
          "Frotarse los ojos",
          "Bostezos",
          "Menor actividad",
          "Irritabilidad",
        ],
      },
    },
    {
      id: 7,
      titulo: "Estimulación Temprana",
      descripcionCorta: "Actividades para potenciar el desarrollo",
      icono: BookOpen,
      categoria: "Desarrollo Infantil",
      estadistica: "La estimulación temprana mejora el desarrollo en un 40%",
      contenidoCompleto: {
        actividadesRecomendadas: [
          "Masajes suaves",
          "Ejercicios de seguimiento visual",
          "Canciones y rimas",
          "Juegos de texturas",
        ],
        beneficios: [
          "Mayor desarrollo cognitivo",
          "Mejor coordinación motora",
          "Fortalecimiento del vínculo",
          "Desarrollo del lenguaje",
        ],
        datoCurioso: "La música clásica puede estimular el desarrollo cerebral",
        porEdades: {
          "0-3 meses": "Estimulación sensorial básica",
          "3-6 meses": "Ejercicios de agarre y coordinación",
          "6-12 meses": "Actividades de causa-efecto",
        },
      },
    },
    {
      id: 8,
      titulo: "Logros del Primer Año",
      descripcionCorta: "Celebrando cada paso del desarrollo",
      icono: Award,
      categoria: "Desarrollo Infantil",
      estadistica: "Más de 100 habilidades nuevas en el primer año",
      contenidoCompleto: {
        habilidadesMotoras: [
          "Control cefálico",
          "Rodamiento",
          "Gateo",
          "Primeros pasos",
        ],
        desarrolloCognitivo: [
          "Reconocimiento facial",
          "Permanencia del objeto",
          "Imitación simple",
          "Comprensión causa-efecto",
        ],
        datoCurioso:
          "Cada bebé aprende a caminar en promedio después de 2,000 horas de práctica",
        celebraciones: [
          "Primera sonrisa",
          "Primera palabra",
          "Primer diente",
          "Primeros pasos",
        ],
      },
    },
  ];