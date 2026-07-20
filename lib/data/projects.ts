import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "siemens-bid-automation",
    name: "AI Bid Automation Platform",
    tagline: "Cutting RFP technical-offer turnaround from days to under 3 hours at Siemens Energy",
    category: "Enterprise",
    featured: true,
    year: "Jan 2026 — Jun 2026",
    problem:
      "Siemens Energy's proposal teams spent 16–40 hours of manual effort per RFP assembling technical offers — classifying requirements, cross-checking compliance clauses, and formatting outputs across 20+ RFPs a month.",
    role:
      "AI/ML & Data Analytics Intern embedded with the bid team. Built the reasoning engine, document pipelines, and audit-log system end-to-end.",
    architecture: [
      "Hybrid NLP + LLM reasoning engine classifies requirements against compliance clauses with deterministic rules backing the model's judgment",
      "Document preprocessing pipeline parses, chunks, and flags discrepancies across incoming RFP documents",
      "Automated generation of structured DOCX/JSON/XLSX outputs, replacing manual formatting entirely",
      "Schema-validated, section-level change logs give reviewers a fully traceable audit trail of every generated edit",
      "Built on Azure OpenAI and GPT APIs with Pydantic-enforced schemas end-to-end",
    ],
    stack: ["Python", "Azure OpenAI", "GPT APIs", "Pydantic", "JSON Pipelines", "Azure Functions", "Power BI"],
    metrics: [
      { label: "Processing time", value: "-90%", detail: "16–40 hrs → under 3 hrs per RFP" },
      { label: "Compliance accuracy", value: "90%+", detail: "deterministic classification accuracy" },
      { label: "Outputs automated", value: "50+/mo", detail: "structured DOCX/JSON/XLSX documents" },
    ],
    impact:
      "Freed proposal engineers from manual classification and formatting so they could focus on commercial judgment, while giving reviewers a fully traceable, schema-validated audit trail.",
  },
  {
    slug: "enterprise-rag-assistant",
    name: "Enterprise RAG Assistant",
    tagline: "Agentic document intelligence for grounded enterprise Q&A",
    category: "Agentic AI",
    featured: true,
    year: "2025",
    problem:
      "Enterprise knowledge is usually spread across long, unstructured documents, making manual search slow and making it hard to answer complex questions with confidence.",
    role: "Built the retrieval and question-answering pipeline, including document processing, indexing, and API orchestration.",
    architecture: [
      "Processed and chunked enterprise documents into retrieval-ready context",
      "Generated embeddings and indexed them for semantic search over the knowledge base",
      "Orchestrated retrieval and response generation through an API-driven assistant workflow",
    ],
    stack: ["Python", "FastAPI", "RAG", "Embeddings", "Vector Database", "LangChain","JWT","RBAC"],
    metrics: [
      { label: "Search flow", value: "Grounded", detail: "answers backed by retrieved enterprise context" },
      { label: "Knowledge base", value: "Document-driven", detail: "built for unstructured internal content" },
      { label: "Interface", value: "API-based", detail: "assistant exposed through a production-ready service" },
    ],
    impact:
      "Turned scattered enterprise documents into a structured assistant that can retrieve relevant context and generate more reliable answers than manual search.",
  },
    {
    slug: "multi-agent-rag",
    name: "Multi-Agent RAG API",
    tagline: "Production-ready multi-agent retrieval system for grounded question answering",
    category: "Agentic AI",
    featured: true,
    year: "2025",
    problem:
      "Single-shot RAG systems often struggle with routing, confidence, and hallucination control when queries require both retrieval and reasoning.",
    role: "Designed the agent workflow, retrieval layer, response validation, and production API orchestration.",
    architecture: [
      "Built a multi-agent pipeline with planner, researcher, external reasoning, and critic roles",
      "Used embeddings and vector search to retrieve grounded evidence from the document corpus",
      "Added confidence-based validation to reduce hallucinations before returning final answers",
    ],
    stack: ["Python", "FastAPI", "ChromaDB", "Groq", "Embeddings", "RAG"],
    metrics: [
      { label: "Response flow", value: "4 agents", detail: "planner, researcher, external, critic" },
      { label: "Retrieval layer", value: "Vector DB", detail: "semantic document-grounded search" },
      { label: "Deployment", value: "Render", detail: "production-hosted API service" },
    ],
    impact:
      "Demonstrated that splitting planning, retrieval, reasoning, and critique into specialized agents improves reliability and reduces hallucinations in document QA.",
  },
  {
    slug: "drug-drug-interaction-prediction",
    name: "Drug-Drug Interaction Prediction",
    tagline: "A hybrid GNN + knowledge-graph model predicting adverse interactions across 2.9M+ drug pairs",
    category: "Applied ML",
    featured: true,
    year: "2025",
    problem:
      "Adverse drug-drug interactions are a leading cause of preventable hospitalizations, and single-signal models (structure-only or graph-only) underperform on the scale and sparsity of real biomedical interaction data.",
    role: "End-to-end: data integration, knowledge-graph construction, model architecture, training, and evaluation.",
    architecture: [
      "Hybrid GNN–knowledge graph architecture fuses molecular structure with relational graph context",
      "Data pipeline integrates DrugBank, KEGG, UniProt, ATC, and MeSH into a unified biomedical knowledge graph",
      "Message-passing neural networks learn drug embeddings, fused with knowledge-graph embeddings for the final prediction",
      "Hyperparameter optimization tuned across both the structural and knowledge-graph branches for multimodal performance",
    ],
    stack: ["Python", "PyTorch", "PyTorch Geometric", "RDKit", "PyKEEN", "Pandas", "Scikit-learn"],
    metrics: [
      { label: "Accuracy", value: "92.3%", detail: "on held-out drug-pair predictions" },
      { label: "AUROC", value: "0.932", detail: "outperforming structure-only and KG-only baselines" },
      { label: "Drug pairs modeled", value: "2.9M+", detail: "biomedical drug-pair records" },
    ],
    impact:
      "Showed that fusing molecular structure with knowledge-graph context meaningfully outperforms either signal alone — directly relevant to real-world DDI screening at scale.",
  },
  {
    slug: "tourism-demand-forecasting",
    name: "Indian Tourism Demand Forecasting",
    tagline: "Benchmarking ARIMA vs. XGBoost for resilient demand forecasting through COVID-era disruption",
    category: "Forecasting",
    featured: false,
    year: "2024",
    problem:
      "Tourism demand is volatile and highly sensitive to external shocks — COVID-19 being the clearest example — making a single naive forecasting model unreliable for planning.",
    role: "End-to-end: data pipeline, model benchmarking, and scenario analysis for stakeholders.",
    architecture: [
      "Trained and benchmarked ARIMA and XGBoost across multi-source tourism datasets",
      "Generated rolling 3–12 month demand forecasts across multiple regions and scenarios",
      "Evaluated both models on RMSE, MAE, and MAPE across volatile, real-world time-series data",
    ],
    stack: ["Python", "ARIMA", "XGBoost", "Pandas", "NumPy"],
    metrics: [
      { label: "Forecast horizon", value: "3–12 mo", detail: "rolling scenario-driven forecasts" },
      { label: "Scenario insights", value: "15+", detail: "delivered for strategic planning" },
      { label: "Model resilience", value: "XGBoost", detail: "more resilient to non-linear disruptions like COVID-19" },
    ],
    impact:
      "Demonstrated that gradient-boosted trees held up meaningfully better than classical time-series models under real-world disruption, directly informing which model to trust for planning.",
  },

  {
    slug: "real-estate-price-prediction",
    name: "Real Estate Price Prediction",
    tagline: "End-to-end property analytics and prediction pipeline with explainability",
    category: "Applied ML",
    featured: false,
    year: "2024",
    problem:
      "Property pricing depends on many interacting signals, and raw housing data needs heavy cleaning and feature engineering before it can support reliable prediction.",
    role: "Built the full data pipeline from cleaning and EDA to model training, explainability, and dashboard/API integration.",
    architecture: [
      "Processed raw housing data through cleaning, preprocessing, feature engineering, and statistical analysis",
      "Benchmarked a baseline Linear Regression model against XGBoost with hyperparameter tuning",
      "Added SHAP-based explainability plus prediction API and dashboard integration",
    ],
    stack: ["Python", "SQL", "XGBoost", "Pandas", "NumPy", "Scikit-learn"],
    metrics: [
      { label: "Modeling", value: "XGBoost", detail: "final prediction model after tuning" },
      { label: "Explainability", value: "SHAP", detail: "global feature importance analysis" },
      { label: "Pipeline", value: "End-to-end", detail: "data to dashboard and API" },
    ],
    impact:
      "Turned messy real-estate data into a structured analytics pipeline that supports pricing insights, model transparency, and deployable predictions.",
  },
  {
    slug: "zomato-data-analysis",
    name: "Zomato Data Analysis",
    tagline: "Restaurant analytics project combining EDA, SQL, and lightweight prediction",
    category: "Applied ML",
    featured: false,
    year: "2024",
    problem:
      "Restaurant datasets are noisy, inconsistent, and difficult to turn into business insights without structured cleaning, analysis, and querying.",
    role: "Handled data cleaning, exploratory analysis, SQL-driven insights, and baseline rating prediction.",
    architecture: [
      "Cleaned and standardized restaurant data for analysis-ready use",
      "Performed EDA to uncover cuisine, ratings, order behavior, and locality patterns",
      "Loaded the dataset into SQLite for SQL-based business analysis and built a simple predictive model for ratings",
    ],
    stack: ["Python", "Pandas", "NumPy", "SQLite", "Matplotlib", "Seaborn"],
    metrics: [
      { label: "Dataset scale", value: "50K+", detail: "restaurant records analyzed" },
      { label: "Query layer", value: "SQLite", detail: "used for structured business insights" },
      { label: "Model", value: "Linear Regression", detail: "baseline rating prediction" },
    ],
    impact:
      "Converted raw restaurant data into actionable insights on cuisine trends, ratings, and location patterns that can support restaurant planning and market research.",
  },
];
