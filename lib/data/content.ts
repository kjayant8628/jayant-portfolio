import { BlogPost, ExperienceRole, Stat, TechCategory, TimelineEvent } from "@/types";

export const experience: ExperienceRole[] = [
  {
    company: "Siemens Energy",
    role: "AI/ML & Data Analytics Intern",
    location: "Gurgaon",
    start: "Jan 2026",
    end: "Jun 2026",
    summary:
      "Engineered an AI-powered bid automation platform for technical offer generation, combining a hybrid NLP + LLM reasoning engine with schema-validated document pipelines.",
    achievements: [
      "Reduced RFP processing time from 16–40 hours of manual effort to under 3 hours, across 20+ RFPs/month",
      "Built a hybrid NLP + LLM reasoning engine for requirement classification, reaching 90%+ deterministic compliance accuracy",
      "Built document preprocessing pipelines for parsing, chunking, and discrepancy detection, generating 50+ structured DOCX/JSON/XLSX outputs per month",
      "Implemented schema-validated, section-level change logs for 100% traceable audit trails, cutting review cycles",
    ],
    stack: ["Python", "Azure OpenAI", "GPT APIs", "Pydantic", "JSON Pipelines", "Azure Functions", "Power BI"],
  },
  {
    company: "HCL Technologies",
    role: "AI & Backend Developer Intern",
    location: "Noida",
    start: "May 2025",
    end: "Jul 2025",
    summary:
      "Designed and deployed FastAPI backend services powering AI-driven workflows, with a focus on auth, access control, and async performance.",
    achievements: [
      "Designed and deployed FastAPI-based backend services supporting 30+ concurrent users at 99%+ availability",
      "Implemented JWT authentication and Role-Based Access Control (RBAC), reducing the application's attack surface",
      "Improved backend response efficiency by 20–40% through asynchronous request handling",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Async Processing"],
  },
  {
    company: "HCL Technologies",
    role: "Data Analyst Intern",
    location: "Noida",
    start: "Jun 2024",
    end: "Aug 2024",
    summary:
      "Analyzed enterprise operational data at scale to detect unauthorized usage patterns and reduce data-breach risk.",
    achievements: [
      "Analyzed tens of thousands of enterprise user activity records, identifying and remediating 15+ Shadow IT instances",
      "Applied anomaly detection to cut manual log investigation from hours to near-instant flagging",
      "Contributed to an estimated 40% reduction in potential data breach risk",
    ],
    stack: ["Python", "Pandas", "Anomaly Detection", "Operational Analytics"],
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "2022",
    title: "B.Tech Computer Science, Shiv Nadar University",
    description: "Started a CS degree, building toward applied AI and backend engineering.",
  },
  {
    year: "2024",
    title: "Data Analyst Intern, HCL Technologies",
    description: "First production analytics work: anomaly detection across enterprise operational data.",
  },
  {
    year: "2025",
    title: "AI & Backend Developer Intern, HCL Technologies",
    description: "Moved into backend AI systems — FastAPI services, auth, and async performance work.",
  },
  {
    year: "2026",
    title: "AI/ML & Data Analytics Intern, Siemens Energy",
    description: "Built an AI bid-automation platform combining NLP, LLMs, and document pipelines.",
  },
  {
    year: "Now",
    title: "Building production AI systems",
    description: "Focused on agentic architectures, retrieval systems, and predictive ML that hold up in production.",
  },
];

export const stats: Stat[] = [
  { label: "Years building AI systems", value: 4 },
  { label: "Production projects shipped", value: 8 },
  { label: "Internships completed", value: 3 },
  { label: "Public repositories", value: 20 },
  { label: "Technologies in active use", value: 24 },
];

export const techStack: TechCategory[] = [
  {
    name: "Programming",
    items: [
      { name: "Python", level: "Expert" },
      { name: "SQL", level: "Advanced" },
    ],
  },
  {
    name: "LLMs & Agentic AI",
    items: [
      { name: "LangChain", level: "Expert" },
      { name: "LangGraph", level: "Advanced" },
      { name: "Azure OpenAI", level: "Advanced" },
      { name: "Prompt Engineering", level: "Advanced" },
      { name: "Embeddings & Vector DBs", level: "Advanced" },
      { name: "Azure Document Intelligence", level: "Working" },
    ],
  },
  {
    name: "Machine Learning",
    items: [
      { name: "PyTorch", level: "Advanced" },
      { name: "PyTorch Geometric", level: "Advanced" },
      { name: "Scikit-learn", level: "Advanced" },
      { name: "XGBoost", level: "Advanced" },
      { name: "RDKit", level: "Working" },
      { name: "PyKEEN", level: "Working" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "FastAPI", level: "Expert" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Async Processing", level: "Advanced" },
      { name: "JWT & RBAC", level: "Advanced" },
    ],
  },
  {
    name: "Databases & Retrieval",
    items: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "Vector Databases", level: "Advanced" },
    ],
  },
  {
    name: "Cloud & Platforms",
    items: [
      { name: "Azure Functions", level: "Advanced" },
      { name: "Git / GitHub", level: "Advanced" },
      { name: "Jupyter Notebook", level: "Expert" },
    ],
  },
  {
    name: "Visualization",
    items: [
      { name: "Power BI", level: "Advanced" },
      { name: "Tableau", level: "Working" },
      { name: "Matplotlib / Seaborn", level: "Advanced" },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-single-shot-rag-breaks",
    title: "Why single-shot RAG breaks on multi-hop questions",
    excerpt:
      "A walkthrough of where naive retrieve-then-generate pipelines fall apart, and the planner/critic pattern I now default to.",
    date: "2024-11-02",
    readTime: "8 min",
    tag: "Architecture",
    status: "Published",
    content: [
      {
        body:
          "Most RAG demos answer a single-hop question well: retrieve the top-k chunks, stuff them in a prompt, generate. The wheels come off the moment a question needs information from two different documents, or requires comparing a value across time periods that live in separate chunks entirely.",
      },
      {
        heading: "Where it actually breaks",
        body:
          "Single-shot retrieval optimizes for similarity to the query as written. But a question like \"how did the retrieval latency change after we added the reranker\" has no single passage that answers it — the answer only exists as a comparison across two separate log entries. The embedding for the question doesn't point at either passage particularly strongly, so both get buried under noisier but more surface-similar results.",
      },
      {
        heading: "The planner/critic pattern",
        body:
          "The fix I've settled on isn't a smarter embedding model, it's decomposition. A planner agent breaks the question into an explicit sequence of retrieval steps, each with its own rewritten query. Retrieval happens per step, in parallel where steps don't depend on each other. Then, critically, a separate critic pass checks the draft answer against exactly what was retrieved — not what the model assumes — before anything reaches the user.",
      },
      {
        heading: "What changed",
        body:
          "On the Multi-Agent RAG Platform, this moved multi-hop accuracy up meaningfully over a single-shot baseline, and cut the hallucination rate by more than half once the critic pass was added. The latency cost is real — parallel retrieval plus a verification pass adds seconds, not milliseconds — but for anything where correctness matters more than speed, that trade is worth making explicit rather than hidden inside a bigger prompt.",
      },
    ],
  },
  {
    slug: "grounding-generation-in-source-documents",
    title: "Grounding generation in source documents at enterprise scale",
    excerpt:
      "Notes from building a bid-generation system where every generated clause has to trace back to a real source page.",
    date: "2024-08-14",
    readTime: "11 min",
    tag: "Case study",
    status: "Published",
    content: [
      {
        body:
          "When you're generating technical bid content that a client will read as a binding commitment, \"the model sounded confident\" isn't a quality bar. Every clause the system produces has to trace back to a real page in a real prior document — and be checkable by the reviewer without them having to trust the model's judgment.",
      },
      {
        heading: "Grounding as a UI problem, not just a prompting problem",
        body:
          "The instinct is to solve this with a better prompt: \"only use the provided context, cite your sources.\" That helps, but it doesn't hold up under review pressure. What actually worked was making grounding structural: the generation step never sees free-floating context, it sees numbered source passages, and every generated sentence in the review UI is clickable back to the exact passage it came from. If a sentence can't be traced, it doesn't get generated in the first place — the constraint lives in the pipeline, not in a request to behave.",
      },
      {
        heading: "The retrieval layer carries more weight than the generation layer",
        body:
          "In an enterprise document set — thousands of pages of prior bids, compliance clauses, and product specs — pure dense retrieval missed passages that used different terminology for the same technical requirement. Hybrid retrieval (dense embeddings plus BM25 keyword matching) followed by a cross-encoder reranker closed most of that gap. In practice, the generation model was rarely the bottleneck; retrieval recall was.",
      },
      {
        heading: "What the reviewers actually wanted",
        body:
          "The proposal engineers didn't want a fully autonomous system — they wanted their four days back on the parts that were pure retrieval-and-assembly, so they could spend their time on the 10% that required judgment calls. Designing the review UI around \"accept, edit, or regenerate this section\" rather than \"approve the whole document\" turned out to matter more for adoption than any model quality improvement.",
      },
    ],
  },
  {
    slug: "evaluating-retrieval-before-generation",
    title: "Evaluate retrieval before you ever evaluate generation",
    excerpt:
      "Most RAG debugging time is spent in the wrong layer. A practical checklist for isolating retrieval failures first.",
    date: "2024-05-22",
    readTime: "6 min",
    tag: "Learning journal",
    status: "Published",
    content: [
      {
        body:
          "A pattern I keep seeing: a RAG system gives a bad answer, and the first instinct is to tweak the generation prompt. Half the time, the generation model never had a chance — the retrieval step handed it the wrong passages, or worse, no relevant passage at all.",
      },
      {
        heading: "Check retrieval in isolation first",
        body:
          "Before touching the prompt, pull the raw retrieved chunks for the failing query and read them without the generation step in between. If the right passage isn't in the top-k, no amount of prompt engineering downstream fixes that — you have a recall problem, and it needs a retrieval fix: better chunking, hybrid search, query rewriting, or a reranker.",
      },
      {
        heading: "A simple checklist",
        body:
          "In order: confirm the source document was actually ingested and chunked sensibly. Confirm the right chunk appears somewhere in the top 20-30 results before reranking. Confirm the reranker doesn't demote it. Only once all three hold does it make sense to look at how the generation step used what it was given.",
      },
      {
        heading: "Why this saves time",
        body:
          "Debugging generation quality without first isolating retrieval means you're often iterating on a prompt to compensate for missing context — which sometimes works by accident (the model happens to know the answer from pretraining) and then silently breaks on the next similar query. Fixing the actual retrieval gap is slower up front but the fix generalizes; prompt patches usually don't.",
      },
    ],
  },
  {
    slug: "graph-neural-networks-for-tabular-skeptics",
    title: "Graph neural networks, for people who default to tabular models",
    excerpt: "When relational structure is the signal — and when a GNN is genuinely worth the added complexity.",
    date: "2024-02-03",
    readTime: "9 min",
    tag: "Machine learning",
    status: "Published",
    content: [
      {
        body:
          "If your default move for any prediction problem is XGBoost on a flat feature table, you're in good company — it's usually the right call. But there's a specific shape of problem where that default quietly leaves accuracy on the table: when the relationships between entities carry as much signal as the entities' own attributes.",
      },
      {
        heading: "The tell",
        body:
          "Drug-drug interaction prediction is a clean example. You could featurize each drug pair with molecular descriptors and fit a gradient-boosted tree, and it will work reasonably well on drug pairs similar to ones seen in training. It falls over on cold-start pairs — a genuinely new drug with no interaction history — because the flat model has no way to reason about the drug's position in the broader interaction network. A graph neural network can propagate information from a new node's immediate neighbors, which a tabular model structurally cannot do.",
      },
      {
        heading: "What it cost",
        body:
          "The honest trade-off: GNNs are slower to train, harder to debug when predictions look wrong, and the tooling is less mature than the sklearn/XGBoost ecosystem. For the interaction-prediction project, cold-start AUC held up meaningfully better than a tabular baseline on unseen drugs — enough to justify the added complexity for that specific use case. For well-covered, non-relational tabular problems, I'd still reach for XGBoost first.",
      },
      {
        heading: "A rule of thumb",
        body:
          "Ask whether the entity's relationships are themselves the prediction target, or close to it. Interactions, recommendations, fraud rings, molecule properties — the graph structure is usually load-bearing. Churn prediction from account attributes — usually not. Match the model's inductive bias to where the signal actually lives.",
      },
    ],
  },
  {
    slug: "agent-observability-notes",
    title: "Agent observability: what I actually log in production",
    excerpt: "Planned notes on tracing multi-step agent runs so failures are debuggable, not mysterious.",
    date: "2025-01-01",
    readTime: "—",
    tag: "Architecture notes",
    status: "Planned",
  },
];
