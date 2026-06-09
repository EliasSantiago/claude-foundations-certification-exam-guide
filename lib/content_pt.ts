// Content extracted from the "Claude Certified Architect – Foundations
// Certification Exam Guide" (Version 0.1, Feb 2025). Structured for navigation.
// Translated to Brazilian Portuguese (pt-BR).

import type { Domain, Scenario, Question, Exercise } from "./content";

export const meta = {
  title: "Claude Certified Architect",
  subtitle: "Guia de Preparação para a Certificação Foundations",
  passingScore: 720,
  scoreRange: "100–1.000",
  format: "Múltipla escolha · uma resposta correta de quatro",
};

export const intro = {
  paragraphs: [
    "A certificação Claude Certified Architect – Foundations valida que os profissionais podem tomar decisões fundamentadas sobre compensações (trade-offs) ao implementar soluções do mundo real com o Claude. Este exame testa o conhecimento fundamental no Claude Code, no Claude Agent SDK, na API do Claude e no Model Context Protocol (MCP) — as principais tecnologias usadas para criar aplicações de nível de produção com o Claude.",
    "As perguntas são baseadas em cenários realistas extraídos de casos de uso reais de clientes, incluindo a construção de sistemas de agentes para suporte ao cliente, design de pipelines de pesquisa de múltiplos agentes, integração do Claude Code em fluxos de trabalho de CI/CD, construção de ferramentas de produtividade para desenvolvedores e extração de dados estruturados de documentos não estruturados. Os candidatos devem demonstrar não apenas conhecimento conceitual, mas julgamento prático sobre arquitetura, configuração e compensações em implantações de produção.",
  ],
  candidate: {
    summary:
      "O candidato ideal é um arquiteto de soluções que projeta e implementa aplicações de produção com o Claude, normalmente com mais de 6 meses de experiência prática nas APIs do Claude, Agent SDK, Claude Code e MCP.",
    bullets: [
      "Construção de aplicações de agentes com o Claude Agent SDK: orquestração de múltiplos agentes, delegação de subagentes, integração de ferramentas e hooks de ciclo de vida",
      "Configuração do Claude Code para fluxos de trabalho de equipe usando arquivos CLAUDE.md, Agent Skills, integrações de servidor MCP e modo de planejamento (plan mode)",
      "Design de interfaces de ferramentas e recursos MCP para integração de sistemas de backend",
      "Engenharia de prompts que produzem saída estruturada confiável com schemas JSON, exemplos few-shot e padrões de extração",
      "Gerenciamento de janelas de contexto em documentos longos, conversas de vários turnos e transferências entre múltiplos agentes",
      "Integração do Claude em pipelines de CI/CD para revisão automatizada de código, geração de testes e feedback de relações de PR",
      "Tomada de decisões sólidas de escalabilidade e confiabilidade: tratamento de erros, fluxos de trabalho com humanos no circuito (human-in-the-loop) e padrões de autoavaliação",
    ],
  },
  examFacts: [
    {
      label: "Tipos de resposta",
      value:
        "Todas as perguntas são de múltipla escolha com uma resposta correta e três distratores. Escolha a única melhor resposta.",
    },
    {
      label: "Pontuação",
      value:
        "Aprovado/reprovado em relação a um padrão estabelecido por especialistas no assunto. Pontuação escalonada de 100 a 1.000; a pontuação mínima para aprovação é 720.",
    },
    {
      label: "Palpite",
      value:
        "Perguntas não respondidas são pontuadas como incorretas — não há penalidade por adivinhar.",
    },
    {
      label: "Estrutura do exame",
      value:
        "4 cenários são apresentados, escolhidos aleatoriamente a partir do conjunto completo de 6 cenários abaixo.",
    },
  ],
};

