// Content extracted from the "Claude Certified Architect – Foundations
// Certification Exam Guide" (Version 0.1, Feb 2025). Structured for navigation.

export const meta = {
  title: "Claude Certified Architect",
  subtitle: "Foundations Certification Exam Guide",
  passingScore: 720,
  scoreRange: "100–1,000",
  format: "Multiple choice · one correct answer of four",
};

export const intro = {
  paragraphs: [
    "The Claude Certified Architect – Foundations certification validates that practitioners can make informed decisions about tradeoffs when implementing real-world solutions with Claude. This exam tests foundational knowledge across Claude Code, the Claude Agent SDK, the Claude API, and Model Context Protocol (MCP) — the core technologies used to build production-grade applications with Claude.",
    "Questions are grounded in realistic scenarios drawn from actual customer use cases, including building agentic systems for customer support, designing multi-agent research pipelines, integrating Claude Code into CI/CD workflows, building developer productivity tools, and extracting structured data from unstructured documents. Candidates must demonstrate not only conceptual knowledge but practical judgment about architecture, configuration, and tradeoffs in production deployments.",
  ],
  candidate: {
    summary:
      "The ideal candidate is a solution architect who designs and implements production applications with Claude, typically with 6+ months of hands-on experience across the Claude APIs, Agent SDK, Claude Code, and MCP.",
    bullets: [
      "Building agentic applications with the Claude Agent SDK: multi-agent orchestration, subagent delegation, tool integration, and lifecycle hooks",
      "Configuring Claude Code for team workflows using CLAUDE.md files, Agent Skills, MCP server integrations, and plan mode",
      "Designing MCP tool and resource interfaces for backend system integration",
      "Engineering prompts that produce reliable structured output with JSON schemas, few-shot examples, and extraction patterns",
      "Managing context windows across long documents, multi-turn conversations, and multi-agent handoffs",
      "Integrating Claude into CI/CD pipelines for automated code review, test generation, and PR feedback",
      "Making sound escalation and reliability decisions: error handling, human-in-the-loop workflows, and self-evaluation patterns",
    ],
  },
  examFacts: [
    {
      label: "Response types",
      value:
        "All questions are multiple choice with one correct response and three distractors. Pick the single best answer.",
    },
    {
      label: "Scoring",
      value:
        "Pass/fail against a standard set by subject matter experts. Scaled score 100–1,000; minimum passing score is 720.",
    },
    {
      label: "Guessing",
      value:
        "Unanswered questions are scored as incorrect — there is no penalty for guessing.",
    },
    {
      label: "Exam structure",
      value:
        "4 scenarios are presented, picked at random from the full set of 6 scenarios below.",
    },
  ],
};

export type Domain = {
  id: number;
  slug: string;
  title: string;
  weight: number;
  blurb: string;
  tasks: {
    code: string;
    title: string;
    knowledge: string[];
    skills: string[];
  }[];
};

