// Content extracted from the "Claude Certified Architect - Foundations
// Certification Exam Guide" (Version 0.1, Feb 2025). Structured for navigation.
// Translated to Spanish (es).

import type { Domain, Scenario, Question, Exercise } from "./content";

export const meta = {
  title: "Claude Certified Architect",
  subtitle: "Guía de Preparación para la Certificación Foundations",
  passingScore: 720,
  scoreRange: "100-1.000",
  format: "Opción múltiple · una respuesta correcta de cuatro",
};

export const intro = {
  paragraphs: [
    "La certificación Claude Certified Architect - Foundations valida que los profesionales pueden tomar decisiones informadas sobre compensaciones (trade-offs) al implementar soluciones del mundo real con Claude. Este examen evalúa el conocimiento fundamental de Claude Code, el Claude Agent SDK, la API de Claude y el Model Context Protocol (MCP): las tecnologías principales utilizadas para crear aplicaciones de grado de producción con Claude.",
    "Las preguntas se basan en escenarios realistas extraídos de casos de uso reales de clientes, incluida la creación de sistemas de agentes para soporte al cliente, el diseño de canales de investigación de múltiples agentes, la integración de Claude Code en flujos de trabajo de CI/CD, la creación de herramientas de productividad para desarrolladores y la extracción de datos estructurados de documentos no estructurados. Los candidatos deben demostrar no solo conocimientos conceptuales, sino también un juicio práctico sobre la arquitectura, la configuración y las compensaciones en implementaciones de producción.",
  ],
  candidate: {
    summary:
      "El candidato ideal es un arquitecto de soluciones que diseña e implementa aplicaciones de producción con Claude, generalmente con más de 6 meses de experiencia práctica en las API de Claude, Agent SDK, Claude Code y MCP.",
    bullets: [
      "Creación de aplicaciones de agentes con el Claude Agent SDK: orquestación de múltiples agentes, delegación de subagentes, integración de herramientas y hooks de ciclo de vida",
      "Configuración de Claude Code para flujos de trabajo de equipo mediante archivos CLAUDE.md, Agent Skills, integraciones de servidores MCP y modo de planificación (plan mode)",
      "Diseño de interfaces de herramientas y recursos MCP para la integración de sistemas backend",
      "Ingeniería de prompts que producen salidas estructuradas confiables con esquemas JSON, ejemplos few-shot y patrones de extracción",
      "Gestión de ventanas de contexto en documentos largos, conversaciones de varios turnos y transferencias entre múltiples agentes",
      "Integración de Claude en pipelines de CI/CD para revisión de código automatizada, generación de pruebas y comentarios en PR",
      "Toma de decisiones sólidas sobre escalado y confiabilidad: manejo de errores, flujos de trabajo con humanos en el bucle (human-in-the-loop) y patrones de autoevaluación",
    ],
  },
  examFacts: [
    {
      label: "Tipos de respuesta",
      value:
        "Todas las preguntas son de opción múltiple con una respuesta correcta y tres distractores. Seleccione la única mejor respuesta.",
    },
    {
      label: "Puntuación",
      value:
        "Aprobado/reprobado frente a un estándar establecido por expertos en la materia. Puntuación en escala de 100 a 1.000; la puntuación mínima para aprobar es 720.",
    },
    {
      label: "Adivinanza",
      value:
        "Las preguntas sin responder se califican como incorrectas; no hay penalización por adivinar.",
    },
    {
      label: "Estructura del examen",
      value:
        "Se presentan 4 escenarios, seleccionados al azar del conjunto completo de 6 escenarios a continuación.",
    },
  ],
};

