export interface PersonaStorySection {
  heading: string;
  paragraphs: string[];
  image?: { src: string; alt: string; caption: string };
  link?: { href: string; label: string };
}

export interface PersonaStory {
  title: string;
  dek: string;
  readingTime: string;
  sections: PersonaStorySection[];
}

export const personaStories: Partial<Record<string, PersonaStory>> = {
  juan: {
    title: "Lo que necesito para desaparecer un fin de semana —y lo que prefiero dejar en casa",
    dek: "Los viernes sólo quiero meter lo necesario en el coche, dejar sitio a mi pastor alemán y perderme hasta el domingo. Si una batería viene conmigo, tiene que ganarse el espacio que ocupa.",
    readingTime: "7 min de lectura",
    sections: [
      {
        heading: "Mi viaje empieza haciendo hueco",
        paragraphs: [
          "Casi siempre salgo el viernes después de trabajar. No preparo una expedición ni hago una lista durante una semana. Miro el tiempo, busco un camping o una zona en la que podamos caminar y empiezo a meter cosas en el coche. Digo “podamos” porque el primero en estar listo es el perro. En cuanto ve la mochila y la gorra, ya sabe que nos vamos. También sabe colocarse al lado del maletero de una forma que parece casual, pero que en realidad significa: acuérdate de que la mitad de este espacio es mío.",
          "Ese momento explica bastante bien cómo elijo el equipo. Tengo un coche normal, una tienda, una nevera portátil, una cámara y lo básico para dos noches. No me interesa demostrar que puedo vivir un mes fuera de la red. Quiero llegar con luz, mantener algo de comida fría, cargar el móvil y volver el domingo sin haber pasado más tiempo ordenando cables que caminando. Todo lo que entra tiene que justificar el espacio. Una power station también.",
        ],
        image: { src: "/images/home/personas/Juan-camping-coche.png", alt: "Juan prepara el maletero para una escapada de camping mientras su pastor alemán espera junto al equipo", caption: "Viernes por la tarde: primero entra el perro; después empieza el tetris." },
      },
      {
        heading: "No compro autonomía para un viaje que no hago",
        paragraphs: [
          "La primera vez que empecé a mirar baterías portátiles pensé como mucha gente: si una tiene más capacidad, será mejor. La idea dura hasta que ves el precio, el tamaño y lo que pesa de verdad cuando tienes que sacarla del coche. Una batería enorme puede ser fantástica para una familia, para trabajar toda la semana o para alimentar herramientas. Para mí puede ser simplemente un bloque caro que he movido dos veces para usar una pequeña parte de su carga.",
          "Mis escapadas suelen durar entre una tarde y dos noches. Eso cambia la pregunta. En lugar de pensar cuánta energía puedo comprar, intento calcular cuánta voy a usar. La nevera es el consumo que más me importa porque trabaja durante horas. Después vienen las luces, el móvil y quizá la cámara. El portátil sólo aparece alguna vez. Cuando sumo eso con un margen razonable, la cifra suele ser bastante menos espectacular que la que imaginaba al principio.",
        ],
        link: { href: "/guias/cuantos-wh-necesito", label: "Cómo calcular cuántos Wh necesitas sin comprar de más" },
      },
      {
        heading: "Los vatios me importan cuando algo no arranca",
        paragraphs: [
          "No soy la persona del grupo que disfruta comparando especificaciones durante una hora. Si Sergio empieza a hablar de pérdidas y curvas de rendimiento, le escucho porque sabe de qué habla, pero luego necesito traducirlo. Para mí los vatios responden a una pregunta sencilla: ¿puedo conectar lo que llevo sin que la batería se apague? Los Wh responden a otra: ¿durante cuánto tiempo? Mezclarlas fue una de las primeras cosas que me hizo mirar productos equivocados.",
          "En mi caso no llevo aparatos especialmente potentes. Aun así, quiero margen para que la nevera arranque mientras hay una luz encendida o estoy cargando algo. No necesito una cifra gigantesca; necesito no estar haciendo turnos absurdos entre enchufes. Por eso una ficha técnica sólo empieza a tener sentido cuando la confronto con mi bolsa real de cables. Si el producto cubre ese uso con tranquilidad, el número más grande deja de impresionarme.",
        ],
        link: { href: "/guias/diferencia-w-w-h", label: "Entender la diferencia entre W y Wh" },
        image: { src: "/images/home/personas/Juan-playa.png", alt: "Juan y su pastor alemán descansan juntos en la playa junto a un kayak", caption: "Hay fines de semana de tienda y otros en los que el kayak se queda con casi todo el espacio." },
      },
      {
        heading: "La nevera manda más de lo que parece",
        paragraphs: [
          "Mi nevera portátil no impresiona a nadie, pero es el aparato que decide gran parte de la autonomía. Una luz puede apagarse. El móvil puede esperar. La nevera sigue conectada mientras duermo, camino o estoy en el agua. Al principio cometía el error de mirar sólo los vatios que aparecían en la etiqueta y multiplicarlos por todas las horas. Después entendí que el compresor no funciona siempre igual y que la temperatura exterior, lo llena que esté y las veces que la abra cambian el resultado.",
          "No pretendo medir cada salida como si fuera un laboratorio. Sí me sirve apuntar cómo llego al domingo. Si vuelvo con media batería, quizá llevaba demasiada. Si empiezo a apagar cosas el sábado por la tarde, necesito revisar el cálculo o mis hábitos. Esa observación sencilla me da más información que comprar por miedo. También me recuerda que enfriar la nevera en casa y no dejarla abierta cada cinco minutos cuesta cero euros y ahorra bastante energía.",
        ],
        link: { href: "/guias/consumo-nevera", label: "Cuánto consume realmente una nevera portátil" },
      },
      {
        heading: "Por la noche quiero una pantalla clara, no un panel de control",
        paragraphs: [
          "Cuando oscurece es cuando agradezco haber llevado una batería. Conecto una luz pequeña, dejo cargando el móvil y compruebo la nevera. No quiero abrir una aplicación, crear una cuenta ni buscar en un menú qué salida está activa. Quiero ver el porcentaje, saber aproximadamente lo que estoy consumiendo y apagar lo que no use. Puede parecer una exigencia menor, pero una interfaz confusa se vuelve más molesta con frío, poca luz y un perro que ha decidido acostarse justo encima del cable que buscas.",
          "También valoro el ruido. En un camping silencioso cualquier ventilador parece más fuerte. Entiendo que una power station tenga que refrigerarse cuando trabaja, pero para mis consumos normales espero que no esté bufando toda la noche. La calidad de uso aparece en esas cosas pequeñas: una pantalla que no ilumina media tienda, botones que se entienden y enchufes colocados donde el cable no queda doblado contra el suelo.",
        ],
        image: { src: "/images/home/personas/Juan-camping-noche.png", alt: "Juan comprueba una power station pequeña junto a su tienda y su pastor alemán al anochecer", caption: "Luz, móvil y nevera. Si el montaje necesita mucho más, para mí ya ha dejado de ser sencillo." },
      },
      {
        heading: "El peso se nota dos veces",
        paragraphs: [
          "Una batería pesa cuando la metes en el coche y vuelve a pesar cuando la sacas. Si el terreno está lejos del aparcamiento, pesa una tercera vez. Es fácil olvidar esa parte mientras comparas capacidades sentado en casa. Yo prefiero un equipo que pueda coger con una mano sin pensarlo demasiado. No porque vaya a caminar kilómetros con él, sino porque la comodidad hace que realmente lo use. Si moverlo da pereza, acaba quedándose en el maletero aunque el enchufe haga falta cerca de la tienda.",
          "Con el precio ocurre algo parecido. No busco lo más barato a cualquier coste: una batería tiene que ser segura, estar bien construida y ofrecer una garantía comprensible. Pero tampoco quiero pagar por salidas, expansiones o potencias que no encajan con mi viaje. Mi equilibrio está en una unidad compacta que cubra el fin de semana con margen. Prefiero gastar el resto en más escapadas, una ruta nueva o comida decente para el sábado.",
        ],
      },
      {
        heading: "Mi forma de saber si he elegido bien",
        paragraphs: [
          "Una power station me encaja cuando dejo de pensar en ella. Sale del coche sin esfuerzo, conecto la nevera, enciendo una luz al caer la tarde y el domingo todavía tengo margen. No necesito volver con el cien por cien ni demostrar cuántos aparatos puedo enchufar a la vez. Necesito que el viaje ocurra sin una conversación constante sobre batería. Si además puedo recuperar algo de carga durante el día sin montar un campamento solar enorme, mejor, pero no es el centro de todas mis salidas.",
          "Por eso mi opinión puede ser distinta a la de Laura, Álex, Sergio o Carmen. Una estación que a mí me parece excesiva puede dar a una familia la tranquilidad que necesita. Una que yo movería encantado puede quedarse corta para trabajar con Starlink o pasar semanas en una autocaravana. No hay contradicción. Yo no busco la mejor batería de la mesa. Busco la que cabe al lado del perro, cubre dos noches y me permite salir el viernes sin convertir la preparación en otro trabajo.",
        ],
      },
    ],
  },
};
