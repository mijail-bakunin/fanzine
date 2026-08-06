export const mockEdition = {
  id: 'n-001-la-grieta', number: 'Nº 12', publication: 'La Guillotina',
  navigation: [
    { label: 'Ediciones', to: '/archivo' }, { label: 'Quiénes somos', to: '/quienes-somos' },
    { label: 'Manifiesto', to: '/manifiesto' }, { label: 'Colaborar', to: '/colaborar' }, { label: 'Contacto', to: '/contacto' },
  ],
};

export const mockNotes = [
  { id:'cat', fragment:'cat', x:28,y:443,w:243,h:410,tone:'yellow', title:'Gato negro', subtitle:'Símbolos que no piden permiso', paragraphs:['La imagen abre una nota sobre los emblemas que viajan de pared en pared: no como marca, sino como gesto de reconocimiento y memoria compartida.'] },
  { id:'freedom', fragment:'freedom', x:282,y:456,w:350,h:542,tone:'red', title:'La libertad no se pide', subtitle:'Acción directa y apoyo mutuo', paragraphs:['La autonomía no llega desde una oficina. Esta nota recorre prácticas pequeñas, sostenidas y colectivas que nos permiten decidir sobre nuestras propias vidas.','Organizarse desde abajo significa construir poder sin reemplazar un mando por otro.'] },
  { id:'uprising', fragment:'uprising', x:520,y:446,w:227,h:557,tone:'cyan', title:'Cuerpos en la calle', subtitle:'La protesta como lenguaje', paragraphs:['Una presencia que ocupa espacio también produce relato. El cuerpo, la mirada y el puño levantado son archivo de una lucha que sigue abierta.'] },
  { id:'wall', fragment:'wall', x:748,y:451,w:289,h:555,tone:'lime', title:'Ni dios, ni patrón', subtitle:'Una consigna para discutir', paragraphs:['La frase no promete una salida individual: propone discutir cómo desarmar las jerarquías que estructuran el trabajo, el hogar y el Estado.'] },
  { id:'why', fragment:'why', x:28,y:867,w:222,h:484,tone:'yellow', title:'¿Por qué anarquismo?', subtitle:'Una introducción', paragraphs:['Porque pensar una vida sin dominación no es una fantasía abstracta: es mirar con atención lo que ya hacemos cuando cuidamos, compartimos y resistimos.'] },
  { id:'memory', fragment:'memory', x:262,y:1005,w:399,h:490,tone:'red', title:'Memoria y rebeldía', subtitle:'Las que estuvieron antes', paragraphs:['La memoria es una herramienta activa. Nombra a quienes faltan, conserva aprendizajes y evita que la historia oficial borre las experiencias de resistencia.'] },
  { id:'contents', fragment:'contents', x:693,y:1007,w:315,h:338,tone:'cyan', title:'En este número', subtitle:'Abrí cada tema desde la portada', paragraphs:['Represión, ecología, autogestión, internacionalismo y poesía: temas para leer en relación, no como noticias aisladas.'], editionLink:true },
  { id:'quote', fragment:'quote', x:680,y:1342,w:349,h:147,tone:'lime', title:'Construir desde las ruinas', subtitle:'Una invitación final', paragraphs:['No alcanza con rechazar el mundo que hay. La tarea también es ensayar vínculos, redes y espacios que anticipen el mundo que queremos.'] },
];

export const mockComments = {
  cat:[{id:'cat-1',author:'Tinta Negra',body:'Una lectura necesaria. Gracias por dejar la puerta abierta.',votes:4}],
  freedom:[{id:'freedom-1',author:'Archivo Barrial',body:'La memoria también se organiza.',votes:2}],
};