export const domains: Domain[] = [
  {
    id: 1,
    slug: "agentic-architecture",
    title: "Agentic Architecture & Orchestration",
    weight: 27,
    blurb:
      "Designing agentic loops, coordinator–subagent systems, multi-step workflows with enforcement, hooks, task decomposition, and session state.",
    tasks: [
      {
        code: "1.1",
        title: "Design and implement agentic loops for autonomous task execution",
        knowledge: [
          "The agentic loop lifecycle: send request, inspect stop_reason (\"tool_use\" vs \"end_turn\"), execute requested tools, return results for the next iteration",
          "How tool results are appended to conversation history so the model can reason about the next action",
          "The distinction between model-driven decision-making and pre-configured decision trees or tool sequences",
        ],
        skills: [
          "Implementing loop control flow that continues on \"tool_use\" and terminates on \"end_turn\"",
          "Adding tool results to conversation context between iterations",
          "Avoiding anti-patterns: parsing natural-language signals for termination, arbitrary iteration caps as the primary stop, or checking assistant text as a completion indicator",
        ],
      },
      {
        code: "1.2",
        title: "Orchestrate multi-agent systems with coordinator-subagent patterns",
        knowledge: [
          "Hub-and-spoke architecture where a coordinator manages all inter-subagent communication, error handling, and routing",
          "Subagents operate with isolated context — they do not inherit the coordinator's conversation history automatically",
          "The coordinator's role in decomposition, delegation, aggregation, and deciding which subagents to invoke",
          "Risks of overly narrow task decomposition leading to incomplete coverage of broad topics",
        ],
        skills: [
          "Designing coordinators that dynamically select subagents rather than always routing the full pipeline",
          "Partitioning research scope across subagents to minimize duplication",
          "Implementing iterative refinement loops that re-delegate on detected gaps until coverage is sufficient",
          "Routing all subagent communication through the coordinator for observability and consistent error handling",
        ],
      },
      {
        code: "1.3",
        title: "Configure subagent invocation, context passing, and spawning",
        knowledge: [
          "The Task tool spawns subagents; allowedTools must include \"Task\" for a coordinator to invoke them",
          "Subagent context must be explicitly provided in the prompt — no automatic inheritance or shared memory",
          "The AgentDefinition config: descriptions, system prompts, and tool restrictions per subagent type",
          "Fork-based session management for exploring divergent approaches from a shared baseline",
        ],
        skills: [
          "Including complete findings from prior agents directly in the subagent's prompt",
          "Using structured data formats to separate content from metadata (URLs, names, page numbers) to preserve attribution",
          "Spawning parallel subagents via multiple Task calls in a single coordinator response",
          "Writing coordinator prompts that specify goals and quality criteria rather than step-by-step procedures",
        ],
      },
      {
        code: "1.4",
        title: "Implement multi-step workflows with enforcement and handoff patterns",
        knowledge: [
          "Programmatic enforcement (hooks, prerequisite gates) vs prompt-based guidance for ordering",
          "When deterministic compliance is required, prompt instructions alone have a non-zero failure rate",
          "Structured handoff protocols for mid-process escalation (customer details, root cause, recommended actions)",
        ],
        skills: [
          "Blocking downstream tool calls until prerequisites complete (e.g., block process_refund until get_customer returns a verified ID)",
          "Decomposing multi-concern requests into distinct items investigated in parallel before a unified resolution",
          "Compiling structured handoff summaries for human agents who lack the conversation transcript",
        ],
      },
      {
        code: "1.5",
        title: "Apply Agent SDK hooks for tool call interception and data normalization",
        knowledge: [
          "PostToolUse hooks that transform tool results before the model processes them",
          "Hooks that intercept outgoing tool calls to enforce compliance (e.g., blocking refunds above a threshold)",
          "Hooks for deterministic guarantees vs prompts for probabilistic compliance",
        ],
        skills: [
          "PostToolUse hooks that normalize heterogeneous formats (Unix timestamps, ISO 8601, numeric codes)",
          "Interception hooks that block policy-violating actions and redirect to alternative workflows",
          "Choosing hooks over prompt-based enforcement when business rules require guaranteed compliance",
        ],
      },
      {
        code: "1.6",
        title: "Design task decomposition strategies for complex workflows",
        knowledge: [
          "Fixed sequential pipelines (prompt chaining) vs dynamic adaptive decomposition based on findings",
          "Prompt chaining patterns: analyze each file individually, then a cross-file integration pass",
          "The value of adaptive investigation plans that generate subtasks from what is discovered",
        ],
        skills: [
          "Selecting prompt chaining for predictable reviews and dynamic decomposition for open-ended investigation",
          "Splitting large reviews into per-file passes plus a separate cross-file integration pass",
          "Decomposing open-ended tasks by mapping structure, finding high-impact areas, then an adaptive prioritized plan",
        ],
      },
      {
        code: "1.7",
        title: "Manage session state, resumption, and forking",
        knowledge: [
          "Named session resumption using --resume <session-name>",
          "fork_session for independent branches from a shared analysis baseline",
          "Informing the agent about file changes when resuming after code modifications",
          "Why a new session with a structured summary beats resuming with stale tool results",
        ],
        skills: [
          "Using --resume with session names to continue named investigations",
          "Using fork_session for parallel exploration branches",
          "Choosing resumption (context mostly valid) vs fresh start with injected summaries (results stale)",
          "Informing a resumed session about specific file changes for targeted re-analysis",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "tool-design-mcp",
    title: "Tool Design & MCP Integration",
    weight: 18,
    blurb:
      "Designing clear tool interfaces, structured error responses, tool distribution and tool_choice, MCP server integration, and built-in tool selection.",
    tasks: [
      {
        code: "2.1",
        title: "Design effective tool interfaces with clear descriptions and boundaries",
        knowledge: [
          "Tool descriptions are the primary mechanism LLMs use for selection; minimal descriptions are unreliable",
          "Include input formats, example queries, edge cases, and boundary explanations",
          "Ambiguous or overlapping descriptions cause misrouting (analyze_content vs analyze_document)",
          "System prompt wording affects tool selection; keyword-sensitive instructions create unintended associations",
        ],
        skills: [
          "Writing descriptions that differentiate purpose, inputs, outputs, and when to use vs alternatives",
          "Renaming and re-describing tools to eliminate overlap (analyze_content → extract_web_results)",
          "Splitting generic tools into purpose-specific tools with defined I/O contracts",
          "Reviewing system prompts for keyword-sensitive instructions that override good descriptions",
        ],
      },
      {
        code: "2.2",
        title: "Implement structured error responses for MCP tools",
        knowledge: [
          "The MCP isError flag for communicating failures back to the agent",
          "Transient vs validation vs business vs permission errors",
          "Uniform \"Operation failed\" responses prevent appropriate recovery decisions",
          "Retryable vs non-retryable errors; structured metadata prevents wasted retries",
        ],
        skills: [
          "Returning errorCategory (transient/validation/permission), isRetryable boolean, and human-readable descriptions",
          "Including retriable: false and customer-friendly explanations for business-rule violations",
          "Local recovery in subagents for transient failures; propagating only what can't be resolved with partial results",
          "Distinguishing access failures (need retry decisions) from valid empty results",
        ],
      },
      {
        code: "2.3",
        title: "Distribute tools appropriately across agents and configure tool choice",
        knowledge: [
          "Too many tools (18 vs 4-5) degrades selection reliability by increasing decision complexity",
          "Agents with out-of-specialization tools tend to misuse them",
          "Scoped tool access: only the tools needed for a role, with limited cross-role tools",
          "tool_choice options: \"auto\", \"any\", and forced ({\"type\": \"tool\", \"name\": \"...\"})",
        ],
        skills: [
          "Restricting each subagent's tool set to its role to prevent cross-specialization misuse",
          "Replacing generic tools with constrained alternatives (fetch_url → load_document with URL validation)",
          "Providing scoped cross-role tools for high-frequency needs (a verify_fact tool for synthesis)",
          "Using forced tool_choice to call a specific tool first; tool_choice: \"any\" to guarantee a tool call",
        ],
      },
      {
        code: "2.4",
        title: "Integrate MCP servers into Claude Code and agent workflows",
        knowledge: [
          "MCP scoping: project-level (.mcp.json) for shared tooling vs user-level (~/.claude.json) for personal servers",
          "Environment variable expansion in .mcp.json (e.g., ${GITHUB_TOKEN}) to avoid committing secrets",
          "All configured MCP server tools are discovered at connection time and available simultaneously",
          "MCP resources expose content catalogs to reduce exploratory tool calls",
        ],
        skills: [
          "Configuring shared servers in .mcp.json with env-var expansion for auth tokens",
          "Configuring personal/experimental servers in ~/.claude.json",
          "Enhancing MCP tool descriptions so the agent prefers them over built-ins like Grep",
          "Choosing community MCP servers for standard integrations; custom servers for team-specific workflows",
          "Exposing content catalogs as MCP resources for visibility without exploratory calls",
        ],
      },
      {
        code: "2.5",
        title: "Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively",
        knowledge: [
          "Grep for content search (function names, error messages, imports)",
          "Glob for file-path pattern matching (names/extensions)",
          "Read/Write for full file operations; Edit for targeted unique-text modifications",
          "When Edit fails on non-unique matches, use Read + Write as a fallback",
        ],
        skills: [
          "Selecting Grep for code-content search across a codebase",
          "Selecting Glob for naming patterns (e.g., **/*.test.tsx)",
          "Using Read then Write when Edit can't find unique anchor text",
          "Building understanding incrementally: Grep entry points, then Read to follow imports and trace flows",
          "Tracing function usage across wrapper modules by identifying exported names, then searching each",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "claude-code-config",
    title: "Claude Code Configuration & Workflows",
    weight: 20,
    blurb:
      "CLAUDE.md hierarchy, custom slash commands and skills, path-specific rules, plan mode vs direct execution, iterative refinement, and CI/CD integration.",
    tasks: [
      {
        code: "3.1",
        title: "Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization",
        knowledge: [
          "Hierarchy: user-level (~/.claude/CLAUDE.md), project-level (.claude/CLAUDE.md or root), directory-level",
          "User-level settings aren't shared with teammates via version control",
          "@import syntax for referencing external files to keep CLAUDE.md modular",
          ".claude/rules/ directory for topic-specific rule files vs a monolithic CLAUDE.md",
        ],
        skills: [
          "Diagnosing hierarchy issues (new teammate not receiving user-level instructions)",
          "Using @import to selectively include relevant standards per package",
          "Splitting large CLAUDE.md into focused files in .claude/rules/ (testing.md, api-conventions.md)",
          "Using /memory to verify which memory files are loaded and diagnose inconsistent behavior",
        ],
      },
      {
        code: "3.2",
        title: "Create and configure custom slash commands and skills",
        knowledge: [
          "Project commands in .claude/commands/ (shared) vs user commands in ~/.claude/commands/ (personal)",
          "Skills in .claude/skills/ with SKILL.md frontmatter: context: fork, allowed-tools, argument-hint",
          "context: fork runs a skill in an isolated sub-agent context to avoid polluting the main conversation",
          "Personal skill variants in ~/.claude/skills/ with different names to avoid affecting teammates",
        ],
        skills: [
          "Creating project-scoped slash commands in .claude/commands/ for team-wide availability",
          "Using context: fork to isolate verbose or exploratory skills from the main session",
          "Configuring allowed-tools in frontmatter to restrict tool access during skill execution",
          "Using argument-hint to prompt for required parameters",
          "Choosing skills (on-demand) vs CLAUDE.md (always-loaded universal standards)",
        ],
      },
      {
        code: "3.3",
        title: "Apply path-specific rules for conditional convention loading",
        knowledge: [
          ".claude/rules/ files with YAML frontmatter paths globs for conditional activation",
          "Path-scoped rules load only when editing matching files, reducing irrelevant context and tokens",
          "Glob-pattern rules beat directory CLAUDE.md for conventions spanning multiple directories",
        ],
        skills: [
          "Creating .claude/rules/ files with path scoping (e.g., paths: [\"terraform/**/*\"])",
          "Using globs to apply conventions by file type regardless of directory (**/*.test.tsx)",
          "Choosing path-specific rules over subdirectory CLAUDE.md when files are spread across the codebase",
        ],
      },
      {
        code: "3.4",
        title: "Determine when to use plan mode vs direct execution",
        knowledge: [
          "Plan mode: complex tasks, large-scale changes, multiple valid approaches, architectural decisions, multi-file edits",
          "Direct execution: simple, well-scoped changes (a single validation check)",
          "Plan mode enables safe exploration and design before committing, preventing costly rework",
          "The Explore subagent isolates verbose discovery and returns summaries to preserve context",
        ],
        skills: [
          "Selecting plan mode for architectural tasks (microservice restructuring, library migrations across 45+ files)",
          "Selecting direct execution for well-understood changes (a single-file bug fix with a clear stack trace)",
          "Using the Explore subagent for verbose discovery phases to prevent context exhaustion",
          "Combining plan mode for investigation with direct execution for implementation",
        ],
      },
      {
        code: "3.5",
        title: "Apply iterative refinement techniques for progressive improvement",
        knowledge: [
          "Concrete input/output examples communicate expected transformations better than prose",
          "Test-driven iteration: write test suites first, then iterate by sharing failures",
          "The interview pattern: have Claude ask questions to surface considerations first",
          "Single message for interacting problems vs sequential fixes for independent problems",
        ],
        skills: [
          "Providing 2-3 concrete input/output examples when prose produces inconsistent results",
          "Writing test suites for behavior, edge cases, and performance, then iterating on failures",
          "Using the interview pattern to surface design considerations in unfamiliar domains",
          "Addressing interacting issues in one detailed message; sequential iteration for independent ones",
        ],
      },
      {
        code: "3.6",
        title: "Integrate Claude Code into CI/CD pipelines",
        knowledge: [
          "The -p / --print flag for non-interactive mode in pipelines",
          "--output-format json and --json-schema for structured CI output",
          "CLAUDE.md as the mechanism for providing project context to CI-invoked Claude Code",
          "Session isolation: a separate review instance is more effective than self-review of generated code",
        ],
        skills: [
          "Running Claude Code in CI with -p to prevent interactive hangs",
          "Using --output-format json with --json-schema for machine-parseable findings to post as PR comments",
          "Including prior findings when re-running reviews so only new/unaddressed issues are reported",
          "Providing existing test files so generation avoids duplicate scenarios",
          "Documenting testing standards and fixtures in CLAUDE.md to improve test quality",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "prompt-engineering",
    title: "Prompt Engineering & Structured Output",
    weight: 20,
    blurb:
      "Explicit criteria to reduce false positives, few-shot prompting, structured output via tool_use and JSON schemas, validation/retry loops, batch processing, and multi-pass review.",
    tasks: [
      {
        code: "4.1",
        title: "Design prompts with explicit criteria to improve precision and reduce false positives",
        knowledge: [
          "Explicit criteria beat vague instructions (flag comments only when claimed behavior contradicts actual code)",
          "\"Be conservative\" / \"only high-confidence\" fail compared to specific categorical criteria",
          "High false-positive categories undermine developer trust in accurate categories",
        ],
        skills: [
          "Writing specific criteria defining which issues to report vs skip rather than confidence filtering",
          "Temporarily disabling high false-positive categories to restore trust while improving prompts",
          "Defining explicit severity criteria with concrete code examples per level",
        ],
      },
      {
        code: "4.2",
        title: "Apply few-shot prompting to improve output consistency and quality",
        knowledge: [
          "Few-shot examples are the most effective technique for consistent, actionable output",
          "They demonstrate ambiguous-case handling (tool selection, branch-level coverage gaps)",
          "They enable generalization to novel patterns rather than matching only specified cases",
          "They reduce hallucination in extraction (informal measurements, varied structures)",
        ],
        skills: [
          "Creating 2-4 targeted examples for ambiguous scenarios that show reasoning for the chosen action",
          "Including examples demonstrating output format (location, issue, severity, suggested fix)",
          "Distinguishing acceptable patterns from genuine issues to reduce false positives while generalizing",
          "Demonstrating correct handling of varied document structures and formats",
        ],
      },
      {
        code: "4.3",
        title: "Enforce structured output using tool use and JSON schemas",
        knowledge: [
          "tool_use with JSON schemas is the most reliable approach for schema-compliant output, eliminating syntax errors",
          "tool_choice: \"auto\" (may return text), \"any\" (must call a tool), forced (must call a named tool)",
          "Strict schemas eliminate syntax errors but not semantic errors (line items not summing, wrong fields)",
          "Schema design: required vs optional, enum with \"other\" + detail patterns for extensible categories",
        ],
        skills: [
          "Defining extraction tools with JSON schemas and extracting from the tool_use response",
          "Setting tool_choice: \"any\" to guarantee output when document type is unknown",
          "Forcing tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"} to run before enrichment",
          "Designing nullable fields so the model returns null instead of fabricating values",
          "Adding enum values like \"unclear\" / \"other\" + detail for ambiguous, extensible cases",
          "Including format-normalization rules in prompts alongside strict schemas",
        ],
      },
      {
        code: "4.4",
        title: "Implement validation, retry, and feedback loops for extraction quality",
        knowledge: [
          "Retry-with-error-feedback: append specific validation errors on retry to guide correction",
          "Retries are ineffective when required info is simply absent from the source",
          "Feedback design: track which constructs trigger findings (detected_pattern) for dismissal analysis",
          "Semantic validation errors vs schema syntax errors (eliminated by tool use)",
        ],
        skills: [
          "Follow-up requests including the document, failed extraction, and specific errors for self-correction",
          "Identifying when retries help (format/structural) vs won't (info absent from source)",
          "Adding detected_pattern fields to enable false-positive pattern analysis",
          "Self-correction flows: calculated_total vs stated_total, conflict_detected booleans",
        ],
      },
      {
        code: "4.5",
        title: "Design efficient batch processing strategies",
        knowledge: [
          "Message Batches API: 50% cost savings, up to 24-hour window, no guaranteed latency SLA",
          "Appropriate for non-blocking, latency-tolerant workloads; inappropriate for blocking pre-merge checks",
          "Batch API doesn't support multi-turn tool calling within a single request",
          "custom_id fields correlate batch request/response pairs",
        ],
        skills: [
          "Matching API to latency needs: synchronous for blocking checks, batch for overnight/weekly analysis",
          "Calculating submission frequency from SLA constraints (4-hour windows for a 30-hour SLA)",
          "Handling failures by resubmitting only failed documents (by custom_id) with fixes like chunking",
          "Refining prompts on a sample set before batching large volumes",
        ],
      },
      {
        code: "4.6",
        title: "Design multi-instance and multi-pass review architectures",
        knowledge: [
          "Self-review is limited: a model retains generation reasoning and rarely questions its own decisions",
          "Independent review instances catch subtle issues better than self-review or extended thinking",
          "Multi-pass review: per-file local passes plus cross-file integration to avoid attention dilution",
        ],
        skills: [
          "Using a second independent instance to review generated code without the generator's context",
          "Splitting large reviews into per-file passes plus separate integration passes",
          "Running verification passes where the model self-reports confidence for calibrated routing",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "context-reliability",
    title: "Context Management & Reliability",
    weight: 15,
    blurb:
      "Preserving critical information across long interactions, escalation and ambiguity resolution, error propagation, large-codebase context, human review and confidence calibration, and provenance.",
    tasks: [
      {
        code: "5.1",
        title: "Manage conversation context to preserve critical information across long interactions",
        knowledge: [
          "Progressive summarization risks condensing numbers, percentages, dates, and customer expectations into vague summaries",
          "The \"lost in the middle\" effect: reliable at the beginning/end, may omit middle findings",
          "Tool results accumulate and consume tokens disproportionately (40+ fields when 5 are relevant)",
          "Passing complete conversation history in subsequent requests maintains coherence",
        ],
        skills: [
          "Extracting transactional facts into a persistent \"case facts\" block included each prompt",
          "Persisting structured issue data into a separate context layer for multi-issue sessions",
          "Trimming verbose tool outputs to relevant fields before they accumulate",
          "Placing key findings at the beginning and using explicit section headers to mitigate position effects",
          "Requiring subagents to include metadata in structured outputs for accurate synthesis",
          "Returning structured data instead of verbose content when downstream budgets are limited",
        ],
      },
      {
        code: "5.2",
        title: "Design effective escalation and ambiguity resolution patterns",
        knowledge: [
          "Escalation triggers: customer requests for a human, policy exceptions/gaps, inability to progress",
          "Escalate immediately when explicitly demanded vs offer to resolve when straightforward",
          "Sentiment-based escalation and self-reported confidence are unreliable proxies for complexity",
          "Multiple customer matches require clarification, not heuristic selection",
        ],
        skills: [
          "Adding explicit escalation criteria with few-shot examples to the system prompt",
          "Honoring explicit requests for human agents immediately without investigating first",
          "Acknowledging frustration while offering resolution, escalating only if the customer reiterates",
          "Escalating when policy is ambiguous or silent on the specific request",
          "Asking for additional identifiers when results return multiple matches",
        ],
      },
      {
        code: "5.3",
        title: "Implement error propagation strategies across multi-agent systems",
        knowledge: [
          "Structured error context (failure type, attempted query, partial results, alternatives) enables recovery",
          "Access failures (timeouts needing retry decisions) vs valid empty results",
          "Generic statuses (\"search unavailable\") hide valuable context from the coordinator",
          "Silently suppressing errors or terminating whole workflows on a single failure are anti-patterns",
        ],
        skills: [
          "Returning structured error context with failure type, attempt, partial results, and alternatives",
          "Distinguishing access failures from valid empty results in reporting",
          "Local recovery for transient failures; propagating only unresolved errors with partial results",
          "Structuring synthesis with coverage annotations marking well-supported vs gapped areas",
        ],
      },
      {
        code: "5.4",
        title: "Manage context effectively in large codebase exploration",
        knowledge: [
          "Context degradation: inconsistent answers and references to \"typical patterns\" rather than discovered classes",
          "Scratchpad files persist key findings across context boundaries",
          "Subagent delegation isolates verbose exploration while the main agent coordinates",
          "Structured state persistence for crash recovery via a manifest loaded on resume",
        ],
        skills: [
          "Spawning subagents for specific questions while the main agent preserves high-level coordination",
          "Maintaining scratchpad files of key findings to counteract degradation",
          "Summarizing each phase before spawning subagents for the next, injecting summaries",
          "Designing crash recovery with structured state exports (manifests) loaded on resume",
          "Using /compact to reduce context usage during extended exploration",
        ],
      },
      {
        code: "5.5",
        title: "Design human review workflows and confidence calibration",
        knowledge: [
          "Aggregate accuracy (97% overall) may mask poor performance on specific document types or fields",
          "Stratified random sampling measures error rates and detects novel patterns",
          "Field-level confidence scores calibrated with labeled validation sets route review attention",
          "Validate accuracy by document type and field before automating high-confidence extractions",
        ],
        skills: [
          "Stratified random sampling of high-confidence extractions for ongoing error measurement",
          "Analyzing accuracy by document type and field before reducing human review",
          "Outputting field-level confidence, calibrating thresholds with labeled sets",
          "Routing low-confidence or contradictory extractions to human review",
        ],
      },
      {
        code: "5.6",
        title: "Preserve information provenance and handle uncertainty in multi-source synthesis",
        knowledge: [
          "Source attribution is lost during summarization when claim-source mappings aren't preserved",
          "Structured claim-source mappings must be preserved and merged during synthesis",
          "Conflicting statistics: annotate with source attribution rather than arbitrarily selecting one",
          "Temporal data: require publication/collection dates to avoid misreading differences as contradictions",
        ],
        skills: [
          "Requiring subagents to output claim-source mappings (URLs, names, excerpts) preserved through synthesis",
          "Structuring reports to distinguish well-established from contested findings",
          "Including conflicting values explicitly annotated, letting the coordinator reconcile",
          "Requiring publication/collection dates for correct temporal interpretation",
          "Rendering content types appropriately (financial as tables, news as prose, technical as lists)",
        ],
      },
    ],
  },
];

export type Scenario = {
  id: number;
  title: string;
  body: string;
  domains: string[];
};

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Customer Support Resolution Agent",
    body: "You are building a customer support resolution agent using the Claude Agent SDK. It handles high-ambiguity requests like returns, billing disputes, and account issues, with backend access through custom MCP tools (get_customer, lookup_order, process_refund, escalate_to_human). The target is 80%+ first-contact resolution while knowing when to escalate.",
    domains: ["Agentic Architecture & Orchestration", "Tool Design & MCP Integration", "Context Management & Reliability"],
  },
  {
    id: 2,
    title: "Code Generation with Claude Code",
    body: "You are using Claude Code to accelerate software development — generation, refactoring, debugging, and documentation. You need to integrate it into your workflow with custom slash commands, CLAUDE.md configurations, and to understand when to use plan mode vs direct execution.",
    domains: ["Claude Code Configuration & Workflows", "Context Management & Reliability"],
  },
  {
    id: 3,
    title: "Multi-Agent Research System",
    body: "A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive, cited reports.",
    domains: ["Agentic Architecture & Orchestration", "Tool Design & MCP Integration", "Context Management & Reliability"],
  },
  {
    id: 4,
    title: "Developer Productivity with Claude",
    body: "You are building developer productivity tools with the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate, and automate repetitive tasks using built-in tools (Read, Write, Bash, Grep, Glob) and MCP servers.",
    domains: ["Tool Design & MCP Integration", "Claude Code Configuration & Workflows", "Agentic Architecture & Orchestration"],
  },
  {
    id: 5,
    title: "Claude Code for Continuous Integration",
    body: "You are integrating Claude Code into your CI/CD pipeline to run automated code reviews, generate test cases, and provide PR feedback. You need prompts that provide actionable feedback and minimize false positives.",
    domains: ["Claude Code Configuration & Workflows", "Prompt Engineering & Structured Output"],
  },
  {
    id: 6,
    title: "Structured Data Extraction",
    body: "You are building a structured data extraction system. It extracts information from unstructured documents, validates output with JSON schemas, and maintains high accuracy. It must handle edge cases gracefully and integrate with downstream systems.",
    domains: ["Prompt Engineering & Structured Output", "Context Management & Reliability"],
  },
];

export type Question = {
  id: number;
  scenario: string;
  prompt: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    scenario: "Customer Support Resolution Agent",
    prompt:
      "Production data shows that in 12% of cases your agent skips get_customer entirely and calls lookup_order using only the customer's stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?",
    options: [
      { key: "A", text: "Add a programmatic prerequisite that blocks lookup_order and process_refund calls until get_customer has returned a verified customer ID." },
      { key: "B", text: "Enhance the system prompt to state that customer verification via get_customer is mandatory before any order operations." },
      { key: "C", text: "Add few-shot examples showing the agent always calling get_customer first, even when customers volunteer order details." },
      { key: "D", text: "Implement a routing classifier that analyzes each request and enables only the subset of tools appropriate for that request type." },
    ],
    answer: "A",
    explanation:
      "When a specific tool sequence is required for critical business logic (verifying identity before refunds), programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot. B and C rely on probabilistic LLM compliance, insufficient when errors have financial consequences. D addresses tool availability rather than ordering, which is not the actual problem.",
  },
  {
    id: 2,
    scenario: "Customer Support Resolution Agent",
    prompt:
      "Logs show the agent frequently calls get_customer when users ask about orders (e.g., \"check my order #12345\") instead of lookup_order. Both tools have minimal descriptions and accept similar identifier formats. What's the most effective first step to improve tool selection reliability?",
    options: [
      { key: "A", text: "Add 5-8 few-shot examples to the system prompt demonstrating order-related queries routing to lookup_order." },
      { key: "B", text: "Expand each tool's description to include input formats, example queries, edge cases, and boundaries explaining when to use it versus similar tools." },
      { key: "C", text: "Implement a routing layer that parses input before each turn and pre-selects the tool based on detected keywords and identifier patterns." },
      { key: "D", text: "Consolidate both tools into a single lookup_entity tool that accepts any identifier and internally determines which backend to query." },
    ],
    answer: "B",
    explanation:
      "Tool descriptions are the primary mechanism LLMs use for selection. B directly addresses this root cause with a low-effort, high-leverage fix. Few-shot examples (A) add token overhead without fixing the underlying issue. A routing layer (C) is over-engineered and bypasses the LLM's understanding. Consolidating (D) is valid but more effort than a \"first step\" warrants.",
  },
  {
    id: 3,
    scenario: "Customer Support Resolution Agent",
    prompt:
      "Your agent achieves 55% first-contact resolution, well below the 80% target. It escalates straightforward cases (standard damage replacements with photo evidence) while attempting complex situations requiring policy exceptions. What's the most effective way to improve escalation calibration?",
    options: [
      { key: "A", text: "Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously." },
      { key: "B", text: "Have the agent self-report a confidence score (1-10) before each response and route to humans when confidence falls below a threshold." },
      { key: "C", text: "Deploy a separate classifier model trained on historical tickets to predict which requests need escalation." },
      { key: "D", text: "Implement sentiment analysis to detect customer frustration and automatically escalate when negative sentiment exceeds a threshold." },
    ],
    answer: "A",
    explanation:
      "Explicit escalation criteria with few-shot examples address the root cause: unclear decision boundaries. B fails because LLM self-reported confidence is poorly calibrated — the agent is already wrongly confident on hard cases. C is over-engineered. D solves a different problem; sentiment doesn't correlate with complexity.",
  },
  {
    id: 4,
    scenario: "Code Generation with Claude Code",
    prompt:
      "You want a custom /review slash command that runs your team's standard code review checklist, available to every developer when they clone or pull the repository. Where should you create this command file?",
    options: [
      { key: "A", text: "In the .claude/commands/ directory in the project repository." },
      { key: "B", text: "In ~/.claude/commands/ in each developer's home directory." },
      { key: "C", text: "In the CLAUDE.md file at the project root." },
      { key: "D", text: "In a .claude/config.json file with a commands array." },
    ],
    answer: "A",
    explanation:
      "Project-scoped slash commands live in .claude/commands/ within the repo — version-controlled and automatically available to everyone who clones or pulls. B is for personal commands not shared via version control. C is for project context, not command definitions. D describes a mechanism that doesn't exist in Claude Code.",
  },
  {
    id: 5,
    scenario: "Code Generation with Claude Code",
    prompt:
      "You must restructure the team's monolithic application into microservices — changes across dozens of files, with decisions about service boundaries and module dependencies. Which approach should you take?",
    options: [
      { key: "A", text: "Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes." },
      { key: "B", text: "Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries." },
      { key: "C", text: "Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured." },
      { key: "D", text: "Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation." },
    ],
    answer: "A",
    explanation:
      "Plan mode is designed for large-scale changes, multiple valid approaches, and architectural decisions — exactly what monolith-to-microservices requires. B risks costly rework when dependencies surface late. C assumes you already know the right structure. D ignores that the complexity is already stated in the requirements.",
  },
  {
    id: 6,
    scenario: "Code Generation with Claude Code",
    prompt:
      "Your codebase has distinct areas with different conventions. Test files are spread throughout alongside the code they test (e.g., Button.test.tsx next to Button.tsx), and you want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions?",
    options: [
      { key: "A", text: "Create rule files in .claude/rules/ with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths." },
      { key: "B", text: "Consolidate all conventions in the root CLAUDE.md under headers for each area, relying on Claude to infer which section applies." },
      { key: "C", text: "Create skills in .claude/skills/ for each code type that include the relevant conventions in their SKILL.md files." },
      { key: "D", text: "Place a separate CLAUDE.md file in each subdirectory containing that area's specific conventions." },
    ],
    answer: "A",
    explanation:
      ".claude/rules/ with glob patterns (e.g., **/*.test.tsx) applies conventions by file path regardless of directory — essential for files spread throughout. B relies on inference. C requires manual invocation, contradicting \"automatic.\" D can't easily handle files spread across many directories since CLAUDE.md is directory-bound.",
  },
  {
    id: 7,
    scenario: "Multi-Agent Research System",
    prompt:
      "Researching \"impact of AI on creative industries,\" each subagent completes successfully, but the final reports cover only visual arts, missing music, writing, and film. The coordinator's logs show it decomposed the topic into \"AI in digital art creation,\" \"AI in graphic design,\" and \"AI in photography.\" What is the most likely root cause?",
    options: [
      { key: "A", text: "The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives." },
      { key: "B", text: "The coordinator's task decomposition is too narrow, producing subagent assignments that don't cover all relevant domains of the topic." },
      { key: "C", text: "The web search agent's queries are not comprehensive enough and need to be expanded." },
      { key: "D", text: "The document analysis agent is filtering out non-visual sources due to overly restrictive relevance criteria." },
    ],
    answer: "B",
    explanation:
      "The logs reveal the cause directly: the coordinator decomposed \"creative industries\" into only visual-arts subtasks, omitting music, writing, and film. The subagents executed their assigned tasks correctly — the problem is what they were assigned. A, C, and D blame downstream agents that are working correctly within scope.",
  },
  {
    id: 8,
    scenario: "Multi-Agent Research System",
    prompt:
      "The web search subagent times out while researching a complex topic. You need to design how this failure flows back to the coordinator. Which error propagation approach best enables intelligent recovery?",
    options: [
      { key: "A", text: "Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches." },
      { key: "B", text: "Implement automatic retry with exponential backoff within the subagent, returning a generic \"search unavailable\" status only after all retries are exhausted." },
      { key: "C", text: "Catch the timeout within the subagent and return an empty result set marked as successful." },
      { key: "D", text: "Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow." },
    ],
    answer: "A",
    explanation:
      "Structured error context gives the coordinator what it needs to decide — retry with a modified query, try an alternative, or proceed with partial results. B's generic status hides context. C suppresses the error by marking failure as success. D terminates the whole workflow unnecessarily when recovery could succeed.",
  },
  {
    id: 9,
    scenario: "Multi-Agent Research System",
    prompt:
      "The synthesis agent frequently needs to verify claims. Currently it returns control to the coordinator, which invokes the web search agent and re-invokes synthesis — adding 2-3 round trips and 40% latency. 85% of verifications are simple fact-checks; 15% require deeper investigation. What's the most effective approach?",
    options: [
      { key: "A", text: "Give the synthesis agent a scoped verify_fact tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator." },
      { key: "B", text: "Have the synthesis agent batch all verification needs and return them to the coordinator at the end of its pass, which sends them to the web search agent at once." },
      { key: "C", text: "Give the synthesis agent access to all web search tools so it can handle any verification directly without round-trips." },
      { key: "D", text: "Have the web search agent proactively cache extra context around each source during initial research." },
    ],
    answer: "A",
    explanation:
      "A applies least privilege: give synthesis only what it needs for the 85% common case while preserving coordination for complex cases. B creates blocking dependencies since synthesis steps may depend on earlier verified facts. C over-provisions, violating separation of concerns. D relies on speculative caching that can't reliably predict needs.",
  },
  {
    id: 10,
    scenario: "Claude Code for Continuous Integration",
    prompt:
      'Your pipeline runs claude "Analyze this pull request for security issues" but the job hangs indefinitely, waiting for interactive input. What\'s the correct approach to run Claude Code in an automated pipeline?',
    options: [
      { key: "A", text: 'Add the -p flag: claude -p "Analyze this pull request for security issues".' },
      { key: "B", text: "Set the environment variable CLAUDE_HEADLESS=true before running the command." },
      { key: "C", text: 'Redirect stdin from /dev/null: claude "..." < /dev/null.' },
      { key: "D", text: 'Add the --batch flag: claude --batch "...".' },
    ],
    answer: "A",
    explanation:
      "The -p (or --print) flag is the documented way to run non-interactively: it processes the prompt, outputs to stdout, and exits. The others reference non-existent features (CLAUDE_HEADLESS, --batch) or Unix workarounds that don't address Claude Code's command syntax.",
  },
  {
    id: 11,
    scenario: "Claude Code for Continuous Integration",
    prompt:
      "Two workflows use real-time Claude calls: (1) a blocking pre-merge check that must complete before developers merge, and (2) a technical debt report generated overnight. Your manager proposes switching both to the Message Batches API for its 50% cost savings. How should you evaluate this?",
    options: [
      { key: "A", text: "Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks." },
      { key: "B", text: "Switch both workflows to batch processing with status polling to check for completion." },
      { key: "C", text: "Keep real-time calls for both workflows to avoid batch result ordering issues." },
      { key: "D", text: "Switch both to batch processing with a timeout fallback to real-time if batches take too long." },
    ],
    answer: "A",
    explanation:
      "The Batches API offers 50% savings but up to 24-hour processing with no latency SLA — unsuitable for blocking pre-merge checks, ideal for overnight reports. B relies on \"often faster\" which isn't acceptable for blocking work. C reflects a misconception (custom_id correlates results). D adds needless complexity over simply matching each API to its use case.",
  },
  {
    id: 12,
    scenario: "Claude Code for Continuous Integration",
    prompt:
      "A PR modifies 14 files. Your single-pass review produces inconsistent results: detailed feedback for some files, superficial for others, obvious bugs missed, and contradictory feedback (flagging a pattern in one file while approving identical code elsewhere). How should you restructure the review?",
    options: [
      { key: "A", text: "Split into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow." },
      { key: "B", text: "Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs." },
      { key: "C", text: "Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass." },
      { key: "D", text: "Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs." },
    ],
    answer: "A",
    explanation:
      "Splitting into focused passes addresses the root cause: attention dilution when processing many files at once. File-by-file ensures consistent depth; a separate integration pass catches cross-file issues. B shifts burden to developers. C misunderstands that larger context doesn't solve attention quality. D suppresses real bugs by requiring consensus on intermittently caught issues.",
  },
];

export type Exercise = {
  id: number;
  title: string;
  objective: string;
  steps: string[];
  domains: string[];
};

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Build a Multi-Tool Agent with Escalation Logic",
    objective:
      "Practice designing an agentic loop with tool integration, structured error handling, and escalation patterns.",
    steps: [
      "Define 3-4 MCP tools with detailed descriptions that clearly differentiate purpose, inputs, and boundaries. Include at least two similar tools requiring careful description to avoid selection confusion.",
      "Implement an agentic loop that checks stop_reason to decide whether to continue tool execution or present the final response. Handle both \"tool_use\" and \"end_turn\" correctly.",
      "Add structured error responses: errorCategory (transient/validation/permission), isRetryable boolean, and human-readable descriptions. Test that the agent retries transient errors and explains business errors.",
      "Implement a programmatic hook intercepting tool calls to enforce a business rule (e.g., blocking operations above a threshold), redirecting to an escalation workflow.",
      "Test with multi-concern messages and verify the agent decomposes the request, handles each concern, and synthesizes a unified response.",
    ],
    domains: ["Domain 1", "Domain 2", "Domain 5"],
  },
  {
    id: 2,
    title: "Configure Claude Code for a Team Development Workflow",
    objective:
      "Practice configuring CLAUDE.md hierarchies, custom slash commands, path-specific rules, and MCP server integration.",
    steps: [
      "Create a project-level CLAUDE.md with universal coding and testing standards. Verify project-level instructions apply across all team members.",
      "Create .claude/rules/ files with YAML frontmatter glob patterns (e.g., paths: [\"src/api/**/*\"], paths: [\"**/*.test.*\"]). Test that rules load only when editing matching files.",
      "Create a project-scoped skill in .claude/skills/ with context: fork and allowed-tools restrictions. Verify it runs in isolation without polluting the main conversation.",
      "Configure an MCP server in .mcp.json with environment-variable expansion for credentials. Add a personal server in ~/.claude.json and verify both are available simultaneously.",
      "Test plan mode versus direct execution on a single-file bug fix, a multi-file library migration, and a new feature with multiple valid approaches. Observe when plan mode provides value.",
    ],
    domains: ["Domain 3", "Domain 2"],
  },
  {
    id: 3,
    title: "Build a Structured Data Extraction Pipeline",
    objective:
      "Practice designing JSON schemas, using tool_use for structured output, validation-retry loops, and batch processing.",
    steps: [
      "Define an extraction tool with required and optional fields, an enum with an \"other\" + detail pattern, and nullable fields. Process documents where some fields are absent and verify the model returns null rather than fabricating values.",
      "Implement a validation-retry loop: on validation failure, send a follow-up including the document, failed extraction, and specific error. Track which errors are resolvable (format) vs not (info absent).",
      "Add few-shot examples demonstrating extraction from varied formats (inline citations vs bibliographies, narrative vs tables) and verify improved handling.",
      "Submit a batch of 100 documents via the Message Batches API, handle failures by custom_id, resubmit with modifications (e.g., chunking oversized docs), and calculate processing time relative to SLA constraints.",
      "Have the model output field-level confidence scores, route low-confidence extractions to human review, and analyze accuracy by document type and field.",
    ],
    domains: ["Domain 4", "Domain 5"],
  },
  {
    id: 4,
    title: "Design and Debug a Multi-Agent Research Pipeline",
    objective:
      "Practice orchestrating subagents, managing context passing, error propagation, and synthesis with provenance tracking.",
    steps: [
      "Build a coordinator delegating to at least two subagents (web search, document analysis). Ensure allowedTools includes \"Task\" and each subagent receives findings directly in its prompt.",
      "Implement parallel subagent execution via multiple Task calls in a single response. Measure latency improvement over sequential.",
      "Design structured subagent output separating content from metadata: each finding includes a claim, evidence excerpt, source URL/name, and publication date. Verify synthesis preserves attribution.",
      "Simulate a subagent timeout and verify the coordinator receives structured error context, can proceed with partial results, and annotates coverage gaps.",
      "Test with conflicting source data and verify synthesis preserves both values with attribution rather than arbitrarily selecting one, distinguishing well-established from contested findings.",
    ],
    domains: ["Domain 1", "Domain 2", "Domain 5"],
  },
];

export const appendix = {
  technologies: [
    { name: "Claude Agent SDK", detail: "Agent definitions, agentic loops, stop_reason handling, hooks (PostToolUse, tool call interception), subagent spawning via Task tool, allowedTools configuration" },
    { name: "Model Context Protocol (MCP)", detail: "MCP servers, tools, resources, isError flag, tool descriptions, tool distribution, .mcp.json configuration, env-var expansion" },
    { name: "Claude Code", detail: "CLAUDE.md hierarchy (user/project/directory), .claude/rules/ path-scoping, .claude/commands/, .claude/skills/ frontmatter (context: fork, allowed-tools, argument-hint), plan mode, direct execution, /memory, /compact, --resume, fork_session, Explore subagent" },
    { name: "Claude Code CLI", detail: "-p / --print for non-interactive mode, --output-format json, --json-schema for structured CI output" },
    { name: "Claude API", detail: "tool_use with JSON schemas, tool_choice (\"auto\", \"any\", forced), stop_reason (\"tool_use\", \"end_turn\"), max_tokens, system prompts" },
    { name: "Message Batches API", detail: "50% cost savings, up to 24-hour window, custom_id correlation, polling, no multi-turn tool calling" },
    { name: "JSON Schema", detail: "Required vs optional, enum types, nullable fields, \"other\" + detail patterns, strict mode for syntax-error elimination" },
    { name: "Pydantic", detail: "Schema validation, semantic validation errors, validation-retry loops" },
    { name: "Built-in tools", detail: "Read, Write, Edit, Bash, Grep, Glob — purposes and selection criteria" },
    { name: "Few-shot prompting", detail: "Targeted examples for ambiguous scenarios, format demonstration, generalization" },
    { name: "Prompt chaining", detail: "Sequential task decomposition into focused passes" },
    { name: "Context window management", detail: "Token budgets, progressive summarization, lost-in-the-middle, context extraction, scratchpad files" },
    { name: "Session management", detail: "Resumption, fork_session, named sessions, session context isolation" },
    { name: "Confidence scoring", detail: "Field-level confidence, calibration with labeled validation sets, stratified sampling" },
  ],
  inScope: [
    "Agentic loop implementation: control flow on stop_reason, tool result handling, termination conditions",
    "Multi-agent orchestration: coordinator-subagent patterns, decomposition, parallel execution, iterative refinement",
    "Subagent context management: explicit context passing, structured state persistence, crash recovery via manifests",
    "Tool interface design: effective descriptions, splitting vs consolidating, naming to reduce ambiguity",
    "MCP tool and resource design: resources for catalogs, tools for actions, description quality for adoption",
    "MCP server configuration: project vs user scope, env-var expansion, multi-server access",
    "Error handling and propagation: structured responses, transient vs business vs permission, local recovery",
    "Escalation decision-making: explicit criteria, honoring preferences, policy gap identification",
    "CLAUDE.md configuration: hierarchy, @import patterns, .claude/rules/ globs",
    "Custom commands and skills: project vs user scope, context: fork, allowed-tools, argument-hint",
    "Plan mode vs direct execution: complexity assessment, architectural decisions, single-file changes",
    "Iterative refinement: I/O examples, test-driven iteration, interview pattern, sequential vs parallel",
    "Structured output via tool_use: schema design, tool_choice, nullable fields to prevent hallucination",
    "Few-shot prompting: ambiguous targeting, format consistency, false-positive reduction",
    "Batch processing: appropriateness, latency tolerance, failure handling by custom_id",
    "Context window optimization: trimming outputs, structured fact extraction, position-aware ordering",
    "Human review workflows: confidence calibration, stratified sampling, accuracy segmentation",
    "Information provenance: claim-source mappings, temporal data, conflict annotation, coverage gaps",
  ],
  outOfScope: [
    "Fine-tuning Claude models or training custom models",
    "Claude API authentication, billing, or account management",
    "Detailed implementation of specific programming languages or frameworks",
    "Deploying or hosting MCP servers (infrastructure, networking, orchestration)",
    "Claude's internal architecture, training process, or model weights",
    "Constitutional AI, RLHF, or safety training methodologies",
    "Embedding models or vector database implementation details",
    "Computer use (browser automation, desktop interaction)",
    "Vision/image analysis capabilities",
    "Streaming API implementation or server-sent events",
    "Rate limiting, quotas, or API pricing calculations",
    "OAuth, API key rotation, or authentication protocol details",
    "Specific cloud provider configurations (AWS, GCP, Azure)",
    "Performance benchmarking or model comparison metrics",
    "Prompt caching implementation details (beyond knowing it exists)",
    "Token counting algorithms or tokenization specifics",
  ],
  recommendations: [
    "Build an agent with the Claude Agent SDK: a complete agentic loop with tool calling, error handling, and session management. Practice spawning subagents and passing context.",
    "Configure Claude Code for a real project: CLAUDE.md hierarchy, path-specific rules in .claude/rules/, custom skills with frontmatter (context: fork, allowed-tools), and at least one MCP server.",
    "Design and test MCP tools: descriptions that differentiate similar tools, structured error responses with categories and retryable flags, and tool-selection reliability tests with ambiguous requests.",
    "Build a structured data extraction pipeline: tool_use with JSON schemas, validation-retry loops, optional/nullable fields, and batch processing with the Message Batches API.",
    "Practice prompt engineering: few-shot examples for ambiguous scenarios, explicit review criteria to reduce false positives, and multi-pass review architectures.",
    "Study context management: extracting structured facts from verbose outputs, scratchpad files for long sessions, and subagent delegation to manage context limits.",
    "Review escalation and human-in-the-loop patterns: when to escalate (policy gaps, customer requests, inability to progress) vs resolve, and confidence-based review routing.",
    "Complete the Practice Exam before sitting the real exam — it mirrors the scenarios and format and explains answers to reinforce understanding.",
  ],
};

export const navItems = [
  { href: "/overview", label: "Overview", desc: "Intro, candidate, exam facts" },
  { href: "/scenarios", label: "Scenarios", desc: "The 6 exam scenarios" },
  { href: "/domains", label: "Domains", desc: "5 domains & task statements" },
  { href: "/questions", label: "Practice Questions", desc: "12 interactive samples" },
  { href: "/exercises", label: "Exercises", desc: "4 hands-on labs" },
  { href: "/appendix", label: "Appendix", desc: "Tech, scope & prep" },
];
