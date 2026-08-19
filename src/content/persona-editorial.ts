export interface PersonaEditorial {
  standfirst: string;
  scene: string[];
  perspective: string;
  quote: string;
  givesUp: string;
  protects: string;
  hobbies: string[];
  related: readonly { label: string; title: string; description: string; href: string }[];
}

export const personaEditorial: Record<string, PersonaEditorial> = {
  juan: {
    standfirst: "Juan no busca independizarse de la red durante semanas. Quiere salir el viernes con su perro, montar poco y volver el domingo sin haber cargado media casa.",
    scene: [
      "Sus viajes suelen empezar cuando termina la semana. Mete en el coche una tienda o un equipo ligero, la nevera portátil, algo de comida y lo necesario para pasar dos noches fuera. Si queda sitio, añade la cámara o el kayak. Si no queda, empieza a descartar.",
      "Esa forma de viajar convierte cada kilo en una decisión. Una batería enorme puede ofrecerle mucha autonomía, pero también ocupar el espacio del perro, resultar incómoda de mover y encarecer una escapada que pretendía ser sencilla.",
    ],
    perspective: "Para Juan, una buena power station cubre luces, móviles, nevera y algún uso puntual del portátil sin obligarle a comprar capacidad para un viaje que no hace. Valora una pantalla clara, pocos pasos y un precio coherente con el uso de fin de semana.",
    quote: "Para dos noches prefiero llevar lo justo y dejar sitio para el perro.",
    givesUp: "Capacidad sobrante y funciones avanzadas",
    protects: "Peso, precio y sencillez",
    hobbies: ["Camping con su perro", "Kayak recreativo", "Rutas costeras", "Fotografía casual"],
    related: [
      { label: "Guía de capacidad", title: "Cómo calcular cuántos Wh necesitas", description: "Un cálculo basado en tus aparatos y las horas reales de uso.", href: "/guias/cuantos-wh-necesito" },
      { label: "Conceptos básicos", title: "Diferencia entre W y Wh", description: "Potencia y autonomía explicadas sin convertirlas en lo mismo.", href: "/guias/diferencia-w-w-h" },
    ],
  },
  laura: {
    standfirst: "Laura mira una power station como mira el resto del viaje familiar: pensando en lo que necesitarán todos, no sólo en un aparato aislado.",
    scene: [
      "En una caravana familiar los consumos pequeños se acumulan. Hay móviles, luces, tablets, una nevera que no puede detenerse y rutinas que siguen existiendo aunque el viaje ocurra lejos de casa. Laura organiza ese conjunto y piensa más allá de la primera noche.",
      "No necesita memorizar cada dato técnico, pero sí saber qué consecuencia tendrá. Una carga lenta puede dejar la batería a medias antes de la siguiente parada; poca potencia puede impedir usar dos equipos cotidianos; una reserva demasiado justa añade decisiones a cada día.",
    ],
    perspective: "Su criterio combina autonomía, potencia simultánea y fiabilidad. Acepta algo más de peso si a cambio toda la familia puede viajar varios días con tranquilidad, pero no paga por una cifra que no se traduzca en comodidad real.",
    quote: "No quiero elegir entre mantener la nevera o cargar los dispositivos.",
    givesUp: "Portabilidad extrema",
    protects: "Autonomía y tranquilidad familiar",
    hobbies: ["Planificar rutas familiares", "Cocinar en el camping", "Paseos para todas las edades", "Juegos de mesa"],
    related: [
      { label: "Guía para familias", title: "Qué power station necesita una caravana", description: "Cómo reunir consumos familiares sin sobredimensionar por miedo.", href: "/guias/power-station-para-caravana" },
      { label: "Consumo continuo", title: "Cuánto gasta una nevera", description: "El consumo que más condiciona una noche fuera de la red.", href: "/guias/consumo-nevera" },
    ],
  },
  alex: {
    standfirst: "Álex lleva la oficina en la camper. Para él, quedarse sin energía no sólo interrumpe el viaje: también interrumpe una jornada de trabajo.",
    scene: [
      "A sus 38 años trabaja como informático mientras viaja con su pareja. Portátil, router o Starlink, monitor y discos externos forman un escritorio pequeño, pero constante. La cámara y el dron se suman cuando termina el horario laboral.",
      "Por eso no se queda en la capacidad nominal. Observa la salida USB-C, las pérdidas de conversión, la velocidad de recarga y cuánta energía puede recuperar entre una reunión y la siguiente. Prefiere eliminar adaptadores antes que acumular enchufes.",
    ],
    perspective: "Una power station le encaja cuando puede sostener horas reales de trabajo, recargarse rápido y simplificar el cableado. Entiende las especificaciones y las utiliza, pero siempre acaba traduciéndolas a tiempo de pantalla y continuidad de conexión.",
    quote: "Con el portátil y Starlink necesito saber cuántas horas reales tengo, no sólo los Wh de la caja.",
    givesUp: "Simplicidad absoluta",
    protects: "Carga rápida, USB-C y eficiencia",
    hobbies: ["Informática", "Cómics", "Fotografía y vídeo", "Dron", "Optimizar su oficina móvil"],
    related: [
      { label: "Trabajo remoto", title: "Cuánto consume trabajar desde una camper", description: "Portátil, conectividad y periféricos convertidos en horas de autonomía.", href: "/guias/consumo-trabajar-desde-camper" },
      { label: "Conectividad", title: "Cuánto consume Starlink", description: "Qué cambia en tu batería cuando la conexión permanece encendida.", href: "/guias/consumo-starlink" },
    ],
  },
  sergio: {
    standfirst: "Sergio no da una cifra por buena porque aparezca impresa en una caja. Quiere saber en qué condiciones se midió y cuánto queda cuando el uso deja de ser ideal.",
    scene: [
      "Tiene 46 años y trabaja como técnico de mantenimiento industrial. En sus salidas off-grid conviven herramientas, paneles, bombas y equipos de campo. Está acostumbrado a observar conexiones, temperatura, materiales y comportamiento sostenido.",
      "Cuando una marca habla de potencia, Sergio pregunta cuánto tiempo puede mantenerla. Cuando promete carga solar, mira el límite de entrada, el regulador y lo que ocurre con orientación o clima imperfectos. Su escepticismo no es una pose: evita que una especificación sustituya a un resultado.",
    ],
    perspective: "Prioriza rendimiento medible, potencia sostenida, solar útil, expansión y construcción. Puede aceptar más peso o precio si el equipo responde en condiciones exigentes y resulta reparable o ampliable.",
    quote: "Los vatios impresos importan menos que los que puede sostener.",
    givesUp: "Comodidad superficial",
    protects: "Rendimiento real y construcción",
    hobbies: ["Bricolaje y reparación", "Configuraciones solares", "Rutas off-grid", "Herramientas", "Registrar mediciones"],
    related: [
      { label: "Energía solar", title: "Cómo funciona la carga solar", description: "Entrada, regulador y condiciones reales lejos de la cifra ideal.", href: "/guias/carga-solar-power-station" },
      { label: "Rendimiento", title: "Potencia pico y potencia sostenida", description: "La diferencia que decide si un equipo arranca y continúa funcionando.", href: "/guias/potencia-pico-y-sostenida" },
    ],
  },
  carmen: {
    standfirst: "Carmen viaja durante largas temporadas con su hijo. La energía le interesa por una razón muy sencilla: quiere confiar en ella y dedicar la atención al camino.",
    scene: [
      "En una ruta larga la batería deja de ser un accesorio ocasional. Mantiene la nevera, las luces, los móviles y pequeños hábitos como preparar café. Carmen no quiere recalcular cada uso ni aprender una interfaz distinta cada mañana.",
      "La experiencia viajando le ha enseñado a valorar lo previsible. Prefiere una indicación clara, una garantía comprensible y un equipo que pueda mover y utilizar sin ceremonia. La tecnología funciona mejor cuando desaparece de la conversación.",
    ],
    perspective: "Fiabilidad y autonomía pesan lo mismo en su decisión. Después llegan facilidad de uso y garantía. Puede renunciar a controles avanzados o a la máxima potencia si el conjunto resulta estable durante semanas de viaje.",
    quote: "Si tengo que vigilarla todo el día, no me está haciendo el viaje más fácil.",
    givesUp: "Funciones y controles avanzados",
    protects: "Fiabilidad, autonomía y facilidad",
    hobbies: ["Rutas de montaña con su hijo", "Mapas y cuadernos de viaje", "Mercados y pueblos", "Lectura", "Café sin prisas"],
    related: [
      { label: "Uso cotidiano", title: "Elegir una power station fácil de usar", description: "Pantalla, conexiones y controles que no exigen atención constante.", href: "/guias/power-station-facil-de-usar" },
      { label: "Autonomía", title: "De la etiqueta a las horas reales", description: "Cómo estimar una reserva útil sin vivir pendiente de una fórmula.", href: "/guias/calcular-autonomia" },
    ],
  },
};