export const domains: Domain[] = [
  {
    id: 1,
    slug: "agentic-architecture",
    title: "Arquitetura e Orquestração de Agentes",
    weight: 27,
    blurb:
      "Projetar loops de agentes, sistemas coordenador-subagente, fluxos de trabalho de várias etapas com aplicação de regras, hooks, decomposição de tarefas e estado da sessão.",
    tasks: [
      {
        code: "1.1",
        title: "Projetar e implementar loops de agentes para execução autônoma de tarefas",
        knowledge: [
          "O ciclo de vida do loop de agente: enviar requisição, inspecionar stop_reason (\"tool_use\" vs \"end_turn\"), executar ferramentas solicitadas, retornar resultados para a próxima iteração",
          "Como os resultados das ferramentas são anexados ao histórico da conversa para que o modelo possa raciocinar sobre a próxima ação",
          "A distinção entre a tomada de decisão orientada pelo modelo e árvores de decisão pré-configuradas ou sequências de ferramentas",
        ],
        skills: [
          "Implementar fluxo de controle de loop que continua em \"tool_use\" e termina em \"end_turn\"",
          "Adicionar resultados de ferramentas ao contexto da conversa entre as iterações",
          "Evitar antipadrões: analisar sinais de linguagem natural para terminação, limites arbitrários de iteração como parada primária, ou verificar o texto do assistente como um indicador de conclusão",
        ],
      },
      {
        code: "1.2",
        title: "Orquestrar sistemas de múltiplos agentes com padrões coordenador-subagente",
        knowledge: [
          "Arquitetura hub-and-spoke (estrela) onde um coordenador gerencia toda a comunicação entre subagentes, tratamento de erros e roteamento",
          "Subagentes operam com contexto isolado — eles não herdam o histórico de conversa do coordenador automaticamente",
          "O papel do coordenador na decomposição, delegação, agregação e decisão de quais subagentes invocar",
          "Riscos de decomposição de tarefas excessivamente estreita, levando a uma cobertura incompleta de tópicos amplos",
        ],
        skills: [
          "Projetar coordenadores que selecionam subagentes dinamicamente em vez de sempre rotear todo o pipeline",
          "Particionar o escopo da pesquisa entre subagentes para minimizar a duplicação",
          "Implementar loops de refinamento iterativo que re-delegam em lacunas detectadas até que a cobertura seja suficiente",
          "Roteamento de toda a comunicação dos subagentes através do coordenador para observabilidade e tratamento consistente de erros",
        ],
      },
      {
        code: "1.3",
        title: "Configurar invocação de subagentes, passagem de contexto e criação (spawning)",
        knowledge: [
          "A ferramenta Task gera subagentes; allowedTools deve incluir \"Task\" para que um coordenador possa invocá-los",
          "O contexto do subagente deve ser fornecido explicitamente no prompt — sem herança automática ou memória compartilhada",
          "A configuração AgentDefinition: descrições, prompts de sistema e restrições de ferramentas por tipo de subagente",
          "Gerenciamento de sessão baseado em fork para explorar abordagens divergentes a partir de uma linha de base compartilhada",
        ],
        skills: [
          "Incluir descobertas completas de agentes anteriores diretamente no prompt do subagente",
          "Usar formatos de dados estruturados para separar o conteúdo dos metadados (URLs, nomes, números de página) para preservar a atribuição",
          "Criar subagentes paralelos por meio de várias chamadas Task em uma única resposta do coordenador",
          "Escrever prompts do coordenador que especificam objetivos e critérios de qualidade em vez de procedimentos passo a passo",
        ],
      },
      {
        code: "1.4",
        title: "Implementar fluxos de trabalho de várias etapas com aplicação de regras e padrões de transferência",
        knowledge: [
          "Aplicação programática (hooks, portões de pré-requisito) vs orientação baseada em prompt para ordenação",
          "Quando a conformidade determinística é necessária, as instruções do prompt por si só têm uma taxa de falha diferente de zero",
          "Protocolos estruturados de transferência para escalada no meio do processo (detalhes do cliente, causa raiz, ações recomendadas)",
        ],
        skills: [
          "Bloquear chamadas de ferramentas a jusante até que os pré-requisitos sejam concluídos (por exemplo, bloquear process_refund até que get_customer retorne um ID verificado)",
          "Decompor solicitações de múltiplas preocupações em itens distintos investigados em paralelo antes de uma resolução unificada",
          "Compilar resumos estruturados de transferência para agentes humanos que não têm acesso à transcrição da conversa",
        ],
      },
      {
        code: "1.5",
        title: "Aplicar hooks do Agent SDK para interceptação de chamadas de ferramentas e normalização de dados",
        knowledge: [
          "Hooks PostToolUse que transformam os resultados da ferramenta antes que o modelo os processe",
          "Hooks que interceptam chamadas de ferramentas saines para aplicar conformidade (por exemplo, bloquear reembolsos acima de um limite)",
          "Hooks para garantias determinísticas vs prompts para conformidade probabilística",
        ],
        skills: [
          "Hooks PostToolUse que normalizam formatos heterogêneos (timestamps Unix, ISO 8601, códigos numéricos)",
          "Hooks de interceptação que bloqueiam ações que violam a política e redirecionam para fluxos de trabalho alternativos",
          "Escolher hooks em vez de aplicação baseada em prompt quando as regras de negócios exigem conformidade garantida",
        ],
      },
      {
        code: "1.6",
        title: "Projetar estratégias de decomposição de tarefas para fluxos de trabalho complexos",
        knowledge: [
          "Pipelines sequenciais fixos (prompt chaining) vs decomposição adaptativa dinâmica baseada em descobertas",
          "Padrões de encadeamento de prompts (prompt chaining): analisar cada arquivo individualmente e, em seguida, fazer uma passagem de integração entre arquivos",
          "O valor de planos de investigação adaptativos que geram subtarefas a partir do que é descoberto",
        ],
        skills: [
          "Selecionar encadeamento de prompts para revisões previsíveis e decomposição dinâmica para investigações abertas",
          "Dividir revisões grandes em passagens por arquivo mais uma passagem separada de integração entre arquivos",
          "Decompor tarefas abertas mapeando a estrutura, encontrando áreas de alto impacto e, em seguida, traçando um plano priorizado adaptativo",
        ],
      },
      {
        code: "1.7",
        title: "Gerenciar estado da sessão, retomada e ramificação (forking)",
        knowledge: [
          "Retomada de sessão nomeada usando --resume <session-name>",
          "fork_session para ramificações de análise independentes a partir de uma linha de base de análise compartilhada",
          "Informar o agente sobre alterações de arquivo ao retomar após modificações de código",
          "Por que uma nova sessão com um resumo estruturado é melhor do que retomar com resultados de ferramentas obsoletos",
        ],
        skills: [
          "Usar --resume com nomes de sessão para continuar investigações nomeadas" ,
          "Usar fork_session para ramificações de exploração paralelas",
          "Escolher retomada (contexto majoritariamente válido) vs início do zero com resumos injetados (resultados obsoletos)",
          "Informar uma sessão retomada sobre alterações específicas de arquivos para reanálise direcionada",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "tool-design-mcp",
    title: "Design de Ferramentas e Integração MCP",
    weight: 18,
    blurb:
      "Projetar interfaces de ferramentas claras, respostas de erro estruturadas, distribuição de ferramentas e tool_choice, integração de servidor MCP e seleção de ferramentas embutidas.",
    tasks: [
      {
        code: "2.1",
        title: "Projetar interfaces de ferramentas eficazes com descrições e limites claros",
        knowledge: [
          "As descrições de ferramentas são o mecanismo primário que os LLMs usam para seleção; descrições mínimas são não confiáveis",
          "Incluir formatos de entrada, consultas de exemplo, casos de borda e explicações de limites",
          "Descrições ambíguas ou sobrepostas causam falhas no roteamento (analyze_content vs analyze_document)",
          "A formulação do prompt de sistema afeta a seleção de ferramentas; instruções sensíveis a palavras-chave criam associações indesejadas",
        ],
        skills: [
          "Escrever descrições que diferenciam o propósito, entradas, saídas e quando usar versus alternativas",
          "Renomear e redescrever ferramentas para eliminar sobreposições (analyze_content → extract_web_results)",
          "Dividir ferramentas genéricas em ferramentas de propósito específico com contratos de E/S definidos",
          "Revisar prompts de sistema para identificar instruções sensíveis a palavras-chave que anulam boas descrições",
        ],
      },
      {
        code: "2.2",
        title: "Implementar respostas de erro estruturadas para ferramentas MCP",
        knowledge: [
          "A flag isError do MCP para comunicar falhas de volta ao agente",
          "Erros transientes vs de validação vs de negócios vs de permissão",
          "Respostas uniformes do tipo \"Operação falhou\" impedem decisões apropriadas de recuperação",
          "Erros repetíveis vs não repetíveis; metadados estruturados evitam tentativas frustradas",
        ],
        skills: [
          "Retornar errorCategory (transient/validation/permission), booleano isRetryable e descrições legíveis",
          "Incluir retriable: false e explicações amigáveis ao cliente para violações de regras de negócios",
          "Recuperação local em subagentes para falhas transientes; propagar apenas o que não pode ser resolvido com resultados parciais",
          "Distinguir falhas de acesso (requerem decisões de repetição) de resultados vazios válidos",
        ],
      },
      {
        code: "2.3",
        title: "Distribuir ferramentas apropriadamente entre agentes e configurar a escolha de ferramenta (tool_choice)",
        knowledge: [
          "Muitas ferramentas disponíveis (18 vs 4-5) degradam a confiabilidade da seleção ao aumentar a complexidade da decisão",
          "Agentes com ferramentas fora de sua especialização tendem a usá-las incorretamente",
          "Acesso restrito a ferramentas: apenas as ferramentas necessárias para uma função, com ferramentas de função cruzada limitadas",
          "Opções de tool_choice: \"auto\", \"any\" e forçada ({\"type\": \"tool\", \"name\": \"...\"})",
        ],
        skills: [
          "Restringir o conjunto de ferramentas de cada subagente à sua função para evitar o uso indevido fora de sua especialidade",
          "Substituir ferramentas genéricas por alternativas restritas (fetch_url → load_document com validação de URL)",
          "Fornecer ferramentas de função cruzada restritas para necessidades de alta frequência (uma ferramenta verify_fact para síntese)",
          "Usar tool_choice forçada para chamar uma ferramenta específica primeiro; tool_choice: \"any\" para garantir uma chamada de ferramenta",
        ],
      },
      {
        code: "2.4",
        title: "Integrar servidores MCP em fluxos de trabalho do Claude Code e de agentes",
        knowledge: [
          "Escopo do MCP: nível de projeto (.mcp.json) para ferramentas compartilhadas vs nível de usuário (~/.claude.json) para servidores pessoais",
          "Expansão de variáveis de ambiente em .mcp.json (ex: ${GITHUB_TOKEN}) para evitar expor segredos",
          "Todas as ferramentas configuradas do servidor MCP são descobertas no momento da conexão e disponibilizadas simultaneamente",
          "Recursos MCP expõem catálogos de conteúdo para reduzir chamadas de ferramentas exploratórias",
        ],
        skills: [
          "Configurar servidores compartilhados em .mcp.json com expansão de variáveis de ambiente para tokens de autenticação",
          "Configurar servidores pessoais/experimentais em ~/.claude.json",
          "Melhorar descrições de ferramentas MCP para que o agente as prefira em relação a ferramentas nativas como Grep",
          "Escolher servidores MCP comunitários para integrações padrão; servidores personalizados para fluxos de trabalho específicos da equipe",
          "Expor catálogos de conteúdo como recursos MCP para visibilidade sem chamadas exploratórias",
        ],
      },
      {
        code: "2.5",
        title: "Selecionar e aplicar ferramentas embutidas (Read, Write, Edit, Bash, Grep, Glob) de forma eficaz",
        knowledge: [
          "Grep para busca de conteúdo (nomes de funções, mensagens de erro, importações)",
          "Glob para correspondência de padrões de caminho de arquivo (nomes/extensões)",
          "Read/Write para operações de arquivo completo; Edit para modificações direcionadas de texto exclusivo",
          "Quando o Edit falha em correspondências não exclusivas, usar Read + Write como fallback",
        ],
        skills: [
          "Selecionar Grep para busca de conteúdo de código em toda a base de código",
          "Selecionar Glob para padrões de nomenclatura (ex: **/*.test.tsx)",
          "Usar Read e depois Write quando o Edit não consegue encontrar texto de ancoragem exclusivo",
          "Construir entendimento incrementalmente: pontos de entrada com Grep, depois Read para seguir importações e rastrear fluxos",
          "Rastrear o uso de funções em módulos wrapper identificando nomes exportados e pesquisando cada um deles",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "claude-code-config",
    title: "Configuração e Fluxos de Trabalho do Claude Code",
    weight: 20,
    blurb:
      "Hierarquia do CLAUDE.md, comandos slash personalizados e skills, regras específicas de caminho, modo de planejamento vs execução direta, refinamento iterativo e integração CI/CD.",
    tasks: [
      {
        code: "3.1",
        title: "Configurar arquivos CLAUDE.md com hierarquia, escopo e organização modular adequados",
        knowledge: [
          "Hierarquia: nível de usuário (~/.claude/CLAUDE.md), nível de projeto (.claude/CLAUDE.md ou raiz), nível de diretório",
          "Configurações no nível de usuário não são compartilhadas com colegas de equipe via controle de versão",
          "Sintaxe @import para referenciar arquivos externos para manter o CLAUDE.md modular",
          "Diretório .claude/rules/ para arquivos de regras específicas de tópicos em vez de um CLAUDE.md monolítico",
        ],
        skills: [
          "Diagnosticar problemas de hierarquia (novo colega de equipe não recebendo instruções de nível de usuário)",
          "Usar @import para incluir seletivamente padrões relevantes por pacote",
          "Dividir CLAUDE.md grande em arquivos focados em .claude/rules/ (testing.md, api-conventions.md)",
          "Usar /memory para verificar quais arquivos de memória estão carregados e diagnosticar comportamento inconsistente",
        ],
      },
      {
        code: "3.2",
        title: "Criar e configurar comandos slash personalizados e skills",
        knowledge: [
          "Comando de projeto em .claude/commands/ (compartilhado) vs comandos de usuário em ~/.claude/commands/ (pessoal)",
          "Skills em .claude/skills/ com frontmatter SKILL.md: context: fork, allowed-tools, argument-hint",
          "context: fork executa uma skill em um contexto de subagente isolado para evitar poluir a conversa principal",
          "Variantes de skill pessoais em ~/.claude/skills/ com nomes diferentes para evitar afetar colegas de equipe",
        ],
        skills: [
          "Criar comandos slash de escopo do projeto em .claude/commands/ para disponibilidade de toda a equipe",
          "Usar context: fork para isolar skills verbosas ou exploratórias da sessão principal",
          "Configurar allowed-tools no frontmatter para restringir o acesso a ferramentas durante a execução da skill",
          "Usar argument-hint para solicitar parâmetros obrigatórios",
          "Escolher skills (sob demanda) vs CLAUDE.md (padrões universais sempre carregados)",
        ],
      },
      {
        code: "3.3",
        title: "Aplicar regras específicas de caminho para carregamento condicional de convenções",
        knowledge: [
          "Arquivos .claude/rules/ com globs de caminhos no frontmatter YAML para ativação condicional",
          "Regras de escopo de caminho são carregadas apenas ao editar arquivos correspondentes, reduzindo o contexto irrelevante e tokens",
          "Regras de padrão glob superam o CLAUDE.md de diretório para convenções que abrangem múltiplos diretórios",
        ],
        skills: [
          "Criar arquivos .claude/rules/ com escopo de caminho (ex: paths: [\"terraform/**/*\"])",
          "Usar globs para aplicar convenções por tipo de arquivo, independentemente do diretório (**/*.test.tsx)",
          "Escolher regras específicas de caminho em vez de CLAUDE.md de subdiretório quando os arquivos estão espalhados pela base de código",
        ],
      },
      {
        code: "3.4",
        title: "Determinar quando usar o modo de planejamento (plan mode) vs execução direta",
        knowledge: [
          "Modo de planejamento: tarefas complexas, alterações em larga escala, múltiplas abordagens válidas, decisões arquiteturais, edições de múltiplos arquivos",
          "Execução direta: alterações simples e bem delimitadas (uma única verificação de validação)",
          "O modo de planejamento permite exploração e design seguros antes do commit, evitando retrabalho caro",
          "O subagente Explore isola a descoberta verbosa e retorna resumos para preservar o contexto",
        ],
        skills: [
          "Selecionar o modo de planejamento para tarefas arquiteturais (reestruturação de microsserviços, migrações de bibliotecas em mais de 45 arquivos)",
          "Selecionar a execução direta para alterações bem compreendidas (uma correção de bug em arquivo único com rastreamento de pilha claro)",
          "Usar o subagente Explore para fases de descoberta verbosas para evitar a exaustão do contexto",
          "Combinar o modo de planejamento para investigação com a execução direta para implementação",
        ],
      },
      {
        code: "3.5",
        title: "Aplicar técnicas de refinamento iterativo para melhoria progressiva",
        knowledge: [
          "Exemplos concretos de entrada/saída comunicam as transformações esperadas melhor do que prosa",
          "Iteração orientada a testes: escrever suítes de testes primeiro, depois iterar compartilhando falhas",
          "O padrão de entrevista: fazer o Claude fazer perguntas para levantar considerações primeiro",
          "Mensagem única para problemas interativos vs correções sequenciais para problemas independentes",
        ],
        skills: [
          "Fornecer 2 a 3 exemplos concretos de entrada/saída quando a prosa produz resultados inconsistentes",
          "Escrever suítes de testes para comportamento, casos de borda e desempenho, e depois iterar nas falhas",
          "Usar o padrão de entrevista para levantar considerações de design em domínios desconhecidos",
          "Abordar problemas interligados em uma mensagem detalhada; iteração sequencial para problemas independentes",
        ],
      },
      {
        code: "3.6",
        title: "Integrar o Claude Code em pipelines de CI/CD",
        knowledge: [
          "A flag -p / --print para execução não interativa em pipelines",
          "--output-format json e --json-schema para saída estruturada no CI",
          "CLAUDE.md como o mecanismo para fornecer contexto do projeto ao Claude Code invocado pelo CI",
          "Isolamento de sessão: uma instância de revisão separada é mais eficaz do que a autorrevisão do código gerado",
        ],
        skills: [
          "Executar o Claude Code no CI com -p para evitar travamentos interativos",
          "Usar --output-format json com --json-schema para descobertas analisáveis por máquina para postar como comentários de PR",
          "Incluir descobertas anteriores ao executar novamente revisões para que apenas problemas novos/não resolvidos sejam relatados",
          "Fornecer arquivos de teste existentes para que a geração evite cenários duplicados",
          "Documentar padrões de teste e fixtures no CLAUDE.md para melhorar a qualidade do teste",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "prompt-engineering",
    title: "Engenharia de Prompt e Saída Estruturada",
    weight: 20,
    blurb:
      "Critérios explícitos para reduzir falsos positivos, poucas tentativas (few-shot prompting), saída estruturada via tool_use e schemas JSON, loops de validação/repetição, processamento em lote e revisão de múltiplas passagens.",
    tasks: [
      {
        code: "4.1",
        title: "Projetar prompts com critérios explícitos para melhorar a precisão e reduzir falsos positivos",
        knowledge: [
          "Critérios explícitos superam instruções vagas (sinalizar comentários apenas quando o comportamento alegado contradiz o código real)",
          "\"Seja conservador\" / \"apenas alta confiança\" falham em comparação com critérios categóricos específicos",
          "Categorias com altos falsos positivos minam a confiança do desenvolvedor nas categorias precisas",
        ],
        skills: [
          "Escrever critérios específicos definindo quais problemas relatar vs ignorar, em vez de filtragem por nível de confiança",
          "Desativar temporariamente categorias com muitos falsos positivos para restaurar a confiança enquanto melhora os prompts",
          "Definir critérios explícitos de severidade com exemplos de código concretos para cada nível",
        ],
      },
      {
        code: "4.2",
        title: "Aplicar few-shot prompting para melhorar a consistência e a qualidade da saída",
        knowledge: [
          "Exemplos few-shot são a técnica mais eficaz para saída consistente e acionável",
          "Eles demonstram o tratamento de casos ambíguos (seleção de ferramentas, lacunas de cobertura no nível de ramificação)",
          "Eles permitem a generalização para novos padrões em vez de corresponder apenas aos casos especificados",
          "Eles reduzem alucinações na extração (medições informais, estruturas variadas)",
        ],
        skills: [
          "Criar 2 a 4 exemplos direcionados para cenários ambíguos que mostram o raciocínio para a ação escolhida",
          "Incluir exemplos demonstrando o formato de saída (localização, problema, severidade, correção sugerida)",
          "Distinguir padrões aceitáveis de problemas reais para reduzir falsos positivos enquanto generaliza",
          "Demonstrar o tratamento correto de variadas estruturas e formatos de documentos",
        ],
      },
      {
        code: "4.3",
        title: "Impor saída estruturada usando chamadas de ferramentas (tool use) e schemas JSON",
        knowledge: [
          "tool_use com schemas JSON é a abordagem mais confiável para saídas em conformidade com o schema, eliminando erros de sintaxe",
          "opções de tool_choice: \"auto\" (pode retornar texto), \"any\" (deve chamar uma ferramenta), forçada (deve chamar uma ferramenta nomeada)",
          "Schemas rígidos eliminam erros de sintaxe, mas não erros semânticos (itens de linha não somando, campos incorretos)",
          "Design de schema: obrigatório vs opcional, tipo enum com padrões \"outro\" + detalhes para categorias extensíveis",
        ],
        skills: [
          "Definir ferramentas de extração com schemas JSON e extrair dados da resposta tool_use",
          "Configurar tool_choice: \"any\" para garantir a saída quando o tipo de documento é desconhecido",
          "Forçar tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"} para executar antes do enriquecimento",
          "Projetar campos anuláveis (nullable) para que o modelo retorne null em vez de fabricar valores",
          "Adicionar valores de enum como \"unclear\" / \"other\" + detalhes para casos ambíguos e extensíveis",
          "Incluir regras de normalização de formato nos prompts juntamente com schemas rígidos",
        ],
      },
      {
        code: "4.4",
        title: "Implementar loops de validação, repetição e feedback para qualidade de extração",
        knowledge: [
          "Repetição com feedback de erro: anexar erros específicos de validação na nova tentativa para guiar a correção",
          "As tentativas de repetição são ineficazes quando a informação necessária simplesmente está ausente da fonte",
          "Design de feedback: rastrear quais estruturas acionam descobertas (detected_pattern) para análise de descarte",
          "Erros de validação semântica vs erros de sintaxe do schema (eliminados pelo uso de ferramentas)",
        ],
        skills: [
          "Solicitações de acompanhamento incluindo o documento, extração com falha e erros específicos para autocorreção",
          "Identificar quando as repetições ajudam (formativo/estrutural) vs quando não ajudam (informação ausente da fonte)",
          "Adicionar campos detected_pattern para permitir a análise de padrões de falsos positivos",
          "Fluxos de autocorreção: total_calculado vs total_declarado, booleanos conflito_detectado",
        ],
      },
      {
        code: "4.5",
        title: "Projetar estratégias eficientes de processamento em lote",
        knowledge: [
          "Message Batches API: 50% de economia de custos, janela de até 24 horas, sem SLA de latência garantido",
          "Apropriado para cargas de trabalho tolerantes à latência e sem bloqueio; inapropriado para verificações pré-merge de bloqueio",
          "A API de Lote não suporta chamadas de ferramentas de múltiplos turnos dentro de uma única requisição",
          "Campos custom_id correlacionam os pares de requisição/resposta do lote",
        ],
        skills: [
          "Combinar a API com as necessidades de latência: síncrona para verificações de bloqueio, lote para análise noturna/semanal",
          "Calcular a frequência de envio a partir das restrições de SLA (janelas de 4 horas para um SLA de 30 horas)",
          "Tratar falhas reenviando apenas os documentos que falharam (por custom_id) com correções como divisão em partes (chunking)",
          "Refinar prompts em um conjunto de amostra antes de processar grandes volumes em lote",
        ],
      },
      {
        code: "4.6",
        title: "Projetar arquiteturas de revisão com múltiplas instâncias e passagens",
        knowledge: [
          "A autorrevisão é limitada: um modelo retém o raciocínio da geração e raramente questiona suas próprias decisões",
          "Instâncias de revisão independentes capturam problemas sutis melhor do que a autorrevisão ou o pensamento estendido",
          "Revisão de múltiplas passagens: passagens locais por arquivo mais integração entre arquivos para evitar a diluição da atenção",
        ],
        skills: [
          "Usar uma segunda instância independente para revisar o código gerado sem o contexto do gerador",
          "Dividir revisões grandes em passagens por arquivo mais passagens de integração separadas",
          "Executar passagens de verificação onde o modelo relata a confiança por si mesmo para roteamento calibrado",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "context-reliability",
    title: "Gerenciamento de Contexto e Confiabilidade",
    weight: 15,
    blurb:
      "Preservar informações críticas em interações longas, escalada e resolução de ambiguidades, propagação de erros, contexto de grandes bases de código, revisão humana e calibração de confiança, e proveniência.",
    tasks: [
      {
        code: "5.1",
        title: "Gerenciar o contexto da conversa para preservar informações críticas em interações longas",
        knowledge: [
          "A sumarização progressiva corre o risco de condensar números, porcentagens, datas e expectativas do cliente em resumos vagos",
          "O efeito \"perdido no meio\" (lost in the middle): confiável no início/fim, pode omitir descobertas do meio",
          "Os resultados das ferramentas se acumulam e consomem tokens desproporcionalmente (mais de 40 campos quando 5 são relevantes)",
          "Passar o histórico completo da conversa nas requisições subsequentes mantém a coerência",
        ],
        skills: [
          "Extrair fatos transacionais em um bloco persistente de \"fatos do caso\" incluído em cada prompt",
          "Persistir dados estruturados de problemas em uma camada de contexto separada para sessões com múltiplos problemas",
          "Reduzir saídas de ferramentas longas aos campos relevantes antes que se acumulem",
          "Colocar descobertas importantes no início e usar cabeçalhos de seção explícitos para mitigar os efeitos de posição",
          "Exigir que os subagentes incluam metadados em saídas estruturadas para uma síntese precisa",
          "Retornar dados estruturados em vez de conteúdo longo quando os orçamentos de tokens subsequentes são limitados",
        ],
      },
      {
        code: "5.2",
        title: "Projetar padrões eficazes de escalada e resolução de ambiguidades",
        knowledge: [
          "Gatilhos de escalada: solicitações dos clientes por um humano, lacunas/exceções de política, incapacidade de progredir",
          "Escalar imediatamente quando explicitamente solicitado vs oferecer para resolver quando for simples",
          "Escala baseada em sentimento e confiança autorrelatada são indicadores não confiáveis para complexidade",
          "Múltiplas correspondências de clientes exigem esclarecimento, não seleção por heurística",
        ],
        skills: [
          "Adicionar critérios de escalada explícitos com exemplos few-shot ao prompt do sistema",
          "Atender a solicitações explícitas de agentes humanos imediatamente, sem investigar primeiro",
          "Reconhecer a frustração enquanto oferece resolução, escalando apenas se o cliente reiterar",
          "Escalar quando a política for ambígua ou omissa sobre a solicitação específica",
          "Solicitar identificadores adicionais quando os resultados retornarem múltiplas correspondências",
        ],
      },
      {
        code: "5.3",
        title: "Implementar estratégias de propagação de erros em sistemas de múltiplos agentes",
        knowledge: [
          "Contexto de erro estruturado (tipo de falha, consulta tentada, resultados parciais, alternativas) permite a recuperação",
          "Falhas de acesso (timeouts que precisam de decisões de repetição) vs resultados vazios válidos",
          "Status genéricos (\"busca indisponível\") ocultam contextos valiosos do coordenador",
          "Suprimir erros silenciosamente ou encerrar fluxos de trabalho inteiros em uma única falha são antipadrões",
        ],
        skills: [
          "Retornar contexto de erro estruturado com tipo de falha, tentativa, resultados parciais e alternativas",
          "Distinguir falhas de acesso de resultados vazios válidos nos relatórios",
          "Recuperação local para falhas transientes; propagar apenas erros não resolvidos com resultados parciais",
          "Estruturar a síntese com anotações de cobertura marcando áreas bem suportadas vs com lacunas",
        ],
      },
      {
        code: "5.4",
        title: "Gerenciar o contexto de forma eficaz na exploração de grandes bases de código",
        knowledge: [
          "Degradação do contexto: respostas inconsistentes e referências a \"padrões típicos\" em vez das classes descobertas",
          "Arquivos de rascunho (scratchpad) persistem as principais descobertas além dos limites do contexto",
          "A delegação de subagentes isola a exploração verbosa enquanto o agente principal coordena",
          "Persistência de estado estruturada para recuperação de falhas via um manifesto carregado na retomada",
        ],
        skills: [
          "Criar subagentes para perguntas específicas enquanto o agente principal preserva a coordenação de alto nível",
          "Manter arquivos de rascunho das principais descobertas para neutralizar a degradação",
          "Sumarizar cada fase antes de criar subagentes para a próxima, injetando resumos",
          "Projetar a recuperação de falhas com exportações de estado estruturadas (manifestos) carregadas ao retomar",
          "Usar /compact para reduzir o uso do contexto durante a exploração estendida",
        ],
      },
      {
        code: "5.5",
        title: "Projetar fluxos de trabalho de revisão humana e calibração de confiança",
        knowledge: [
          "A precisão agregada (97% no geral) pode mascarar um desempenho ruim em tipos de documentos ou campos específicos",
          "A amostragem aleatória estratificada mede as taxas de erro e detecta novos padrões",
          "Pontuações de confiança no nível do campo calibradas com conjuntos de validação rotulados direcionam a atenção da revisão",
          "Validar a precisão por tipo de documento e campo antes de automatizar extrações de alta confiança",
        ],
        skills: [
          "Amostragem aleatória estratificada de extrações de alta confiança para medição contínua de erros",
          "Analisar a precisão por tipo de documento e campo antes de reduzir a revisão humana",
          "Emitir pontuações de confiança no nível do campo, calibrando limiares com conjuntos rotulados",
          "Roteamento de extrações de baixa confiança ou contraditórias para revisão humana",
        ],
      },
      {
        code: "5.6",
        title: "Preservar a proveniência da informação e lidar com a incerteza na síntese de múltiplas fontes",
        knowledge: [
          "A atribuição da fonte é perdida durante a sumarização quando os mapeamentos de alegação-fonte não são preservados",
          "Mapeamentos estruturados de alegação-fonte devem ser preservados e mesclados durante a síntese",
          "Estatísticas conflitantes: anotar com atribuição da fonte em vez de selecionar uma arbitrariamente",
          "Dados temporais: exigir datas de publicação/coleta para evitar interpretar incorretamente diferenças como contradições",
        ],
        skills: [
          "Exigir que os subagentes emitam mapeamentos alegação-fonte (URLs, nomes, trechos) preservados através da síntese",
          "Estruturar relatórios para distinguir descobertas bem estabelecidas daquelas contestadas",
          "Incluir valores conflitantes explicitamente anotados, deixando a cargo do coordenador a reconciliação",
          "Exigir datas de publicação/coleta para interpretação temporal correta",
          "Renderizar tipos de conteúdo apropriadamente (financeiro como tabelas, notícias como prosa, técnico como listas)",
        ],
      },
    ],
  },
];

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Agente de Resolução de Suporte ao Cliente",
    body: "Você está construindo um agente de suporte de resolução ao cliente usando o Claude Agent SDK. Ele lida com solicitações de alta ambiguidade, como devoluções, disputas de faturamento e problemas de conta, com acesso ao backend por meio de ferramentas MCP personalizadas (get_customer, lookup_order, process_refund, escalate_to_human). A meta é 80%+ de resolução no primeiro contato, sabendo quando escalar.",
    domains: ["Arquitetura e Orquestração de Agentes", "Design de Ferramentas e Integração MCP", "Gerenciamento de Contexto e Confiabilidade"],
  },
  {
    id: 2,
    title: "Geração de Código com o Claude Code",
    body: "Você está usando o Claude Code para acelerar o desenvolvimento de software — geração, refatoração, depuração e documentação. Você precisa integrá-lo em seu fluxo de trabalho com comandos slash personalizados, configurações de CLAUDE.md e entender quando usar o modo de planejamento vs execução direta.",
    domains: ["Configuração e Fluxos de Trabalho do Claude Code", "Gerenciamento de Contexto e Confiabilidade"],
  },
  {
    id: 3,
    title: "Sistema de Pesquisa de Múltiplos Agentes",
    body: "Um agente coordenador delega para subagentes especializados: um pesquisa na web, um analisa documentos, um sintetiza as descobertas e um gera relatórios. O sistema pesquisa os tópicos e produz relatórios abrangentes e citados.",
    domains: ["Arquitetura e Orquestração de Agentes", "Design de Ferramentas e Integração MCP", "Gerenciamento de Contexto e Confiabilidade"],
  },
  {
    id: 4,
    title: "Produtividade do Desenvolvedor com o Claude",
    body: "Você está construindo ferramentas de produtividade para desenvolvedores com o Claude Agent SDK. O agente ajuda os engenheiros a explorar bases de código desconhecidas, entender sistemas legados, gerar boilerplate e automatizar tarefas repetitivas usando ferramentas embutidas (Read, Write, Bash, Grep, Glob) e servidores MCP.",
    domains: ["Design de Ferramentas e Integração MCP", "Configuração e Fluxos de Trabalho do Claude Code", "Arquitetura e Orquestração de Agentes"],
  },
  {
    id: 5,
    title: "Claude Code para Integração Contínua",
    body: "Você está integrando o Claude Code em seu pipeline de CI/CD para executar revisões de código automatizadas, gerar casos de teste e fornecer feedback de PR. Você precisa de prompts que forneçam feedback acionável e minimizem os falsos positivos.",
    domains: ["Configuração e Fluxos de Trabalho do Claude Code", "Engenharia de Prompt e Saída Estruturada"],
  },
  {
    id: 6,
    title: "Extração de Dados Estruturados",
    body: "Você está construindo um sistema de extração de dados estruturados. Ele extrai informações de documentos não estruturados, valida a saída com schemas JSON e mantém alta precisão. Deve lidar com casos de borda graciosamente e se integrar com sistemas a jusante.",
    domains: ["Engenharia de Prompt e Saída Estruturada", "Gerenciamento de Contexto e Confiabilidade"],
  },
];

export const questions: Question[] = [
  {
    id: 1,
    scenario: "Agente de Resolução de Suporte ao Cliente",
    prompt:
      "Os dados de produção mostram que em 12% dos casos o seu agente pula get_customer completamente e chama lookup_order usando apenas o nome declarado pelo cliente, ocasionalmente levando a contas identificadas incorretamente e reembolsos errados. Qual alteração resolveria mais efetivamente esse problema de confiabilidade?",
    options: [
      { key: "A", text: "Adicionar um pré-requisito programático que bloqueie as chamadas de lookup_order e process_refund até que get_customer tenha retornado um ID de cliente verificado." },
      { key: "B", text: "Melhorar o prompt do sistema para declarar que a verificação do cliente via get_customer é obrigatória antes de qualquer operação de pedido." },
      { key: "C", text: "Adicionar exemplos few-shot mostrando o agente sempre chamando get_customer primeiro, mesmo quando os clientes fornecem os detalhes do pedido voluntariamente." },
      { key: "D", text: "Implementar um classificador de roteamento que analise cada requisição e habilite apenas o subconjunto de ferramentas apropriado para aquele tipo de requisição." },
    ],
    answer: "A",
    explanation:
      "Quando uma sequência de ferramentas específica é necessária para a lógica crítica de negócios (verificar a identidade antes dos reembolsos), a aplicação programática fornece garantias determinísticas que as abordagens baseadas em prompt não conseguem. B e C dependem de conformidade probabilística do LLM, insuficiente quando os erros têm consequências financeiras. D aborda a disponibilidade de ferramentas em vez de ordenação, o que não é o problema real.",
  },
  {
    id: 2,
    scenario: "Agente de Resolução de Suporte ao Cliente",
    prompt:
      "Os logs mostram que o agente frequentemente chama get_customer quando os usuários perguntam sobre pedidos (por exemplo, \"verificar meu pedido #12345\") em vez de lookup_order. Ambas as ferramentas têm descrições mínimas e aceitam formatos de identificadores semelhantes. Qual é o primeiro passo mais eficaz para melhorar a confiabilidade da seleção de ferramentas?",
    options: [
      { key: "A", text: "Adicionar de 5 a 8 exemplos few-shot ao prompt do sistema demonstrando consultas relacionadas a pedidos roteando para lookup_order." },
      { key: "B", text: "Expandir a descrição de cada ferramenta para incluir formatos de entrada, consultas de exemplo, casos de borda e limites que explicam quando usá-la versus ferramentas semelhantes." },
      { key: "C", text: "Implementar uma camada de roteamento que analise a entrada antes de cada turno e pré-selecione a ferramenta com base em palavras-chave e padrões de identificadores detectados." },
      { key: "D", text: "Consolidar ambas as ferramentas em uma única ferramenta lookup_entity que aceite qualquer identificador e determine internamente qual backend consultar." },
    ],
    answer: "B",
    explanation:
      "As descrições de ferramentas são o principal mecanismo que os LLMs usam para seleção. B aborda diretamente essa causa raiz com uma correção de baixo esforço e alto impacto. Exemplos few-shot (A) adicionam sobrecarga de tokens sem corrigir o problema subjacente. Uma camada de roteamento (C) é superdimensionada e ignora a compreensão do LLM. Consolidar (D) é válido, mas exige mais esforço do que o justificado para um \"primeiro passo\".",
  },
  {
    id: 3,
    scenario: "Agente de Resolução de Suporte ao Cliente",
    prompt:
      "Seu agente atinge 55% de resolução no primeiro contato, bem abaixo da meta de 80%. Ele escala casos simples (substituições padrão por danos com evidência fotográfica) enquanto tenta resolver situações complexas que exigem exceções de políticas. Qual é a maneira mais eficaz de melhorar a calibração de escalada?",
    options: [
      { key: "A", text: "Adicionar critérios de escalada explícitos ao prompt do seu sistema com exemplos few-shot demonstrando quando escalar versus resolver de forma autônoma." },
      { key: "B", text: "Fazer o agente relatar uma pontuação de confiança (1-10) antes de cada resposta e rotear para humanos quando a confiança cair abaixo de um limite." },
      { key: "C", text: "Implantar um modelo de classificação separado treinado em tíquetes históricos para prever quais requisições precisam de escalada." },
      { key: "D", text: "Implementar análise de sentimento para detectar a frustração do cliente e escalar automaticamente quando o sentimento negativo exceder um limite." },
    ],
    answer: "A",
    explanation:
      "Critérios explícitos de escalada com exemplos few-shot abordam a causa raiz: limites de decisão pouco claros. B falha porque a confiança autorrelatada pelo LLM é mal calibrada — o agente já está incorretamente confiante em casos difíceis. C é superdimensionado. D resolve um problema diferente; o sentimento não se correlaciona com a complexidade.",
  },
  {
    id: 4,
    scenario: "Geração de Código com o Claude Code",
    prompt:
      "Você deseja um comando slash personalizado /review que execute a lista de verificação de revisão de código padrão da sua equipe, disponível para todos os desenvolvedores quando eles clonam ou atualizam o repositório. Onde você deve criar esse arquivo de comando?",
    options: [
      { key: "A", text: "No diretório .claude/commands/ no repositório do projeto." },
      { key: "B", text: "Em ~/.claude/commands/ no diretório inicial de cada desenvolvedor." },
      { key: "C", text: "No arquivo CLAUDE.md na raiz do projeto." },
      { key: "D", text: "Em um arquivo .claude/config.json com uma matriz de comandos." },
    ],
    answer: "A",
    explanation:
      "Os comandos slash de escopo do projeto ficam em .claude/commands/ dentro do repositório — sob controle de versão e disponíveis automaticamente para todos que clonam ou atualizam o repositório. B é para comandos pessoais não compartilhados via controle de versão. C é para o contexto do projeto, não para definições de comandos. D descreve um mecanismo que não existe no Claude Code.",
  },
  {
    id: 5,
    scenario: "Geração de Código com o Claude Code",
    prompt:
      "Você deve reestruturar a aplicação monolítica da equipe em microsserviços — alterações em dezenas de arquivos, com decisões sobre limites de serviços e dependências de módulos. Qual abordagem você deve adotar?",
    options: [
      { key: "A", text: "Entrar no modo de planejamento (plan mode) para explorar a base de código, entender as dependências e projetar uma abordagem de implementação antes de fazer alterações." },
      { key: "B", text: "Começar com a execução direta e fazer alterações incrementalmente, permitindo que a implementação revele os limites naturais do serviço." },
      { key: "C", text: "Usar a execução direta com instruções iniciais abrangentes detalhando exatamente como cada serviço deve ser estruturado." },
      { key: "D", text: "Iniciar no modo de execução direta e alternar para o modo de planejamento apenas se encontrar complexidades inesperadas durante a implementação." },
    ],
    answer: "A",
    explanation:
      "O modo de planejamento foi projetado para alterações em larga escala, múltiplas abordagens válidas e decisões arquiteturais — exatamente o que a migração de monólito para microsserviços exige. B corre o risco de retrabalho caro quando as dependências surgirem tardiamente. C assume que você já conhece a estrutura correta. D ignora o fato de que a complexidade já está declarada nos requisitos.",
  },
  {
    id: 6,
    scenario: "Geração de Código com o Claude Code",
    prompt:
      "Sua base de código possui áreas distintas com convenções diferentes. Os arquivos de teste estão espalhados junto com o código que testam (por exemplo, Button.test.tsx ao lado de Button.tsx), e você deseja que todos os testes sigam as mesmas convenções, independentemente da localização. Qual é a maneira mais sustentável de garantir que o Claude aplique automaticamente as convenções corretas?",
    options: [
      { key: "A", text: "Criar arquivos de regras em .claude/rules/ com frontmatter YAML especificando padrões glob para aplicar condicionalmente convenções com base nos caminhos de arquivo." },
      { key: "B", text: "Consolidar todas as convenções no CLAUDE.md raiz sob cabeçalhos para cada área, confiando que o Claude infira qual seção se aplica." },
      { key: "C", text: "Criar skills em .claude/skills/ para cada tipo de código que incluam as convenções relevantes em seus arquivos SKILL.md." },
      { key: "D", text: "Colocar arquivos CLAUDE.md idênticos em cada subdiretório que contenha código de teste para garantir a conformidade local." },
    ],
    answer: "A",
    explanation:
      "Os arquivos .claude/rules/ com correspondência de padrões glob no frontmatter permitem que as convenções de caminhos de arquivos correspondentes (como arquivos de teste) sejam aplicadas em todo o repositório sem manutenção redundante de arquivos. B é propenso a erros de contexto. C destina-se a comportamentos sob demanda, não a regras universais. D cria um pesadelo de manutenção devido à duplicação de arquivos.",
  },
  {
    id: 7,
    scenario: "Sistema de Pesquisa de Múltiplos Agentes",
    prompt:
      "Seu agente coordenador pesquisa tópicos complexos delegando tarefas para subagentes. Você deseja maximizar o desempenho acelerando a execução. Qual projeto de fluxo de trabalho atinge isso melhor?",
    options: [
      { key: "A", text: "Fazer o coordenador gerar chamadas de ferramentas Task paralelas em uma única resposta para iniciar subagentes simultaneamente." },
      { key: "B", text: "Fazer o coordenador encadear subagentes sequencialmente, passando o histórico completo da conversa para o próximo na fila." },
      { key: "C", text: "Prover uma única ferramenta de pesquisa de uso geral e confiar na autoavaliação do modelo para gerenciar o progresso." },
      { key: "D", text: "Limitar o coordenador a invocar um subagente de cada vez para evitar a sobrecarga de context do loop principal." },
    ],
    answer: "A",
    explanation:
      "O Agent SDK e a API do Claude suportam a invocação de múltiplas ferramentas em um único turno. Fazer o coordenador gerar múltiplas chamadas Task de forma paralela permite a execução simultânea dos subagentes, reduzindo consideravelmente a latência total em comparação com chamadas sequenciais.",
  },
  {
    id: 8,
    scenario: "Sistema de Pesquisa de Múltiplos Agentes",
    prompt:
      "O subagente de análise de documentos falha devido a um timeout de API ao processar um PDF grande de um fornecedor. O coordenador precisa desses resultados para responder ao usuário. Qual é a melhor abordagem de propagação de erro?",
    options: [
      { key: "A", text: "O subagente deve retornar um erro estruturado detalhando a falha (tipo, consulta, etc.) e indicar se é repetível, permitindo que o coordenador decida se tenta novamente ou busca alternativas." },
      { key: "B", text: "O subagente deve retornar uma mensagem de erro genérica \"busca indisponível\" para evitar poluir a janela de contexto com logs técnicos." },
      { key: "C", text: "O coordenador deve interceptar a falha de rede e encerrar a sessão imediatamente para garantir a integridade dos dados." },
      { key: "D", text: "O subagente deve ignorar o erro silenciosamente e retornar uma lista vazia de descobertas para que o pipeline prossiga sem interrupções." },
    ],
    answer: "A",
    explanation:
      "Erros estruturados (com categorias como transiente/validação e a flag isRetryable) fornecem informações valiosas para que o coordenador tome decisões informadas de tratamento de erros. B esconde o contexto necessário. C é muito drástico para um erro de rede. D mascara uma falha real como se não houvesse dados, o que é um antipadrão de confiabilidade.",
  },
  {
    id: 9,
    scenario: "Produtividade do Desenvolvedor com o Claude",
    prompt:
      "Você está criando uma skill personalizada para refatorar imports obsoletos. Você quer garantir que o subagente que executa essa skill não execute comandos Bash arbitrários ou edite arquivos fora do escopo. Como configurar isso?",
    options: [
      { key: "A", text: "Definir frontmatter YAML com context: fork e uma lista restrita de allowed-tools (ex: Read, Edit) no arquivo SKILL.md." },
      { key: "B", text: "Incluir instruções explícitas no prompt do sistema da skill instruindo o agente a não utilizar a ferramenta Bash." },
      { key: "C", text: "Criar uma instrução no CLAUDE.md raiz proibindo o uso de Bash para refatoração de importações." },
      { key: "D", text: "Configurar um hook global de interceptação do Agent SDK que rejeite chamadas de Bash iniciadas por comandos slash." },
    ],
    answer: "A",
    explanation:
      "As skills do Claude Code suportam isolamento via frontmatter. Definir context: fork executa a skill em um contexto de subagente isolado, e allowed-tools restringe deterministicamente o conjunto de ferramentas disponíveis para aquele subagente. B e C são probabilísticos. D é uma solução excessivamente rígida e global para uma necessidade específica de uma skill.",
  },
  {
    id: 10,
    scenario: "Produtividade do Desenvolvedor com o Claude",
    prompt:
      "Ao usar o Claude Code no modo não interativo em pipelines de CI/CD para automatizar análises de código, qual é o padrão recomendado para chamar comandos e capturar saídas?",
    options: [
      { key: "A", text: "Usar a flag -p / --print para enviar o prompt e capturar a resposta diretamente da saída padrão (stdout)." },
      { key: "B", text: "Definir a variável de ambiente CLAUDE_HEADLESS=true no ambiente do pipeline para desativar a interatividade." },
      { key: "C", text: "Adicionar instruções no arquivo CLAUDE.md informando ao agente para fechar a sessão ao concluir." },
      { key: "D", text: "Usar a flag --batch juntamente com redirecionamento de entrada padrão (stdin) a partir de um arquivo." },
    ],
    answer: "A",
    explanation:
      "A flag -p (ou --print) é a forma documentada de executar o Claude Code de forma não interativa: ela processa o prompt, imprime a resposta na stdout e encerra o processo. As outras opções descrevem recursos inexistentes ou soluções alternativas que não resolvem a necessidade nativamente.",
  },
  {
    id: 11,
    scenario: "Claude Code para Integração Contínua",
    prompt:
      "Dois fluxos de trabalho usam chamadas em tempo real do Claude: (1) uma verificação de bloqueio pré-merge que deve ser executada antes de os desenvolvedores integrarem seu código, e (2) um relatório de débito técnico gerado durante a noite. Seu gerente propõe mudar ambos para a Message Batches API para obter 50% de economia de custos. Como avaliar essa proposta?",
    options: [
      { key: "A", text: "Usar processamento em lote (batches) apenas para o relatório de débito técnico; manter chamadas síncronas para a verificação pré-merge." },
      { key: "B", text: "Mudar ambos os fluxos para processamento em lote e implementar polling de status para verificar a conclusão." },
      { key: "C", text: "Manter chamadas em tempo real em ambos os fluxos para evitar problemas de ordenação nos resultados do lote." },
      { key: "D", text: "Mudar ambos os fluxos para lote e configurar um fallback de timeout para chamadas em tempo real se o lote demorar muito." },
    ],
    answer: "A",
    explanation:
      "A Batches API oferece 50% de desconto, mas com uma janela de processamento de até 24 horas sem garantia de latência — inadequada para verificações pré-merge de bloqueio de desenvolvedores, mas excelente para relatórios noturnos tolerantes a latência. B não é viável para fluxos bloqueantes. C reflete um equívoco (custom_id correlaciona requisição/resposta). D introduz complexidade excessiva sem necessidade real.",
  },
  {
    id: 12,
    scenario: "Claude Code para Integração Contínua",
    prompt:
      "Um PR altera 14 arquivos. Sua revisão de passagem única produz resultados inconsistentes: feedbacks detalhados para alguns arquivos, superficiais para outros, bugs óbvios não detectados e comentários contraditórios (sinalizando um padrão em um arquivo enquanto aprova o mesmo código em outro). Como você deve reestruturar essa revisão?",
    options: [
      { key: "A", text: "Dividir a revisão em passagens focadas: analisar cada arquivo individualmente para problemas locais e, em seguida, executar uma passagem de integração focada no fluxo de dados entre arquivos." },
      { key: "B", text: "Exigir que os desenvolvedores dividam PRs grandes em submissões menores de 3 a 4 arquivos antes de rodar a revisão automatizada." },
      { key: "C", text: "Mudar para um modelo de nível superior com uma janela de contexto maior para dar atenção adequada aos 14 arquivos em uma única passagem." },
      { key: "D", text: "Executar três passagens de revisão independentes no PR completo e relatar apenas os problemas que aparecerem em pelo menos duas das três passagens." },
    ],
    answer: "A",
    explanation:
      "Dividir a revisão em passagens focadas aborda a causa raiz: a diluição de atenção ao processar muitos arquivos de uma vez. O exame arquivo por arquivo garante profundidade consistente; uma passagem separada de integração captura problemas de fluxo cruzado. B transfere a carga de trabalho para o desenvolvedor. C ignora o fato de que maior contexto não garante qualidade de atenção. D suprime bugs legítimos ao exigir consenso em problemas identificados intermitentemente.",
  },
];

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Construir um Agente Multi-Ferramenta com Lógica de Escalada",
    objective:
      "Praticar o design de um loop de agente com integração de ferramentas, tratamento estruturado de erros e padrões de escalada.",
    steps: [
      "Definir 3-4 ferramentas MCP com descrições detalhadas que diferenciam claramente o propósito, as entradas e os limites. Incluir pelo menos duas ferramentas semelhantes que exijam uma descrição cuidadosa para evitar confusão de seleção.",
      "Implementar um loop de agente que verifique stop_reason para decidir se continua a execução da ferramenta ou apresenta a resposta final. Tratar \"tool_use\" e \"end_turn\" corretamente.",
      "Adicionar respostas de erros estruturadas: errorCategory (transient/validation/permission), booleano isRetryable e descrições amigáveis. Testar se o agente repete erros transientes e relata erros de lógica.",
      "Implementar um hook programático interceptando chamadas de ferramentas para impor uma regra de negócios (ex: bloquear operações acima de um limite), redirecionando para um fluxo de trabalho de escalada.",
      "Testar com mensagens contendo múltiplos tópicos e verificar se o agente decompõe a requisição, trata cada tópico e sintetiza uma resposta unificada.",
    ],
    domains: ["Domínio 1", "Domínio 2", "Domínio 5"],
  },
  {
    id: 2,
    title: "Configurar o Claude Code para um Fluxo de Trabalho de Equipe",
    objective:
      "Praticar a configuração de hierarquias de CLAUDE.md, comandos slash personalizados, regras específicas de caminho e integração com servidores MCP.",
    steps: [
      "Criar um arquivo CLAUDE.md no nível do projeto com padrões de codificação e testes universais. Verificar se as instruções do projeto são aplicadas a todos os membros da equipe.",
      "Criar arquivos em .claude/rules/ com padrões glob de caminhos no frontmatter YAML (ex: paths: [\"src/api/**/*\"], paths: [\"**/*.test.*\"]). Testar se as regras são carregadas apenas ao editar arquivos correspondentes.",
      "Criar uma skill de escopo de projeto em .claude/skills/ com context: fork e restrições de allowed-tools. Verificar se ela roda isoladamente sem poluir a conversa principal.",
      "Configurar um servidor MCP em .mcp.json com expansão de variáveis de ambiente para credenciais. Adicionar um servidor pessoal em ~/.claude.json e verificar se ambos estão disponíveis simultaneamente.",
      "Testar o modo de planejamento versus execução direta em uma correção simples de arquivo único, uma migração de biblioteca em múltiplos arquivos e uma nova funcionalidade com múltiplas abordagens válidas. Observar quando o modo de planejamento agrega valor.",
    ],
    domains: ["Domínio 3", "Domínio 2"],
  },
  {
    id: 3,
    title: "Construir um Pipeline de Extração de Dados Estruturados",
    objective:
      "Praticar o design de schemas JSON, o uso de tool_use para saídas estruturadas, loops de validação-repetição e processamento em lote.",
    steps: [
      "Definir uma ferramenta de extração com campos obrigatórios e opcionais, um enum com padrão \"outro\" + detalhes, e campos anuláveis. Processar documentos onde alguns campos estão ausentes e verificar se o modelo retorna null em vez de fabricar valores.",
      "Implementar um loop de validação-repetição: em caso de falha de validação, enviar uma requisição de acompanhamento contendo o documento, a extração que falhou e o erro específico. Rastrear quais erros são solucionáveis (formato) vs não solucionáveis (informação ausente).",
      "Adicionar exemplos few-shot demonstrando extração de formatos variados (citações inline vs bibliografias, narrativas vs tabelas) e verificar a melhoria no comportamento.",
      "Submeter um lote de 100 documentos via Message Batches API, tratar falhas por custom_id, resubmeter com modificações (ex: dividir documentos grandes) e calcular o tempo de processamento em relação às restrições de SLA.",
      "Fazer o modelo retornar pontuações de confiança no nível do campo, rotear extrações de baixa confiança para revisão humana e analisar a precisão por tipo de documento e campo.",
    ],
    domains: ["Domínio 4", "Domínio 5"],
  },
  {
    id: 4,
    title: "Projetar e Depurar um Pipeline de Pesquisa de Múltiplos Agentes",
    objective:
      "Praticar a orquestração de subagentes, gerenciamento de passagem de contexto, propagação de erros e síntese com rastreamento de proveniência.",
    steps: [
      "Construir um coordenador que delegue para pelo menos dois subagentes (pesquisa web, análise de documentos). Garantir que allowedTools inclua \"Task\" e que cada subagente receba as descobertas diretamente no prompt.",
      "Implementar execução paralela de subagentes através de múltiplas chamadas Task em uma única resposta. Medir a melhoria na latência em comparação com a execução sequencial.",
      "Projetar uma saída estruturada de subagente separando conteúdo de metadados: cada descoberta deve incluir uma alegação, trecho de evidência, URL/nome da fonte e data de publicação. Verificar se a síntese preserva a atribuição.",
      "Simular um timeout de subagente e verificar se o coordenador recebe um contexto de erro estruturado, pode prosseguir com resultados parciais e anotar lacunas de cobertura.",
      "Testar com dados de fontes conflitantes e verificar se a síntese preserva ambos os valores explicitamente com atribuição, em vez de selecionar um arbitrariamente, diferenciando fatos estabelecidos de descobertas contestadas.",
    ],
    domains: ["Domínio 1", "Domínio 2", "Domínio 5"],
  },
];

export const appendix = {
  technologies: [
    { name: "Claude Agent SDK", detail: "Definições de agentes, loops de agentes, tratamento de stop_reason, hooks (PostToolUse, interceptação de chamada de ferramenta), criação de subagentes via ferramenta Task, configuração de allowedTools" },
    { name: "Model Context Protocol (MCP)", detail: "Servidores MCP, ferramentas, recursos, flag isError, descrições de ferramentas, distribuição de ferramentas, configuração do .mcp.json, expansão de variáveis de ambiente" },
    { name: "Claude Code", detail: "Hierarquia do CLAUDE.md (usuário/projeto/diretório), escopo de caminho em .claude/rules/, .claude/commands/, frontmatter do .claude/skills/ (context: fork, allowed-tools, argument-hint), modo de planejamento, execução direta, /memory, /compact, --resume, fork_session, subagente Explore" },
    { name: "Claude Code CLI", detail: "-p / --print para modo não interativo, --output-format json, --json-schema para saída estruturada no CI" },
    { name: "Claude API", detail: "tool_use com schemas JSON, tool_choice (\"auto\", \"any\", forçada), stop_reason (\"tool_use\", \"end_turn\"), max_tokens, prompts de sistema" },
    { name: "Message Batches API", detail: "50% de economia de custos, janela de até 24 horas, correlação por custom_id, polling, sem suporte a chamadas de ferramentas de múltiplos turnos" },
    { name: "JSON Schema", detail: "Obrigatório vs opcional, tipos enum, campos anuláveis (nullable), padrões \"outro\" + detalhes, modo strict para eliminação de erros de sintaxe" },
    { name: "Pydantic", detail: "Validação de schema, erros de validação semântica, loops de validação-repetição" },
    { name: "Ferramentas embutidas", detail: "Read, Write, Edit, Bash, Grep, Glob — propósitos e critérios de seleção" },
    { name: "Few-shot prompting", detail: "Exemplos direcionados para cenários ambíguos, demonstração de formato, redução de falsos positivos" },
    { name: "Prompt chaining", detail: "Decomposição sequencial de tarefas em passagens focadas" },
    { name: "Gerenciamento de janela de contexto", detail: "Orçamentos de tokens, sumarização progressiva, lost-in-the-middle, extração de contexto, arquivos scratchpad" },
    { name: "Gerenciamento de sessão", detail: "Retomada, fork_session, sessões nomeadas, isolamento de contexto de sessão" },
    { name: "Pontuação de confiança", detail: "Confiança no nível de campo, calibração com conjuntos de validação rotulados, amostragem estratificada" },
  ],
  inScope: [
    "Implementação de loop de agente: fluxo de controle no stop_reason, tratamento do resultado da ferramenta, condições de término",
    "Orquestração de múltiplos agentes: padrões coordenador-subagente, decomposição, execução paralela, refinamento iterativo",
    "Gerenciamento de contexto do subagente: passagem explícita de contexto, persistência de estado estruturada, recuperação de falhas via manifestos",
    "Design de interface de ferramenta: descrições eficazes, divisão vs consolidação, nomeação para reduzir ambiguidade",
    "Design de ferramenta e recurso MCP: recursos para catálogos, ferramentas para ações, qualidade da descrição para adoção",
    "Configuração de servidor MCP: escopo de projeto vs usuário, expansão de variáveis de ambiente, acesso multi-servidor",
    "Tratamento e propagação de erros: respostas estruturadas, transiente vs negócios vs permissão, recuperação local",
    "Tomada de decisão de escalada: critérios explícitos, atendimento a preferências de clientes, identificação de lacunas de políticas",
    "Configuração do CLAUDE.md: hierarquia, padrões de @import, globs do .claude/rules/",
    "Comandos e skills personalizados: escopo de projeto vs usuário, context: fork, allowed-tools, argument-hint",
    "Modo de planejamento vs execução direta: avaliação de complexidade, decisões arquiteturais, alterações de arquivo único",
    "Refinamento iterativo: exemplos de E/S, iteração orientada a testes, padrão de entrevista, sequencial vs paralelo",
    "Saída estruturada via tool_use: design de schema, tool_choice, campos anuláveis para evitar alucinações",
    "Few-shot prompting: direcionamento de ambiguidades, consistência de formato, redução de falsos positivos",
    "Processamento em lote: adequação do caso de uso, tolerância à latência, tratamento de falhas por custom_id",
    "Otimização da janela de contexto: redução de saídas, extração estruturada de fatos, ordenação ciente da posição",
    "Fluxos de trabalho de revisão humana: calibração de confiança, amostragem estratificada, segmentação de precisão",
    "Proveniência da informação: mapeamento alegação-fonte, dados temporais, anotações de conflito, lacunas de cobertura",
  ],
  outOfScope: [
    "Ajuste fino (fine-tuning) de modelos Claude ou treinamento de modelos personalizados",
    "Autenticação, faturamento ou gerenciamento de conta da Claude API",
    "Implementação detalhada de linguagens de programação ou frameworks específicos",
    "Implantação ou hospedagem de servidores MCP (infraestrutura, rede, orquestração)",
    "Arquitetura interna do Claude, processo de treinamento ou pesos do modelo",
    "Constitutional AI, RLHF ou metodologias de treinamento de segurança",
    "Modelos de incorporação (embeddings) ou detalhes de implementação de bancos de dados vetoriais",
    "Uso do computador (automação do navegador, interação com o desktop)",
    "Capacidades de análise de imagem/visão",
    "Implementação de streaming da API ou server-sent events",
    "Limite de taxas, cotas ou cálculos de preços da API",
    "OAuth, rotação de chaves de API ou detalhes do protocolo de autenticação",
    "Configurações específicas de provedores de nuvem (AWS, GCP, Azure)",
    "Benchmarking de desempenho ou métricas de comparação de modelos",
    "Detalhes de implementação de cache de prompt (além de saber que existe)",
    "Algoritmos de contagem de tokens ou detalhes de tokenização",
  ],
  recommendations: [
    "Construir um agente com o Claude Agent SDK: um loop de agente completo com chamadas de ferramenta, tratamento de erros e gerenciamento de sessão. Praticar a criação de subagentes e passagem de contexto.",
    "Configurar o Claude Code para um projeto real: hierarquia de CLAUDE.md, regras específicas de caminho em .claude/rules/, skills personalizadas com frontmatter (context: fork, allowed-tools) e pelo menos um servidor MCP.",
    "Projetar e testar ferramentas MCP: descrições que diferenciam ferramentas semelhantes, respostas de erro estruturadas com categorias e flags retryable, e testes de confiabilidade de seleção com requisições ambíguas.",
    "Construir um pipeline de extração de dados estruturados: tool_use com schemas JSON, loops de validação-repetição, campos opcionais/anuláveis e processamento em lote com a Message Batches API.",
    "Praticar engenharia de prompt: exemplos few-shot para cenários ambíguos, critérios explícitos de revisão para reduzir falsos positivos e arquiteturas de revisão de múltiplas passagens.",
    "Estudar gerenciamento de contexto: extrair fatos estruturados de saídas longas, arquivos scratchpad para sessões longas e delegação de subagentes para gerenciar limites de contexto.",
    "Revisar escalada e padrões de humanos no circuito: quando escalar (lacunas de políticas, solicitações de clientes, incapacidade de progredir) vs resolver, e roteamento de revisão baseado em confiança.",
    "Concluir o Simulado do Exame antes de prestar a prova real — ele espelha os cenários e o formato da prova e explica as respostas para reforçar o entendimento.",
  ],
};

export const navItems = [
  { href: "/overview", label: "Visão Geral", desc: "Introdução, candidato, dados do exame" },
  { href: "/scenarios", label: "Cenários", desc: "Os 6 cenários do exame" },
  { href: "/domains", label: "Domínios", desc: "5 domínios e tópicos de tarefas" },
  { href: "/questions", label: "Perguntas de Prática", desc: "12 amostras interativas" },
  { href: "/exercises", label: "Exercícios", desc: "4 laboratórios práticos" },
  { href: "/appendix", label: "Apêndice", desc: "Tecnologia, escopo e preparação" },
];
