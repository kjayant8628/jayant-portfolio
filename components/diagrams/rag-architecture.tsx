"use client";

import {
  Binary,
  Database,
  FileSearch,
  FileText,
  HelpCircle,
  Layers,
  ListFilter,
  MessageSquareText,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  ArchitectureDiagram,
  ArchitectureNode,
  ArchitectureSection,
  ConnectionLine,
  AnimatedPacket,
  anchor,
} from "@/components/diagrams";

// Same column rhythm as siemens-bid-architecture.tsx (w/h/gap), shifted down
// to make room for the "User Question" input feeding column 2 from above.
const DOCS_INPUT = { x: 30, y: 394, w: 150, h: 72 };
const QUERY_INPUT = { x: 545, y: 20, w: 200, h: 64 };

const COL1 = { x: 240, w: 210, h: 72 }; // Knowledge ingestion
const COL2 = { x: 530, w: 230, h: 72 }; // Retrieval engine
const COL3 = { x: 860, w: 210, h: 72 }; // LLM pipeline

const ROWS = { top: 240, mid: 394, bottom: 548 };

export function RagPipelineArchitecture() {
  const docsRight = anchor(DOCS_INPUT.x, DOCS_INPUT.y, DOCS_INPUT.w, DOCS_INPUT.h, "right");
  const queryBottom = anchor(QUERY_INPUT.x, QUERY_INPUT.y, QUERY_INPUT.w, QUERY_INPUT.h, "bottom");

  const parserLeft = anchor(COL1.x, ROWS.top, COL1.w, COL1.h, "left");
  const parserBottom = anchor(COL1.x, ROWS.top, COL1.w, COL1.h, "bottom");
  const chunkTop = anchor(COL1.x, ROWS.mid, COL1.w, COL1.h, "top");
  const chunkBottom = anchor(COL1.x, ROWS.mid, COL1.w, COL1.h, "bottom");
  const embedTop = anchor(COL1.x, ROWS.bottom, COL1.w, COL1.h, "top");
  const embedRight = anchor(COL1.x, ROWS.bottom, COL1.w, COL1.h, "right");

  const searchTop = anchor(COL2.x, ROWS.top, COL2.w, COL2.h, "top");
  const searchBottom = anchor(COL2.x, ROWS.top, COL2.w, COL2.h, "bottom");
  const vectorTop = anchor(COL2.x, ROWS.mid, COL2.w, COL2.h, "top");
  const vectorBottom = anchor(COL2.x, ROWS.mid, COL2.w, COL2.h, "bottom");
  const topkTop = anchor(COL2.x, ROWS.bottom, COL2.w, COL2.h, "top");
  const topkRight = anchor(COL2.x, ROWS.bottom, COL2.w, COL2.h, "right");
  const topkBottom = anchor(COL2.x, ROWS.bottom, COL2.w, COL2.h, "bottom");

  const promptLeft = anchor(COL3.x, ROWS.top, COL3.w, COL3.h, "left");
  const promptBottom = anchor(COL3.x, ROWS.top, COL3.w, COL3.h, "bottom");
  const llmTop = anchor(COL3.x, ROWS.mid, COL3.w, COL3.h, "top");
  const llmLeft = anchor(COL3.x, ROWS.mid, COL3.w, COL3.h, "left");
  const llmBottom = anchor(COL3.x, ROWS.mid, COL3.w, COL3.h, "bottom");
  const responseTop = anchor(COL3.x, ROWS.bottom, COL3.w, COL3.h, "top");

  return (
    <ArchitectureDiagram
      viewBox="0 0 1180 720"
      minHeight={480}
      title="System architecture"
      description="Documents are chunked and embedded into a vector store at ingestion time; at query time, semantic search retrieves the top-k relevant chunks and grounds the LLM's response."
    >
      {/* Sections */}
      <ArchitectureSection x={220} y={200} width={270} height={480} label="Knowledge Ingestion" icon={FileSearch} />
      <ArchitectureSection x={510} y={200} width={290} height={480} label="Retrieval Engine" icon={Database} delay={0.1} />
      <ArchitectureSection x={840} y={200} width={270} height={480} label="LLM Pipeline" icon={Sparkles} delay={0.2} />

      {/* Connections */}
      <ConnectionLine id="docs-parser" from={docsRight} to={parserLeft} delay={0.05} />
      <ConnectionLine id="parser-chunk" from={parserBottom} to={chunkTop} delay={0.1} />
      <ConnectionLine id="chunk-embed" from={chunkBottom} to={embedTop} delay={0.15} />
      <ConnectionLine id="embed-vectordb" from={embedRight} to={vectorTop} label="index" delay={0.2} />

      <ConnectionLine id="query-search" from={queryBottom} to={searchTop} delay={0.1} />
      <ConnectionLine id="search-vectordb" from={searchBottom} to={vectorTop} delay={0.25} />
      <ConnectionLine id="vectordb-topk" from={vectorBottom} to={topkTop} delay={0.3} />
      <ConnectionLine id="topk-prompt" from={topkRight} to={promptLeft} delay={0.35} />
      <ConnectionLine
        id="topk-llm-context"
        from={topkBottom}
        to={llmLeft}
        dashed
        label="context window"
        delay={0.4}
      />

      <ConnectionLine id="prompt-llm" from={promptBottom} to={llmTop} delay={0.45} />
      <ConnectionLine id="llm-response" from={llmBottom} to={responseTop} delay={0.5} />

      {/* Flow packets along the live query path */}
      <AnimatedPacket pathId="query-search" delay={0} />
      <AnimatedPacket pathId="search-vectordb" delay={0.6} />
      <AnimatedPacket pathId="vectordb-topk" delay={1.2} />
      <AnimatedPacket pathId="topk-prompt" delay={1.8} />
      <AnimatedPacket pathId="prompt-llm" delay={2.4} />
      <AnimatedPacket pathId="llm-response" delay={3.0} />

      {/* Standalone inputs */}
      <ArchitectureNode
        x={DOCS_INPUT.x}
        y={DOCS_INPUT.y}
        width={DOCS_INPUT.w}
        height={DOCS_INPUT.h}
        icon={FileText}
        title="Enterprise Documents"
        subtitle="PDF · DOCX · TXT"
        delay={0}
      />
      <ArchitectureNode
        x={QUERY_INPUT.x}
        y={QUERY_INPUT.y}
        width={QUERY_INPUT.w}
        height={QUERY_INPUT.h}
        icon={HelpCircle}
        title="User Question"
        subtitle="Natural language query"
        delay={0}
      />

      {/* Knowledge Ingestion */}
      <ArchitectureNode
        x={COL1.x}
        y={ROWS.top}
        width={COL1.w}
        height={COL1.h}
        icon={FileSearch}
        title="Document Parser"
        subtitle="Parse & normalize"
        delay={0.1}
      />
      <ArchitectureNode
        x={COL1.x}
        y={ROWS.mid}
        width={COL1.w}
        height={COL1.h}
        icon={Layers}
        title="Chunking Engine"
        subtitle="Section-aware splits"
        delay={0.15}
      />
      <ArchitectureNode
        x={COL1.x}
        y={ROWS.bottom}
        width={COL1.w}
        height={COL1.h}
        icon={Binary}
        title="Embeddings"
        subtitle="Vector encoding"
        delay={0.2}
      />

      {/* Retrieval Engine */}
      <ArchitectureNode
        x={COL2.x}
        y={ROWS.top}
        width={COL2.w}
        height={COL2.h}
        icon={Search}
        title="Semantic Search"
        subtitle="Query embedding"
        delay={0.25}
      />
      <ArchitectureNode
        x={COL2.x}
        y={ROWS.mid}
        width={COL2.w}
        height={COL2.h}
        icon={Database}
        title="Vector Database"
        subtitle="Similarity index"
        accent
        delay={0.3}
      />
      <ArchitectureNode
        x={COL2.x}
        y={ROWS.bottom}
        width={COL2.w}
        height={COL2.h}
        icon={ListFilter}
        title="Top-K Retrieval"
        subtitle="Ranked context chunks"
        delay={0.35}
      />

      {/* LLM Pipeline */}
      <ArchitectureNode
        x={COL3.x}
        y={ROWS.top}
        width={COL3.w}
        height={COL3.h}
        icon={Wand2}
        title="Prompt Builder"
        subtitle="Context assembly"
        delay={0.4}
      />
      <ArchitectureNode
        x={COL3.x}
        y={ROWS.mid}
        width={COL3.w}
        height={COL3.h}
        icon={Sparkles}
        title="LLM"
        subtitle="Grounded generation"
        accent
        delay={0.45}
      />
      <ArchitectureNode
        x={COL3.x}
        y={ROWS.bottom}
        width={COL3.w}
        height={COL3.h}
        icon={MessageSquareText}
        title="Grounded Response"
        subtitle="Cited answer"
        delay={0.5}
      />
    </ArchitectureDiagram>
  );
}