export const domains: Domain[] = [
  {
    id: 1,
    slug: "agentic-architecture",
    title: "Arquitectura y Orquestación de Agentes",
    weight: 27,
    blurb:
      "Diseño de bucles de agentes, sistemas de coordinador-subagente, flujos de trabajo de varios pasos con aplicación de reglas, hooks, descomposición de tareas y estado de la sesión.",
    tasks: [
      {
        code: "1.1",
        title: "Diseñar e implementar bucles de agentes para la ejecución autónoma de tareas",
        knowledge: [
          "El ciclo de vida del bucle de agentes: enviar solicitud, inspeccionar stop_reason (\"tool_use\" frente a \"end_turn\"), ejecutar herramientas solicitadas, devolver resultados para la siguiente iteración",
          "Cómo se anexan los resultados de las herramientas al historial de conversación para que el modelo pueda razonar sobre la próxima acción",
          "La distinción entre la toma de decisiones impulsada por el modelo y los árboles de decisión preconfigurados o secuencias de herramientas",
        ],
        skills: [
          "Implementar el flujo de control del bucle que continúa en caso de \"tool_use\" y termina en \"end_turn\"",
          "Agregar resultados de herramientas al contexto de la conversación entre iteraciones",
          "Evitar antipatrones: analizar señales de lenguaje natural para la terminación, límites arbitrarios de iteraciones como parada principal o verificar el texto del asistente como indicador de finalización",
        ],
      },
      {
        code: "1.2",
        title: "Orquestar sistemas de múltiples agentes con patrones de coordinador-subagente",
        knowledge: [
          "Arquitectura hub-and-spoke (estrella) donde un coordinador gestiona toda la comunicación entre subagentes, el manejo de errores y el enrutamiento",
          "Los subagentes operan con un contexto aislado: no heredan el historial de conversación del coordinador automáticamente",
          "El papel del coordinador en la descomposición, delegación, agregación y decisión de qué subagentes invocar",
          "Riesgos de una descomposición de tareas excesivamente estrecha que conduzca a una cobertura incompleta de temas amplios",
        ],
        skills: [
          "Diseñar coordinadores que seleccionen dinámicamente subagentes en lugar de enrutar siempre todo el pipeline",
          "Dividir el alcance de la investigación entre subagentes para minimizar la duplicación",
          "Implementar bucles de refinamiento iterativo que vuelvan a delegar en caso de detectar brechas hasta que la cobertura sea suficiente",
          "Enrutar toda la comunicación de los subagentes a través del coordinador para lograr observabilidad y un manejo coherente de errores",
        ],
      },
      {
        code: "1.3",
        title: "Configurar la invocación de subagentes, la transferencia de contexto y la creación (spawning)",
        knowledge: [
          "La herramienta Task genera subagentes; allowedTools debe incluir \"Task\" para que un coordinador pueda invocarlos",
          "El contexto del subagente debe proporcionarse explícitamente en el prompt: no hay herencia automática ni memoria compartida",
          "La configuración AgentDefinition: descripciones, prompts del sistema y restricciones de herramientas por tipo de subagente",
          "Gestión de sesiones basada en fork para explorar enfoques divergentes a partir de una línea base compartida",
        ],
        skills: [
          "Incluir los hallazgos completos de los agentes anteriores directamente en el prompt del subagente",
          "Utilizar formatos de datos estructurados para separar el contenido de los metadatos (URL, nombres, números de página) para preservar la atribución",
          "Generar subagentes paralelos a través de múltiples llamadas Task en una sola respuesta del coordinador",
          "Escribir prompts del coordinador que especifiquen objetivos y criterios de calidad en lugar de procedimientos paso a paso",
        ],
      },
      {
        code: "1.4",
        title: "Implementar flujos de trabajo de varios pasos con aplicación de reglas y patrones de transferencia",
        knowledge: [
          "Aplicación programática (hooks, filtros de prerrequisitos) frente a la guía basada en prompts para la ordenación",
          "Cuando se requiere un cumplimiento determinista, las instrucciones de los prompts por sí solas tienen una tasa de error diferente de cero",
          "Protocolos de transferencia estructurados para escalado a mitad del proceso (detalles del cliente, causa raíz, acciones recomendadas)",
        ],
        skills: [
          "Bloquear llamadas a herramientas posteriores hasta que se completen los prerrequisitos (por ejemplo, bloquear process_refund hasta que get_customer devuelva un ID verificado)",
          "Descomponer solicitudes con múltiples inquietudes en elementos distintos investigados en paralelo antes de una resolución unificada",
          "Compilar resúmenes de transferencia estructurados para agentes humanos que carecen de la transcripción de la conversación",
        ],
      },
      {
        code: "1.5",
        title: "Aplicar hooks del Agent SDK para la interceptación de llamadas de herramientas y la normalización de datos",
        knowledge: [
          "Hooks PostToolUse que transforman los resultados de la herramienta antes de que el modelo los procese",
          "Hooks que interceptan las llamadas a herramientas salientes para aplicar cumplimiento (por ejemplo, bloquear reembolsos por encima de un umbral)",
          "Hooks para garantías deterministas frente a prompts para cumplimiento probabilístico",
        ],
        skills: [
          "Hooks PostToolUse que normalizan formatos heterogéneos (timestamps Unix, ISO 8601, códigos numéricos)",
          "Hooks de interceptación que bloquean acciones que violan las políticas y las redirigen a flujos de trabajo alternativos",
          "Elegir hooks en lugar de la aplicación basada en prompts cuando las reglas de negocio requieren un cumplimiento garantizado",
        ],
      },
      {
        code: "1.6",
        title: "Diseñar estrategias de descomposición de tareas para flujos de trabajo complejos",
        knowledge: [
          "Pipelines secuenciales fijos (prompt chaining) frente a descomposición adaptativa dinámica basada en hallazgos",
          "Padrones de encadenamiento de prompts (prompt chaining): analizar cada archivo individualmente y luego hacer una pasada de integración entre archivos",
          "El valor de los planes de investigación adaptativos que generan subtareas a partir de lo que se descubre",
        ],
        skills: [
          "Seleccionar encadenamiento de prompts para revisiones previsibles y descomposición dinámica para investigaciones abiertas",
          "Dividir revisiones grandes en pasadas por archivo más una pasada de integración independiente entre archivos",
          "Descomponer tareas abiertas mapeando la estructura, identificando áreas de alto impacto y luego trazando un plan priorizado adaptativo",
        ],
      },
      {
        code: "1.7",
        title: "Gestionar el estado de la sesión, la reanudación y la ramificación (forking)",
        knowledge: [
          "Reanudación de sesión nombrada mediante --resume <session-name>",
          "fork_session para ramificaciones de análisis independientes a partir de una línea base compartida",
          "Informar al agente sobre los cambios de archivo al reanudar después de modificaciones de código",
          "Por qué una nueva sesión con un resumen estructurado es mejor que reanudar con resultados de herramientas obsoletos",
        ],
        skills: [
          "Utilizar --resume con nombres de sesión para continuar investigaciones nombradas",
          "Utilizar fork_session para ramificaciones de exploración paralelas",
          "Elegir la reanudación (contexto en su mayoría válido) frente a un inicio desde cero con resúmenes inyectados (resultados obsoletos)",
          "Informar a una sesión reanudada sobre cambios específicos de archivos para un reanálisis específico",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "tool-design-mcp",
    title: "Diseño de Herramientas e Integración MCP",
    weight: 18,
    blurb:
      "Diseño de interfaces de herramientas claras, respuestas de error estructuradas, distribución de herramientas y tool_choice, integración de servidores MCP y selección de herramientas integradas.",
    tasks: [
      {
        code: "2.1",
        title: "Diseñar interfaces de herramientas efectivas con descripciones y límites claros",
        knowledge: [
          "Las descripciones de herramientas son el mecanismo principal que los LLM usan para la selección; las descripciones mínimas no son confiables",
          "Incluir formatos de entrada, consultas de ejemplo, casos extremos y explicaciones de límites",
          "Las descripciones ambiguas o sobrepuestas causan fallas en el enrutamiento (analyze_content frente a analyze_document)",
          "La formulación del prompt del sistema afecta la selección de herramientas; las instrucciones sensibles a palabras clave crean asociaciones no deseadas",
        ],
        skills: [
          "Escribir descripciones que diferencien el propósito, las entradas, las salidas y cuándo usarlas frente a alternativas",
          "Renombrar y redescribir herramientas para eliminar sobreposiciones (analyze_content → extract_web_results)",
          "Dividir herramientas genéricas en herramientas de propósito específico con contratos de E/S definidos",
          "Revisar prompts del sistema para identificar instrucciones sensibles a palabras clave que anulan buenas descripciones",
        ],
      },
      {
        code: "2.2",
        title: "Implementar respuestas de error estructuradas para herramientas MCP",
        knowledge: [
          "La flag isError de MCP para comunicar fallas al agente",
          "Errores transitorios frente a validación frente a negocio frente a permisos",
          "Las respuestas uniformes del tipo \"Operación falló\" impiden tomar decisiones de recuperación adecuadas",
          "Errores reintentables frente a no reintentables; los metadatos estructurados evitan reintentos fallidos",
        ],
        skills: [
          "Devolver errorCategory (transient/validation/permission), booleano isRetryable y descripciones legibles",
          "Incluir retriable: false y explicaciones comprensibles para el cliente ante violaciones de reglas de negocio",
          "Recuperación local en subagentes para fallas transitorias; propagar solo lo que no se pueda resolver con resultados parciales",
          "Distinguir fallas de acceso (requieren decisiones de reintento) de resultados vacíos válidos",
        ],
      },
      {
        code: "2.3",
        title: "Distribuir herramientas de manera adecuada entre agentes y configurar la elección de herramienta (tool_choice)",
        knowledge: [
          "Demasiadas herramientas disponibles (18 frente a 4-5) degradan la confiabilidad de la selección al aumentar la complejidad de la decisión",
          "Los agentes con herramientas fuera de su especialización tienden a utilizarlas incorrectamente",
          "Acceso restringido a herramientas: solo las necesarias para una función, con herramientas de función cruzada limitadas",
          "Opciones de tool_choice: \"auto\", \"any\" y forzada ({\"type\": \"tool\", \"name\": \"...\"})",
        ],
        skills: [
          "Restringir el conjunto de herramientas de cada subagent a su función para evitar el uso indebido fuera de su especialidad",
          "Reemplazar herramientas genéricas con alternativas restringidas (fetch_url → load_document con validación de URL)",
          "Proporcionar herramientas de función cruzada restringidas para necesidades de alta frecuencia (una herramienta verify_fact para síntesis)",
          "Usar tool_choice forzada para llamar a una herramienta específica primero; tool_choice: \"any\" para garantizar una llamada de herramienta",
        ],
      },
      {
        code: "2.4",
        title: "Integrar servidores MCP en flujos de trabajo de Claude Code y de agentes",
        knowledge: [
          "Alcance de MCP: nivel de proyecto (.mcp.json) para herramientas compartidas frente a nivel de usuario (~/.claude.json) para servidores personales",
          "Expansión de variables de entorno en .mcp.json (ej: ${GITHUB_TOKEN}) para evitar exponer secretos",
          "Todas las herramientas configuradas del servidor MCP se descubren al conectarse y se ponen a disposición simultáneamente",
          "Los recursos MCP exponen catálogos de contenido para reducir llamadas exploratorias a herramientas",
        ],
        skills: [
          "Configurar servidores compartidos en .mcp.json con expansión de variables de entorno para tokens de autenticación",
          "Configurar servidores personales/experimentales en ~/.claude.json",
          "Mejorar las descripciones de herramientas MCP para que el agente las prefiera frente a herramientas integradas como Grep",
          "Elegir servidores MCP comunitarios para integraciones estándar; servidores personalizados para flujos de trabajo específicos de la empresa",
          "Exponer catálogos de contenido como recursos MCP para visibilidad sin llamadas exploratorias",
        ],
      },
      {
        code: "2.5",
        title: "Seleccionar y aplicar herramientas integradas (Read, Write, Edit, Bash, Grep, Glob) de manera eficaz",
        knowledge: [
          "Grep para búsqueda de contenido (nombres de funciones, mensajes de erro, importaciones)",
          "Glob para correspondencia de patrones de ruta de archivo (nombres/extensiones)",
          "Read/Write para operaciones de archivo completo; Edit para modificaciones específicas de texto único",
          "Cuando Edit falla en coincidencias no exclusivas, usar Read + Write como fallback",
        ],
        skills: [
          "Seleccionar Grep para búsqueda de contenido de código en toda la base de código",
          "Seleccionar Glob para patrones de nomenclatura (ej: **/*.test.tsx)",
          "Usar Read y luego Write cuando Edit no puede encontrar texto de anclaje exclusivo",
          "Construir entendimiento de manera incremental: puntos de entrada con Grep, luego Read para seguir importaciones y rastrear flujos",
          "Rastrear el uso de funciones en módulos wrapper identificando nombres exportados y buscando cada uno",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "claude-code-config",
    title: "Configuración y Flujos de Trabajo de Claude Code",
    weight: 20,
    blurb:
      "Jerarquía de CLAUDE.md, comandos slash personalizados y skills, reglas específicas de ruta, modo de planificación frente a ejecución directa, refinamiento iterativo e integración de CI/CD.",
    tasks: [
      {
        code: "3.1",
        title: "Configurar archivos CLAUDE.md con jerarquía, alcance y organización modular adecuados",
        knowledge: [
          "Jerarquía: nivel de usuario (~/.claude/CLAUDE.md), nivel de proyecto (.claude/CLAUDE.md o raíz), nivel de directorio",
          "Las configuraciones a nivel de usuario no se comparten con los compañeros de equipo a través del control de versiones",
          "Sintaxis @import para referenciar archivos externos para mantener CLAUDE.md modular",
          "Directorio .claude/rules/ para archivos de reglas específicas de temas en lugar de un CLAUDE.md monolítico",
        ],
        skills: [
          "Diagnosticar problemas de jerarquía (un nuevo compañero de equipo no recibe instrucciones a nivel de usuario)",
          "Utilizar @import para incluir selectivamente estándares relevantes por paquete",
          "Dividir un CLAUDE.md grande en archivos específicos en .claude/rules/ (testing.md, api-conventions.md)",
          "Utilizar /memory para verificar qué archivos de memoria están cargados y diagnosticar comportamientos inconsistentes",
        ],
      },
      {
        code: "3.2",
        title: "Crear y configurar comandos slash personalizados y skills",
        knowledge: [
          "Comando de proyecto en .claude/commands/ (compartido) frente a comandos de usuario en ~/.claude/commands/ (personal)",
          "Skills en .claude/skills/ con frontmatter SKILL.md: context: fork, allowed-tools, argument-hint",
          "context: fork ejecuta una skill en un contexto de subagente aislado para evitar contaminar la conversación principal",
          "Variantes de skill personales en ~/.claude/skills/ con nombres diferentes para evitar afectar a los compañeros de equipo",
        ],
        skills: [
          "Crear comandos slash de alcance de proyecto en .claude/commands/ para disponibilidad de todo el equipo",
          "Utilizar context: fork para aislar skills detalladas o exploratorias de la sesión principal",
          "Configurar allowed-tools en el frontmatter para restringir el acceso a herramientas durante la ejecución de la skill",
          "Utilizar argument-hint para solicitar parámetros obligatorios",
          "Elegir skills (bajo demanda) frente a CLAUDE.md (estándares universales siempre cargados)",
        ],
      },
      {
        code: "3.3",
        title: "Aplicar reglas específicas de ruta para la carga condicional de convenciones",
        knowledge: [
          "Archivos .claude/rules/ con globs de rutas en el frontmatter YAML para activación condicional",
          "Las reglas de alcance de ruta se cargan solo al editar archivos correspondientes, reduciendo el contexto irrelevante y los tokens",
          "Las reglas de patrón glob superan a CLAUDE.md de directorio para convenciones que abarcan múltiples directorios",
        ],
        skills: [
          "Crear archivos .claude/rules/ con alcance de ruta (ej: paths: [\"terraform/**/*\"])",
          "Usar globs para aplicar convenciones por tipo de archivo, independientemente del directorio (**/*.test.tsx)",
          "Elegir reglas específicas de ruta en lugar de CLAUDE.md de subdirectorio cuando los archivos están repartidos por la base de código",
        ],
      },
      {
        code: "3.4",
        title: "Determinar cuándo usar el modo de planificación (plan mode) frente a la ejecución directa",
        knowledge: [
          "Modo de planificación: tareas complejas, cambios a gran escala, múltiples enfoques válidos, decisiones de arquitectura, ediciones de múltiples archivos",
          "Ejecución directa: cambios simples y bien delimitados (una sola verificación de validación)",
          "El modo de planificación permite la exploración y el diseño seguros antes del commit, evitando costosos retrabajos",
          "El subagente Explore aísla el descubrimiento detallado y devuelve resúmenes para preservar el contexto",
        ],
        skills: [
          "Seleccionar el modo de planificación para tareas arquitectónicas (reestructuración de microservicios, migraciones de bibliotecas en más de 45 archivos)",
          "Seleccionar la ejecución directa para cambios bien comprendidos (una corrección de bug en un solo archivo con seguimiento de pila claro)",
          "Usar el subagente Explore para fases de descubrimiento detalladas para evitar la saturación del contexto",
          "Combinar el modo de planificación para investigación con la ejecución directa para implementación",
        ],
      },
      {
        code: "3.5",
        title: "Aplicar técnicas de refinamiento iterativo para la mejora progresiva",
        knowledge: [
          "Ejemplos concretos de entrada/salida comunican las transformaciones esperadas mejor que la prosa",
          "Iteración orientada a pruebas: escribir suites de pruebas primero, luego iterar compartiendo fallas",
          "El patrón de entrevista: hacer que Claude haga preguntas para plantear consideraciones primero",
          "Mensaje único para problemas interactivos frente a correcciones secuenciales para problemas independientes",
        ],
        skills: [
          "Proporcionar 2 o 3 ejemplos concretos de entrada/saida cuando la prosa produce resultados inconsistentes",
          "Escribir suites de pruebas para comportamiento, casos extremos y rendimiento, y luego iterar en las fallas",
          "Usar el patrón de entrevista para plantear consideraciones de diseño en dominios desconocidos",
          "Abordar problemas interconectados en un mensaje detallado; iteración secuencial para problemas independientes",
        ],
      },
      {
        code: "3.6",
        title: "Integrar Claude Code en pipelines de CI/CD",
        knowledge: [
          "La flag -p / --print para ejecución no interactiva en pipelines",
          "--output-format json y --json-schema para salida estructurada en CI",
          "CLAUDE.md como el mecanismo para proporcionar contexto del proyecto a Claude Code invocado por CI",
          "Aislamiento de sesión: una instancia de revisión separada es más efectiva que la autorrevisión del código generado",
        ],
        skills: [
          "Ejecutar Claude Code en CI con -p para evitar bloqueos interactivos",
          "Usar --output-format json con --json-schema para hallazgos analizables por máquina para publicar como comentarios en PR",
          "Incluir hallazgos anteriores al ejecutar nuevamente revisiones para que solo se reporten problemas nuevos/no resueltos",
          "Proporcionar archivos de prueba existentes para que la generación evite escenarios duplicados",
          "Documentar estándares de prueba y fixtures en CLAUDE.md para mejorar la calidad de las pruebas",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "prompt-engineering",
    title: "Ingeniería de Prompt y Salida Estructurada",
    weight: 20,
    blurb:
      "Criterios explícitos para reducir falsos positivos, pocas pasadas (few-shot prompting), salida estructurada mediante tool_use y esquemas JSON, bucles de validación/reintento, procesamiento por lotes y revisión de múltiples pasadas.",
    tasks: [
      {
        code: "4.1",
        title: "Diseñar prompts con criterios explícitos para mejorar la precisión y reducir falsos positivos",
        knowledge: [
          "Los criterios explícitos superan a las instrucciones vagas (sinalizar comentarios solo cuando el comportamiento alegado contradice el código real)",
          "\"Sea conservador\" / \"solo alta confianza\" fallan en comparación con criterios categóricos específicos",
          "Las categorías con altos falsos positivos minan la confianza del desarrollador en las categorías precisas",
        ],
        skills: [
          "Escribir criterios específicos definiendo qué problemas reportar vs ignorar, en lugar de filtrado por nivel de confianza",
          "Desactivar temporalmente categorías con muchos falsos positivos para restaurar la confianza mientras mejora los prompts",
          "Definir criterios explícitos de severidad con ejemplos de código concretos para cada nivel",
        ],
      },
      {
        code: "4.2",
        title: "Aplicar few-shot prompting para mejorar la consistencia y la calidad de la salida",
        knowledge: [
          "Los ejemplos few-shot son la técnica más eficaz para una salida consistente y accionable",
          "Demuestran el manejo de casos ambiguos (selección de herramientas, brechas de cobertura a nivel de ramificación)",
          "Permiten la generalización a nuevos patrones en vez de coincidir únicamente con los casos especificados",
          "Reducen alucinaciones en la extracción (mediciones informales, estructuras variadas)",
        ],
        skills: [
          "Crear de 2 a 4 ejemplos dirigidos para escenarios ambiguos que muestran el razonamiento para la acción elegida",
          "Incluir ejemplos que demuestren el formato de salida (ubicación, problema, severidad, corrección sugerida)",
          "Distinguir patrones aceptables de problemas reales para reducir falsos positivos mientras se generaliza",
          "Demostrar el manejo correcto de variadas estructuras y formatos de documentos",
        ],
      },
      {
        code: "4.3",
        title: "Imponer salidas estructuradas utilizando llamadas a herramientas (tool use) y esquemas JSON",
        knowledge: [
          "tool_use con esquemas JSON es el enfoque más confiable para salidas en conformidad con el esquema, eliminando errores de sintaxis",
          "opciones de tool_choice: \"auto\" (puede devolver texto), \"any\" (debe llamar a una herramienta), forzada (debe llamar a una herramienta nombrada)",
          "Los esquemas estrictos eliminan errores de sintaxis, pero no errores semánticos (elementos de línea no sumados, campos incorrectos)",
          "Diseño de esquema: obligatorio frente a opcional, tipo enum con patrones \"otro\" + detalles para categorías extensibles",
        ],
        skills: [
          "Definir herramientas de extracción con esquemas JSON y extraer datos de la respuesta tool_use",
          "Configurar tool_choice: \"any\" para garantizar la salida cuando el tipo de documento es desconocido",
          "Forzar tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"} para ejecutar antes del enriquecimiento",
          "Diseñar campos anulables (nullable) para que el modelo devuelva null en lugar de fabricar valores",
          "Agregar valores de enum como \"unclear\" / \"other\" + detalles para casos ambiguos y extensibles",
          "Incluir reglas de normalización de formato en los prompts junto con esquemas estrictos",
        ],
      },
      {
        code: "4.4",
        title: "Implementar bucles de validación, reintento y retroalimentación para calidad de extracción",
        knowledge: [
          "Reintento con retroalimentación de error: anexar errores específicos de validación en el nuevo intento para guiar la corrección",
          "Los intentos de reintento son ineficaces cuando la información necesaria simplemente está ausente de la fuente",
          "Diseño de retroalimentación: rastrear qué estructuras activan hallazgos (detected_pattern) para análisis de descarte",
          "Erros de validación semántica frente a errores de sintaxis del esquema (eliminados por el uso de herramientas)",
        ],
        skills: [
          "Solicitudes de seguimiento que incluyan el documento, la extracción con falla y los errores específicos para la autocorrección",
          "Identificar cuándo ayudan los reintentos (formativo/estructural) frente a cuándo no ayudan (información ausente de la fuente)",
          "Agregar campos detected_pattern para permitir el análisis de patrones de falsos positivos",
          "Flujos de autocorrección: total_calculado frente a total_declarado, booleanos conflicto_detectado",
        ],
      },
      {
        code: "4.5",
        title: "Diseñar estrategias eficientes de procesamiento por lotes",
        knowledge: [
          "API de Lotes de Mensajes (Message Batches): 50% de ahorro de costos, ventana de hasta 24 horas, sin SLA de latencia garantizado",
          "Adecuado para cargas de trabajo tolerantes a la latencia y sin bloqueo; inadecuado para verificaciones de bloqueo de pre-merge",
          "La API de Lotes no admite llamadas a herramientas de múltiples turnos dentro de una única solicitud",
          "Campos custom_id correlacionan las respuestas con las solicitudes del lote",
        ],
        skills: [
          "Combinar la API con las necesidades de latencia: síncrona para verificaciones de bloqueo, lote para análisis nocturno/semanal",
          "Calcular la frecuencia de envío a partir de las restricciones de SLA (ventanas de 4 horas para un SLA de 30 horas)",
          "Tratar fallas reenviando solo los documentos que fallaron (por custom_id) con correcciones como la división en fragmentos (chunking)",
          "Refinar prompts en un conjunto de muestra antes de procesar grandes volúmenes en lote",
        ],
      },
      {
        code: "4.6",
        title: "Diseñar arquitecturas de revisión con múltiples instancias y pasadas",
        knowledge: [
          "La autorrevisión es limitada: un modelo retiene el razonamiento de la generación y rara vez cuestiona sus propias decisiones",
          "Las instancias de revisión independientes capturan problemas sutiles mejor que la autorrevisión o el pensamiento extendido",
          "Revisión de múltiples pasadas: pasadas locales por archivo más integración entre archivos para evitar la dilución de la atención",
        ],
        skills: [
          "Usar una segunda instancia independiente para revisar el código generado sin el contexto del generador",
          "Dividir revisiones grandes en pasadas por archivo más pasadas de integración independientes",
          "Ejecutar pasadas de verificación donde el modelo informa la confianza por sí mismo para enrutamiento calibrado",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "context-reliability",
    title: "Gestión de Contexto y Confiabilidad",
    weight: 15,
    blurb:
      "Preservar información crítica en interacciones largas, escalado y resolución de ambigüedades, propagación de errores, contexto de grandes bases de código, revisión humana y calibración de confianza, y proveniencia.",
    tasks: [
      {
        code: "5.1",
        title: "Gestionar el contexto de la conversación para preservar información crítica en interacciones largas",
        knowledge: [
          "La resumización progresiva corre el riesgo de condensar números, porcentajes, fechas y expectativas del cliente en resúmenes vagos",
          "El efecto \"perdido en el medio\" (lost in the middle): confiable al principio/final, puede omitir hallazgos del medio",
          "Los resultados de las herramientas se acumulan y consumen tokens desproporcionadamente (más de 40 campos cuando 5 son relevantes)",
          "Pasar el historial completo de la conversación en las solicitudes posteriores mantiene la coherencia",
        ],
        skills: [
          "Extraer hechos transaccionales en un bloque persistente de \"hechos del caso\" incluido en cada prompt",
          "Persistir datos estructurados de problemas en una capa de contexto separada para sesiones con múltiples problemas",
          "Reducir las salidas de herramientas largas a los campos relevantes antes de que se acumulen",
          "Colocar los hallazgos importantes al principio y usar encabezados de sección explícitos para mitigar los efectos de posición",
          "Exigir que los subagentes incluyan metadados en salidas estructuradas para una síntesis precisa",
          "Devolver datos estructurados en lugar de contenido largo cuando los presupuestos de tokens posteriores son limitados",
        ],
      },
      {
        code: "5.2",
        title: "Diseñar patrones eficaces de escalado y resolución de ambigüedades",
        knowledge: [
          "Disparadores de escalado: solicitudes de clientes por un humano, vacíos/excepciones de política, incapacidad de progresar",
          "Escalar inmediatamente cuando se solicita explícitamente vs ofrecer resolver cuando sea sencillo",
          "El escalado basado en el sentimiento y la confianza autoinformada son indicadores no confiables de complejidad",
          "Múltiples coincidencias de clientes requieren aclaración, no selección por heurística",
        ],
        skills: [
          "Agregar criterios de escalado explícitos con ejemplos few-shot al prompt del sistema",
          "Atender solicitudes explícitas de agentes humanos de inmediato, sin investigar primero",
          "Reconocer la frustración mientras se ofrece resolución, escalando solo si el cliente reitera",
          "Escalar cuando la política es ambigua u omisa sobre la solicitud específica",
          "Solicitar identificadores adicionales cuando los resultados devuelven múltiples coincidencias",
        ],
      },
      {
        code: "5.3",
        title: "Implementar estrategias de propagación de errores en sistemas de múltiples agentes",
        knowledge: [
          "El contexto de error estructurado (tipo de falla, consulta intentada, resultados parciales, alternativas) permite la recuperación",
          "Fallas de acceso (timeouts que necesitan decisiones de reintento) vs resultados vacíos válidos",
          "Los estados genéricos (\"búsqueda no disponible\") ocultan contextos valiosos del coordinador",
          "Suprimir errores silenciosamente o terminar flujos de trabajo enteros ante una única falla son antipatrones",
        ],
        skills: [
          "Devolver contexto de error estructurado con tipo de falla, intento, resultados parciales y alternativas",
          "Distinguir fallas de acceso de resultados vacíos válidos en los reportes",
          "Recuperación local para fallas transitorias; propagar solo errores no resueltos con resultados parciales",
          "Estructurar la síntesis con anotaciones de cobertura marcando áreas bien soportadas vs con brechas",
        ],
      },
      {
        code: "5.4",
        title: "Gestionar el contexto de forma eficaz en la exploración de grandes bases de código",
        knowledge: [
          "Degradación del contexto: respuestas inconsistentes y referencias a \"patrones típicos\" en lugar de clases descubiertas",
          "Los archivos de borrador (scratchpad) persisten los hallazgos clave más allá de los límites del contexto",
          "La delegación en subagentes aísla la exploración detallada mientras el agente principal coordina",
          "Persistencia de estado estructurada para la recuperación de fallas a través de un manifiesto cargado al reanudar",
        ],
        skills: [
          "Crear subagentes para preguntas específicas mientras el agente principal preserva la coordinación de alto nivel",
          "Mantener archivos de borrador de los hallazgos clave para contrarrestar la degradación",
          "Resumir cada fase antes de crear subagentes para la siguiente, inyectando resúmenes",
          "Diseñar la recuperación de fallas con exportaciones de estado estructuradas (manifiestos) cargadas al reanudar",
          "Usar /compact para reducir el uso de contexto durante la exploración extendida",
        ],
      },
      {
        code: "5.5",
        title: "Diseñar flujos de trabajo de revisión humana y calibración de confianza",
        knowledge: [
          "La precisión agregada (97% general) puede enmascarar un rendimiento deficiente en tipos de documentos o campos específicos",
          "El muestreo aleatorio estratificado mide las tasas de error y detecta nuevos patrones",
          "Las puntuaciones de confianza a nivel de campo calibradas con conjuntos de validación etiquetados dirigen la atención de la revisión",
          "Validar la precisión por tipo de documento y campo antes de automatizar extracciones de alta confianza",
        ],
        skills: [
          "Muestreo aleatorio estratificado de extracciones de alta confianza para la medición continua de errores",
          "Analizar la precisión por tipo de documento y campo antes de reducir la revisión humana",
          "Emitir puntuaciones de confianza a nivel de campo, calibrando límites con conjuntos etiquetados",
          "Enrutamiento de extraiciones de baja confianza o contradictorias a revisión humana",
        ],
      },
      {
        code: "5.6",
        title: "Preservar la proveniencia de la información y manejar la incertidumbre en la síntesis de múltiples fuentes",
        knowledge: [
          "La atribución de la fuente se pierde durante la resumización cuando los mapeos de afirmación-fuente no se preservan",
          "Los mapeos estructurados de afirmación-fuente deben preservarse y fusionarse durante la síntesis",
          "Estadísticas en conflicto: anotar con atribución de la fuente en lugar de seleccionar una arbitrariamente",
          "Datos temporales: exigir fechas de publicación/recopilación para evitar interpretar diferencias como contradicciones",
        ],
        skills: [
          "Exigir que los subagentes emitan mapeos de afirmación-fuente (URL, nombres, fragmentos) preservados a través de la síntesis",
          "Estructurar reportes para distinguir hallazgos bien establecidos de aquellos en disputa",
          "Incluir valores en conflicto explícitamente anotados, dejando a cargo del coordinador la reconciliación",
          "Exigir fechas de publicación/recopilación para una correcta interpretación temporal",
          "Renderizar tipos de contenido de manera apropiada (financiero como tablas, noticias como prosa, técnico como listas)",
        ],
      },
    ],
  },
];

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Agente de Resolución de Soporte al Cliente",
    body: "Está construyendo un agente de soporte de resolución al cliente usando el Claude Agent SDK. Maneja solicitudes de alta ambigüedad, como devoluciones, disputas de facturación y problemas de cuenta, con acceso a backend a través de herramientas MCP personalizadas (get_customer, lookup_order, process_refund, escalate_to_human). La meta es de 80%+ de resolución en el primer contacto, sabiendo cuándo escalar.",
    domains: ["Arquitectura y Orquestación de Agentes", "Diseño de Herramientas e Integración MCP", "Gestión de Contexto y Confiabilidad"],
  },
  {
    id: 2,
    title: "Generación de Código con Claude Code",
    body: "Está utilizando Claude Code para acelerar el desarrollo de software: generación, refactorización, depuración y documentación. Necesita integrarlo en su flujo de trabajo con comandos slash personalizados, configuraciones de CLAUDE.md y entender cuándo usar el modo de planificación frente a la ejecución directa.",
    domains: ["Configuración y Flujos de Trabajo de Claude Code", "Gestión de Contexto y Confiabilidad"],
  },
  {
    id: 3,
    title: "Sistema de Investigación de Múltiples Agentes",
    body: "Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza los hallazgos y uno genera informes. El sistema investiga temas y produce informes completos y citados.",
    domains: ["Arquitectura y Orquestación de Agentes", "Diseño de Herramientas e Integración MCP", "Gestión de Contexto y Confiabilidad"],
  },
  {
    id: 4,
    title: "Productividad del Desarrollador con Claude",
    body: "Está construyendo herramientas de productividad para desarrolladores con el Claude Agent SDK. El agente ayuda a los ingenieros a explorar bases de código desconocidas, comprender sistemas heredados, generar boilerplate y automatizar tareas repetitivas usando herramientas integradas (Read, Write, Bash, Grep, Glob) y servidores MCP.",
    domains: ["Diseño de Herramientas e Integración MCP", "Configuración y Flujos de Trabajo de Claude Code", "Arquitectura y Orquestación de Agentes"],
  },
  {
    id: 5,
    title: "Claude Code para Integración Continua",
    body: "Está integrando Claude Code en su pipeline de CI/CD para ejecutar revisiones de código automatizadas, generar casos de prueba y proporcionar retroalimentación de PR. Necesita prompts que proporcionen comentarios acionables y minimicen los falsos positivos.",
    domains: ["Configuración y Flujos de Trabajo de Claude Code", "Ingeniería de Prompt y Salida Estruturada"],
  },
  {
    id: 6,
    title: "Extracción de Datos Estructurados",
    body: "Está construyendo un sistema de extracción de datos estructurados. Extrae información de documentos no estructurados, valida la salida con esquemas JSON y mantiene una alta precisión. Debe manejar casos extremos con gracia e integrarse con sistemas posteriores.",
    domains: ["Ingeniería de Prompt y Salida Estruturada", "Gestión de Contexto y Confiabilidad"],
  },
];

export const questions: Question[] = [
  {
    id: 1,
    scenario: "Agente de Resolución de Soporte al Cliente",
    prompt:
      "Los datos de producción muestran que en el 12% de los casos su agente omite get_customer por completo y llama a lookup_order usando solo el nombre declarado por el cliente, lo que ocasionalmente lleva a cuentas identificadas incorrectamente y reembolsos erróneos. ¿Qué cambio abordaría de manera más efectiva este problema de confiabilidad?",
    options: [
      { key: "A", text: "Agregar un prerrequisito programático que bloquee las llamadas a lookup_order y process_refund hasta que get_customer haya devuelto un ID de cliente verificado." },
      { key: "B", text: "Mejorar el prompt del sistema para declarar que la verificación del cliente a través de get_customer es obligatoria antes de cualquier operación de pedido." },
      { key: "C", text: "Agregar ejemplos few-shot que muestren al agente llamando siempre a get_customer primero, incluso cuando los clientes proporcionen voluntariamente detalles del pedido." },
      { key: "D", text: "Implementar un clasificador de enrutamiento que analice cada solicitud y habilite solo el subconjunto de herramientas apropiado para ese tipo de solicitud." },
    ],
    answer: "A",
    explanation:
      "Cuando se requiere una secuencia de herramientas específica para la lógica empresarial crítica (verificar la identidad antes de los reembolsos), la aplicación programática proporciona garantías deterministas que los enfoques basados en prompts no pueden ofrecer. B y C dependen de un cumplimiento probabilístico del LLM, insuficiente cuando los errores tienen consecuencias financieras. D aborda la disponibilidad de herramientas en lugar del orden, lo cual no es el problema real.",
  },
  {
    id: 2,
    scenario: "Agente de Resolución de Soporte al Cliente",
    prompt:
      "Los registros muestran que el agente llama frecuentemente a get_customer cuando los usuarios preguntan sobre pedidos (por ejemplo, \"verificar mi pedido #12345\") en lugar de lookup_order. Ambas herramientas tienen descripciones mínimas y aceptan formatos de identificadores similares. ¿Cuál es el primer paso más efectivo para mejorar la confiabilidad de la selección de herramientas?",
    options: [
      { key: "A", text: "Agregar de 5 a 8 ejemplos few-shot al prompt del sistema que demuestren que las consultas relacionadas con pedidos se enrutan a lookup_order." },
      { key: "B", text: "Expandir la descripción de cada herramienta para incluir formatos de entrada, consultas de ejemplo, casos extremos y explicaciones de límites que indiquen cuándo usarla en comparación con herramientas similares." },
      { key: "C", text: "Implementar una capa de enrutamiento que analice la entrada antes de cada turno y preseleccione la herramienta en función de palabras clave y patrones de identificadores detectados." },
      { key: "D", text: "Consolidar ambas herramientas en una única herramienta lookup_entity que acepte cualquier identificador y determine internamente a qué backend consultar." },
    ],
    answer: "B",
    explanation:
      "Las descripciones de las herramientas son el mecanismo principal que usan los LLM para la selección. B aborda directamente esta causa raíz con una corrección de bajo esfuerzo y alto impacto. Los ejemplos few-shot (A) agregan sobrecarga de tokens sin solucionar el problema subyacente. Una capa de enrutamiento (C) es sobreingeniería y elude la comprensión del LLM. Consolidar (D) es válido, pero requiere más esfuerzo del que justifica un \"primer paso\".",
  },
  {
    id: 3,
    scenario: "Agente de Resolución de Soporte al Cliente",
    prompt:
      "Su agente logra un 55% de resolución en el primer contacto, muy por debajo de la meta del 80%. Escala casos sencillos (reemplazos estándar por daños con evidencia fotográfica) mientras intenta resolver situaciones complejas que requieren excepciones a las políticas. ¿Cuál es la forma más efectiva de mejorar la calibración del escalado?",
    options: [
      { key: "A", text: "Agregar criterios de escalado explícitos al prompt de su sistema con ejemplos few-shot que demuestren cuándo escalar frente a resolver de forma autónoma." },
      { key: "B", text: "Hacer que el agente informe una puntuación de confianza (1-10) antes de cada respuesta y enrute a humanos cuando la confianza caiga por debajo de un umbral." },
      { key: "C", text: "Implementar un modelo clasificador independiente entrenado con tickets históricos para predecir qué solicitudes necesitan escalado." },
      { key: "D", text: "Implementar análisis de sentimiento para detectar la frustración del cliente y escalar automáticamente cuando el sentimiento negativo supere un umbral." },
    ],
    answer: "A",
    explanation:
      "Los criterios explícitos de escalado con ejemplos few-shot abordan la causa raíz: límites de decisión poco claros. B falla porque la confianza autoinformada por el LLM está mal calibrada: el agente ya tiene una confianza errónea en los casos difíciles. C es sobreingeniería. D resuelve un problema diferente; el sentimiento no se correlaciona con la complejidad.",
  },
  {
    id: 4,
    scenario: "Generación de Código con Claude Code",
    prompt:
      "Desea un comando slash personalizado /review que ejecute la lista de verificación de revisión de código estándar de su equipo, disponible para todos los desarrolladores cuando clonen o actualicen el repositorio. ¿Dónde debería crear este archivo de comando?",
    options: [
      { key: "A", text: "En el directorio .claude/commands/ en el repositorio del proyecto." },
      { key: "B", text: "En ~/.claude/commands/ en el directorio de inicio de cada desarrollador." },
      { key: "C", text: "En el archivo CLAUDE.md en la raíz del proyecto." },
      { key: "D", text: "En un archivo .claude/config.json con una matriz de comandos." },
    ],
    answer: "A",
    explanation:
      "Los comandos slash con alcance de proyecto residen en .claude/commands/ dentro del repositorio, bajo control de versiones y disponibles automáticamente para cualquier persona que clone o actualice el repositorio. B es para comandos personales no compartidos a través de control de versiones. C es para el contexto del proyecto, no para definiciones de comandos. D describe un mecanismo que no existe en Claude Code.",
  },
  {
    id: 5,
    scenario: "Generación de Código con Claude Code",
    prompt:
      "Debe reestructurar la aplicación monolítica del equipo en microservicios: cambios en docenas de archivos, con decisiones sobre límites de servicios y dependencias de módulos. ¿Qué enfoque debería adoptar?",
    options: [
      { key: "A", text: "Entrar en el modo de planificación (plan mode) para explorar la base de código, comprender las dependencias y diseñar un enfoque de implementación antes de realizar cambios." },
      { key: "B", text: "Comenzar con la ejecución directa y realizar cambios de forma incremental, dejando que la implementación revele los límites naturales del servicio." },
      { key: "C", text: "Usar la ejecución directa con instrucciones iniciales completas que detallen exactamente cómo debe estructurarse cada servicio." },
      { key: "D", text: "Comenzar en modo de ejecución directa y cambiar al modo de planificación solo si encuentra una complejidad inesperada durante la implementación." },
    ],
    answer: "A",
    explanation:
      "El modo de planificación está diseñado para cambios a gran escala, múltiples enfoques válidos y decisiones arquitectónicas, exactamente lo que requiere la migración de monolito a microservicios. B corre el riesgo de un costoso retrabajo cuando las dependencias surjan tarde. C asume que ya conoce la estructura correcta. D ignora que la complejidad ya está declarada en los requisitos.",
  },
  {
    id: 6,
    scenario: "Generación de Código con Claude Code",
    prompt:
      "Su base de código tiene áreas distintas con convenciones diferentes. Los archivos de prueba están distribuidos junto con el código que prueban (por ejemplo, Button.test.tsx junto a Button.tsx), y desea que todas las pruebas sigan las mismas convenciones independientemente de su ubicación. ¿Cuál es la forma más mantenible de garantizar que Claude aplique automáticamente las convenciones correctas?",
    options: [
      { key: "A", text: "Crear archivos de reglas en .claude/rules/ con frontmatter YAML que especifique patrones glob para aplicar condicionalmente convenciones basadas en rutas de archivos." },
      { key: "B", text: "Consolidar todas las convenciones en el CLAUDE.md raíz bajo encabezados para cada área, confiando en que Claude infiera qué sección se aplica." },
      { key: "C", text: "Crear skills en .claude/skills/ para cada tipo de código que incluyan las convenciones relevantes en sus archivos SKILL.md." },
      { key: "D", text: "Colocar archivos CLAUDE.md idénticos en cada subdirectorio que contenga código de prueba para garantizar el cumplimiento local." },
    ],
    answer: "A",
    explanation:
      "Los archivos .claude/rules/ con patrones glob en el frontmatter permiten aplicar convenciones a archivos correspondientes (como archivos de prueba) en todo el repositorio sin necesidad de duplicación. B es propenso a confusiones de contexto. C está diseñado para comportamientos bajo demanda, no reglas universales. D crea un problema de mantenimiento por la redundancia de archivos.",
  },
  {
    id: 7,
    scenario: "Sistema de Investigación de Múltiples Agentes",
    prompt:
      "Su agente coordinador investiga temas complejos delegando tareas en subagentes. Desea maximizar el rendimiento acelerando la ejecución. ¿Qué diseño de flujo de trabajo logra esto mejor?",
    options: [
      { key: "A", text: "Hacer que el coordinador genere llamadas paralelas a la herramienta Task en una sola respuesta para iniciar subagentes simultáneamente." },
      { key: "B", text: "Hacer que el coordinador encadene subagentes secuencialmente, pasando el historial completo de la conversación al siguiente en la fila." },
      { key: "C", text: "Proporcionar una única herramienta de búsqueda de uso general y confiar en la autoevaluación del modelo para gestionar el progreso." },
      { key: "D", text: "Limitar al coordinador a invocar un subagente a la vez para evitar la sobrecarga de contexto en el bucle principal." },
    ],
    answer: "A",
    explanation:
      "El Agent SDK y la API de Claude admiten la invocación de múltiples herramientas en un solo turno. Hacer que el coordinador genere múltiples llamadas Task en paralelo permite la ejecución simultánea de los subagentes, reduciendo considerablemente la latencia total frente a llamadas secuenciales.",
  },
  {
    id: 8,
    scenario: "Sistema de Investigación de Múltiples Agentes",
    prompt:
      "El subagente de análisis de documentos falla debido a un timeout de API al procesar un PDF grande. El coordinador necesita esos resultados para responder al usuario. ¿Cuál es el mejor enfoque de propagación de errores?",
    options: [
      { key: "A", text: "El subagente debe devolver un error estructurado detallando la falla (tipo, consulta, etc.) e indicar si es reintentable, permitiendo que el coordinador decida si reintenta o busca alternativas." },
      { key: "B", text: "El subagente debe devolver una respuesta genérica \"búsqueda no disponible\" para evitar saturar la ventana de contexto con detalles técnicos." },
      { key: "C", text: "El coordinador debe interceptar la falla de red y finalizar la sesión inmediatamente para garantizar la integridad de los datos." },
      { key: "D", text: "El subagente debe ignorar el error silenciosamente y devolver una lista vacía de hallazgos para que el pipeline prosiga sin interrupciones." },
    ],
    answer: "A",
    explanation:
      "Los errores estructurados (con categorías y la flag isRetryable) proporcionan información valiosa para que el coordinador tome decisiones informadas sobre el manejo del error. B oculta el contexto necesario. C es demasiado drástico para un error de red. D enmascara una falla real como si no hubiera datos, lo cual es un antipatrón de confiabilidad.",
  },
  {
    id: 9,
    scenario: "Productividad del Desarrollador con Claude",
    prompt:
      "Está creando una skill personalizada para refactorizar importaciones obsoletas. Quiere asegurarse de que el subagente que ejecuta esta skill no ejecute comandos Bash arbitrarios ni edite archivos fuera de alcance. ¿Cómo se configura esto?",
    options: [
      { key: "A", text: "Definir frontmatter YAML con context: fork y una lista restringida de allowed-tools (ej: Read, Edit) en el archivo SKILL.md." },
      { key: "B", text: "Incluir instrucciones explícitas en el prompt del sistema de la skill instruyendo al agente a no utilizar la herramienta Bash." },
      { key: "C", text: "Crear una regla en el CLAUDE.md raíz prohibiendo el uso de Bash para refactorizar importaciones." },
      { key: "D", text: "Configurar un hook global de interceptación en el Agent SDK que rechace llamadas a Bash iniciadas por comandos slash." },
    ],
    answer: "A",
    explanation:
      "Las skills de Claude Code admiten el aislamiento mediante frontmatter. Establecer context: fork ejecuta la skill en un contexto de subagente aislado, y allowed-tools restringe de manera determinista las herramientas disponibles. B y C son probabilísticos. D es una solución demasiado rígida y global para una necesidad específica.",
  },
  {
    id: 10,
    scenario: "Productividad del Desarrollador con Claude",
    prompt:
      "Al utilizar Claude Code en modo no interactivo en pipelines de CI/CD para automatizar análisis de código, ¿cuál es el patrón recomendado para ejecutar comandos y capturar la salida?",
    options: [
      { key: "A", text: "Usar la flag -p / --print para enviar el prompt y capturar la respuesta directamente de la salida estándar (stdout)." },
      { key: "B", text: "Establecer la variable de entorno CLAUDE_HEADLESS=true en el pipeline para deshabilitar la interactividad." },
      { key: "C", text: "Agregar instrucciones en el CLAUDE.md informando al agente que cierre la sesión al finalizar." },
      { key: "D", text: "Usar la flag --batch junto con el redireccionamiento de la entrada estándar (stdin) desde un archivo." },
    ],
    answer: "A",
    explanation:
      "La flag -p (o --print) es la forma documentada de ejecutar Claude Code de forma no interactiva: procesa el prompt, imprime en stdout y sale. Las otras opciones describen características inexistentes o soluciones alternativas que no resuelven la necesidad de forma nativa.",
  },
  {
    id: 11,
    scenario: "Claude Code para Integración Continua",
    prompt:
      "Dos flujos de trabajo utilizan llamadas en tiempo real de Claude: (1) una verificación de bloqueo pre-merge que debe ejecutarse antes de que los desarrolladores integren su código, y (2) un informe de deuda técnica generado por la noche. Su gerente propone cambiar ambos a la API de Message Batches para obtener un 50% de ahorro en costos. ¿Cómo evaluaría esto?",
    options: [
      { key: "A", text: "Usar procesamiento por lotes (batches) solo para los informes de deuda técnica; mantener llamadas en tiempo real para las verificaciones pre-merge." },
      { key: "B", text: "Cambiar ambos flujos a procesamiento por lotes e implementar polling de estado para verificar la finalización." },
      { key: "C", text: "Mantener llamadas en tiempo real para ambos flujos para evitar problemas de ordenación de resultados del lote." },
      { key: "D", text: "Cambiar ambos flujos a procesamiento por lotes y configurar un fallback a tiempo real si el lote tarda demasiado." },
    ],
    answer: "A",
    explanation:
      "La API de Batches ofrece un 50% de descuento pero con una ventana de procesamiento de hasta 24 horas y sin SLA de latencia, lo cual es inadecuado para verificaciones pre-merge críticas, pero ideal para informes nocturnos tolerantes a la latencia. B no es viable para tareas bloqueantes. C refleja un error de concepto (custom_id correlaciona la solicitud/respuesta). D agrega complejidad innecesaria.",
  },
  {
    id: 12,
    scenario: "Claude Code para Integración Continua",
    prompt:
      "Un PR altera 14 archivos. Su revisión de una sola pasada produce resultados inconsistentes: comentarios detallados para algunos archivos, superficiales para otros, bugs obvios no detectados y comentarios contradictorios (sinalizar un patrón en un archivo y aprobar el mismo código en otro). ¿Cómo debería reestructurar la revisión?",
    options: [
      { key: "A", text: "Dividir la revisión en pasadas enfocadas: analizar cada archivo individualmente para problemas locales y luego ejecutar una pasada de integración enfocada en el flujo de datos entre archivos." },
      { key: "B", text: "Exigir a los desarrolladores que dividan los PR grandes en submisiones más pequeñas de 3 o 4 archivos antes de ejecutar la revisión automatizada." },
      { key: "C", text: "Cambiar a un modelo de nivel superior con una ventana de contexto más grande para dar atención adecuada a los 14 archivos en una sola pasada." },
      { key: "D", text: "Ejecutar tres pasadas de revisión independientes en el PR completo y reportar solo los problemas que aparezcan en al menos dos de las tres pasadas." },
    ],
    answer: "A",
    explanation:
      "Dividir la revisión en pasadas enfocadas aborda la causa raíz: la dilución de la atención al procesar muchos archivos a la vez. El examen archivo por archivo garantiza consistencia; una pasada de integración independiente captura problemas de flujo cruzado. B sobrecarga al desarrollador. C no garantiza calidad de atención. D suprime bugs legítimos al requerir consenso en fallas detectadas de manera intermitente.",
    },
  ];

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Construir un Agente Multi-Herramienta con Lógica de Escalado",
    objective:
      "Practicar el diseño de un bucle de agente con integración de herramientas, manejo estructurado de errores y patrones de escalado.",
    steps: [
      "Definir 3-4 herramientas MCP con descripciones detalladas que diferencien claramente el propósito, las entradas y los límites. Incluir al menos dos herramientas similares que requieran una descripción cuidadosa para evitar confusión en la selección.",
      "Implementar un bucle de agente que verifique stop_reason para decidir si continúa la ejecución de la herramienta o presenta la respuesta final. Manejar \"tool_use\" y \"end_turn\" correctamente.",
      "Agregar respuestas de error estructuradas: errorCategory (transient/validation/permission), booleano isRetryable y descripciones comprensibles. Probar que el agente reintente errores transitorios y explique errores de lógica.",
      "Implementar un hook programático que intercepte llamadas a herramientas para imponer una regla de negocio (ej: bloquear operaciones por encima de un umbral), redirigiendo a un flujo de trabajo de escalado.",
      "Probar con mensajes que contengan múltiples temas y verificar que el agente descomponga la solicitud, maneje cada tema y sintetice una respuesta unificada.",
    ],
    domains: ["Dominio 1", "Dominio 2", "Dominio 5"],
  },
  {
    id: 2,
    title: "Configurar Claude Code para un Flujo de Trabajo de Equipo",
    objective:
      "Practicar la configuración de jerarquías de CLAUDE.md, comandos slash personalizados, reglas específicas de ruta e integración con servidores MCP.",
    steps: [
      "Crear un archivo CLAUDE.md a nivel de proyecto con estándares universales de codificación y pruebas. Verificar que se apliquen a todos los miembros del equipo.",
      "Crear archivos en .claude/rules/ con patrones glob de rutas en el frontmatter YAML (ej: paths: [\"src/api/**/*\"], paths: [\"**/*.test.*\"]). Probar que las reglas se carguen solo al editar archivos correspondientes.",
      "Crear una skill de alcance de proyecto en .claude/skills/ con context: fork y restricciones de allowed-tools. Verificar que se ejecute en aislamiento sin contaminar la conversación principal.",
      "Configurar un servidor MCP en .mcp.json con expansión de variables de entorno para credenciales. Agregar un servidor personal en ~/.claude.json y verificar que ambos estén disponibles simultáneamente.",
      "Probar el modo de planificación frente a la ejecución directa en una corrección simple de un solo archivo, una migración de biblioteca en múltiples archivos y una nueva característica con múltiples enfoques válidos. Observar cuándo el modo de planificación agrega valor.",
    ],
    domains: ["Dominio 3", "Dominio 2"],
  },
  {
    id: 3,
    title: "Construir un Pipeline de Extracción de Datos Estructurados",
    objective:
      "Practicar el diseño de esquemas JSON, el uso de tool_use para salidas estructuradas, bucles de validación-reintento y procesamiento por lotes.",
    steps: [
      "Definir una herramienta de extracción con campos obligatorios y opcionales, un enum con patrón \"otro\" + detalles, y campos anulables. Procesar documentos donde algunos campos estén ausentes y verificar que el modelo devuelva null en lugar de fabricar valores.",
      "Implementar un bucle de validación-reintento: en caso de falla de validación, enviar una solicitud de seguimiento que incluya el documento, la extracción fallida y el error específico. Rastrear qué errores son solucionables (formato) vs no solucionables (información ausente).",
      "Agregar ejemplos few-shot que demuestren la extracción de formatos variados (citas inline frente a bibliografías, narrativas frente a tablas) y verificar la mejora del comportamiento.",
      "Enviar un lote de 100 documentos a través de la API de Message Batches, manejar fallas por custom_id, volver a enviar con modificaciones (ej: dividir documentos grandes) y calcular el tiempo de procesamiento en relación con las restricciones de SLA.",
      "Hacer que el modelo devuelva puntuaciones de confianza a nivel de campo, enrutar las extracciones de baja confianza a revisión humana y analizar la precisión por tipo de documento y campo.",
    ],
    domains: ["Dominio 4", "Dominio 5"],
  },
  {
    id: 4,
    title: "Diseñar y Depurar un Pipeline de Investigación de Múltiples Agentes",
    objective:
      "Practicar la orquestación de subagentes, la gestión de transferencia de contexto, la propagación de errores y la síntesis con rastreo de proveniencia.",
    steps: [
      "Construir un coordinador que delegue en al menos dos subagentes (búsqueda web, análisis de documentos). Asegurar que allowedTools incluya \"Task\" y que cada subagente reciba los hallazgos directamente en su prompt.",
      "Implementar la ejecución paralela de subagentes mediante múltiples llamadas Task en una sola respuesta. Medir la mejora de la latência frente a la ejecución secuencial.",
      "Diseñar una salida estructurada de subagente que separe el contenido de los metadatos: cada hallazgo debe incluir una afirmación, un fragmento de evidencia, la URL/nombre de la fuente y la fecha de publicación. Verificar que la síntesis preserve la atribución.",
      "Simular un timeout de subagente y verificar que el coordinador reciba un contexto de error estructurado, pueda continuar con resultados parciales y anotar brechas de cobertura.",
      "Probar con datos de fuentes en conflicto y verificar que la síntesis preserve ambos valores con atribución explícita en lugar de seleccionar uno arbitrariamente, distinguiendo hallazgos establecidos de hallazgos en disputa.",
    ],
    domains: ["Dominio 1", "Dominio 2", "Dominio 5"],
  },
];

export const appendix = {
  technologies: [
    { name: "Claude Agent SDK", detail: "Definiciones de agentes, bucles de agentes, manejo de stop_reason, hooks (PostToolUse, interceptación de llamadas a herramientas), creación de subagentes mediante la herramienta Task, configuración de allowedTools" },
    { name: "Model Context Protocol (MCP)", detail: "Servidores MCP, herramientas, recursos, flag isError, descripciones de herramientas, distribución de herramientas, configuración de .mcp.json, expansión de variables de entorno" },
    { name: "Claude Code", detail: "Jerarquía de CLAUDE.md (usuario/proyecto/dirección), alcance de ruta en .claude/rules/, .claude/commands/, frontmatter de .claude/skills/ (context: fork, allowed-tools, argument-hint), modo de planificación, ejecución directa, /memory, /compact, --resume, fork_session, subagente Explore" },
    { name: "Claude Code CLI", detail: "-p / --print para modo no interactivo, --output-format json, --json-schema para salida estructurada en CI" },
    { name: "Claude API", detail: "tool_use con esquemas JSON, tool_choice (\"auto\", \"any\", forzada), stop_reason (\"tool_use\", \"end_turn\"), max_tokens, prompts de sistema" },
    { name: "Message Batches API", detail: "50% de ahorro de costos, ventana de hasta 24 horas, correlación por custom_id, polling, sin soporte a llamadas a herramientas de múltiples turnos" },
    { name: "JSON Schema", detail: "Obligatorio frente a opcional, tipos enum, campos anulables (nullable), patrones \"otro\" + detalles, modo strict para eliminación de errores de sintaxis" },
    { name: "Pydantic", detail: "Validador de esquema, errores de validación semántica, bucles de validación-reintento" },
    { name: "Herramientas integradas", detail: "Read, Write, Edit, Bash, Grep, Glob - propósitos y criterios de selección" },
    { name: "Few-shot prompting", detail: "Ejemplos dirigidos para escenarios ambiguos, demostración de formato, reducción de falsos positivos" },
    { name: "Prompt chaining", detail: "Decomposición secuencial de tareas en pasadas enfocadas" },
    { name: "Gestión de ventana de contexto", detail: "Límites de tokens, resumización progresiva, lost-in-the-middle, extracción de contexto, archivos scratchpad" },
    { name: "Gestión de sesión", detail: "Reanudación, fork_session, sesiones nombradas, aislamiento de contexto de sesión" },
    { name: "Puntuación de confianza", detail: "Confianza a nivel de campo, calibración con conjuntos de validación etiquetados, muestreo estratificado" },
  ],
  inScope: [
    "Implementación del bucle de agente: flujo de control en stop_reason, manejo del resultado de la herramienta, condiciones de término",
    "Orquestación de múltiples agentes: patrones de coordinador-subagente, descomposición, ejecución paralela, refinamiento iterativo",
    "Gestión de contexto del subagente: transferencia explícita de contexto, persistencia de estado estructurado, recuperación de fallas mediante manifiestos",
    "Diseño de interfaz de herramientas: descripciones efectivas, división vs consolidación, nomenclatura para reducir ambigüedades",
    "Diseño de herramientas y recursos MCP: recursos para catálogos, herramientas para acciones, calidad de descripciones para adopción",
    "Configuración del servidor MCP: alcance de proyecto vs usuario, expansión de variables de entorno, acceso a múltiples servidores",
    "Manejo y propagación de errores: respuestas estructuradas, transitorios frente a negocio frente a permisos, recuperación local",
    "Toma de decisiones de escalado: criterios explícitos, atención a preferencias de clientes, identificación de vacíos en políticas",
    "Configuración de CLAUDE.md: jerarquía, patrones de @import, globs de .claude/rules/",
    "Comandos y skills personalizados: alcance de proyecto vs usuario, context: fork, allowed-tools, argument-hint",
    "Modo de planificación frente a ejecución directa: evaluación de la complejidad, decisiones arquitectónicas, cambios de un solo archivo",
    "Refinamiento iterativo: ejemplos de E/S, iteración orientada a pruebas, patrón de entrevista, secuencial vs paralelo",
    "Salida estructurada a través de tool_use: diseño de esquema, tool_choice, campos anulables para evitar alucinaciones",
    "Few-shot prompting: direccionamiento de ambigüedades, consistencia de formato, reducción de falsos positivos",
    "Procesamiento por lotes: adecuación del caso de uso, tolerancia a la latencia, manejo de fallas por custom_id",
    "Optimización de la ventana de contexto: reducción de salidas, extracción estructurada de hechos, ordenación consciente de la posición",
    "Flujos de trabajo de revisión humana: calibración de confianza, muestreo estratificado, segmentación de precisión",
    "Proveniencia de la información: mapeo afirmación-fuente, datos temporales, anotaciones de conflicto, brechas de cobertura",
  ],
  outOfScope: [
    "Ajuste fino (fine-tuning) de modelos Claude o entrenamiento de modelos personalizados",
    "Autenticación, facturación o gestión de cuenta de la Claude API",
    "Implementación detallada de lenguajes de programación o frameworks específicos",
    "Despliegue u hospedaje de servidores MCP (infraestructura, red, orquestación)",
    "Arquitectura interna de Claude, proceso de entrenamiento o pesos del modelo",
    "Constitutional AI, RLHF o metodologías de entrenamiento de seguridad",
    "Modelos de incrustación (embeddings) o detalles de implementación de bases de datos vectoriales",
    "Uso de la computadora (automatización del navegador, interacción con el escritorio)",
    "Capacidades de análisis de imagen/visión",
    "Implementación de streaming de la API o server-sent events",
    "Límite de tasas, cuotas o cálculos de precios de la API",
    "OAuth, rotación de claves de API o detalles del protocolo de autenticación",
    "Configuraciones específicas de proveedores de nube (AWS, GCP, Azure)",
    "Benchmarking de rendimiento o métricas de comparación de modelos",
    "Detalles de implementación de caché de prompt (más allá de saber que existe)",
    "Algoritmos de conteo de tokens o detalles de tokenización",
  ],
  recommendations: [
    "Construir un agente con el Claude Agent SDK: un bucle de agente completo con llamadas a herramientas, manejo de errores y gestión de sesión. Practicar la creación de subagentes y transferencia de contexto.",
    "Configurar Claude Code para un proyecto real: jerarquía de CLAUDE.md, reglas específicas de ruta en .claude/rules/, skills personalizadas con frontmatter (context: fork, allowed-tools) y al menos un servidor MCP.",
    "Diseñar y probar herramientas MCP: descripciones que diferencien herramientas similares, respuestas de error estructuradas con categorías y flags retryable, y pruebas de confiabilidad con solicitudes ambiguas.",
    "Construir un pipeline de extracción de datos estructurados: tool_use con esquemas JSON, bucles de validación-reintento, campos opcionales/anulables y procesamiento por lotes con la API de Message Batches.",
    "Practicar ingeniería de prompt: ejemplos few-shot para escenarios ambiguos, criterios explícitos de revisión para reducir falsos positivos y arquitecturas de revisión de múltiples pasadas.",
    "Estudiar gestión de contexto: extraer hechos estructurados de salidas detalladas, archivos scratchpad para sesiones largas y delegación en subagentes para gestionar límites de contexto.",
    "Revisar escalado y patrones de humanos en el bucle: cuándo escalar (vacíos en políticas, solicitudes de clientes, incapacidad de progresar) vs resolver, y enrutamiento basado en confianza.",
    "Completar el Simulacro de Examen antes de rendir la prueba real: refleja los escenarios y el formato de la prueba y explica las respuestas para reforzar el entendimiento.",
  ],
};

export const navItems = [
  { href: "/overview", label: "Visión General", desc: "Introducción, candidato, datos del examen" },
  { href: "/scenarios", label: "Escenarios", desc: "Los 6 escenarios del examen" },
  { href: "/domains", label: "Dominios", desc: "5 dominios y temas de tareas" },
  { href: "/questions", label: "Preguntas de Práctica", desc: "12 muestras interactivas" },
  { href: "/exercises", label: "Ejercicios", desc: "4 laboratorios prácticos" },
  { href: "/appendix", label: "Apéndice", desc: "Tecnología, alcance y preparación" },
];
