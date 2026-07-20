"use client";

import {
  AlertTriangle,
  BarChart3,
  FileOutput,
  FileSearch,
  FileText,
  History,
  Layers,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  ArchitectureDiagram,
  ArchitectureNode,
  ArchitectureSection,
  ConnectionLine,
  AnimatedPacket,
  anchor,
} from "@/components/diagrams";

// Column layout constants — kept explicit rather than auto-computed so the
// diagram is easy to eyeball and adjust node-by-node.
const INPUT = { x: 30, y: 284, w: 150, h: 72 };
const COL1 = { x: 240, w: 210, h: 72 }; // Ingestion pipeline
const COL2 = { x: 530, w: 230, h: 72 }; // Reasoning engine
const COL3 = { x: 860, w: 210, h: 72 }; // Structured outputs

const ROWS = { top: 130, mid: 284, bottom: 438 };

export function SiemensBidArchitecture() {
  // Precompute anchors so ConnectionLines read declaratively below.
  const inputRight = anchor(INPUT.x, INPUT.y, INPUT.w, INPUT.h, "right");

  const parserLeft = anchor(COL1.x, ROWS.top, COL1.w, COL1.h, "left");
  const parserBottom = anchor(COL1.x, ROWS.top, COL1.w, COL1.h, "bottom");
  const chunkTop = anchor(COL1.x, ROWS.mid, COL1.w, COL1.h, "top");
  const chunkBottom = anchor(COL1.x, ROWS.mid, COL1.w, COL1.h, "bottom");
  const discrepancyTop = anchor(COL1.x, ROWS.bottom, COL1.w, COL1.h, "top");
  const discrepancyRight = anchor(COL1.x, ROWS.bottom, COL1.w, COL1.h, "right");
  const discrepancyBottom = anchor(COL1.x, ROWS.bottom, COL1.w, COL1.h, "bottom");

  const classifierLeft = anchor(COL2.x, ROWS.top, COL2.w, COL2.h, "left");
  const classifierBottom = anchor(COL2.x, ROWS.top, COL2.w, COL2.h, "bottom");
  const llmTop = anchor(COL2.x, ROWS.mid, COL2.w, COL2.h, "top");
  const llmBottom = anchor(COL2.x, ROWS.mid, COL2.w, COL2.h, "bottom");
  const complianceTop = anchor(COL2.x, ROWS.bottom, COL2.w, COL2.h, "top");
  const complianceRight = anchor(COL2.x, ROWS.bottom, COL2.w, COL2.h, "right");

  const generatorLeft = anchor(COL3.x, ROWS.top, COL3.w, COL3.h, "left");
  const generatorBottom = anchor(COL3.x, ROWS.top, COL3.w, COL3.h, "bottom");
  const logTop = anchor(COL3.x, ROWS.mid, COL3.w, COL3.h, "top");
  const logLeft = anchor(COL3.x, ROWS.mid, COL3.w, COL3.h, "left");
  const logBottom = anchor(COL3.x, ROWS.mid, COL3.w, COL3.h, "bottom");
  const dashboardTop = anchor(COL3.x, ROWS.bottom, COL3.w, COL3.h, "top");

  return (
    <ArchitectureDiagram
      viewBox="0 0 1180 640"
      minHeight={440}
      title="System architecture"
      description="RFP documents enter through the ingestion pipeline, get classified and reasoned over by the hybrid NLP + LLM engine, and exit as schema-validated, auditable outputs."
    >
      {/* Sections (rendered first, behind nodes/connections) */}
      <ArchitectureSection
        x={220}
        y={80}
        width={270}
        height={480}
        label="Ingestion Pipeline"
        icon={FileSearch}
      />
      <ArchitectureSection
        x={510}
        y={80}
        width={290}
        height={480}
        label="Hybrid NLP + LLM Reasoning"
        icon={Sparkles}
        delay={0.1}
      />
      <ArchitectureSection
        x={840}
        y={80}
        width={270}
        height={480}
        label="Structured Outputs & Audit"
        icon={FileOutput}
        delay={0.2}
      />

      {/* Connections */}
      <ConnectionLine id="input-parse" from={inputRight} to={parserLeft} delay={0.05} />
      <ConnectionLine id="parse-chunk" from={parserBottom} to={chunkTop} delay={0.1} />
      <ConnectionLine id="chunk-discrepancy" from={chunkBottom} to={discrepancyTop} delay={0.15} />
      <ConnectionLine id="ingest-reason" from={discrepancyRight} to={classifierLeft} delay={0.2} />
      <ConnectionLine id="classify-llm" from={classifierBottom} to={llmTop} delay={0.25} />
      <ConnectionLine id="llm-compliance" from={llmBottom} to={complianceTop} delay={0.3} />
      <ConnectionLine id="reason-output" from={complianceRight} to={generatorLeft} delay={0.35} />
      <ConnectionLine id="output-log" from={generatorBottom} to={logTop} delay={0.4} />
      <ConnectionLine id="log-dashboard" from={logBottom} to={dashboardTop} delay={0.45} />
      <ConnectionLine
        id="compliance-audit"
        from={discrepancyBottom}
        to={logLeft}
        dashed
        label="audit trail"
        delay={0.5}
      />

      {/* Flow packets along the primary path */}
      <AnimatedPacket pathId="input-parse" delay={0} />
      <AnimatedPacket pathId="ingest-reason" delay={0.6} />
      <AnimatedPacket pathId="reason-output" delay={1.2} />
      <AnimatedPacket pathId="output-log" delay={1.8} />

      {/* Nodes (rendered last, on top) */}
      <ArchitectureNode
        x={INPUT.x}
        y={INPUT.y}
        width={INPUT.w}
        height={INPUT.h}
        icon={FileText}
        title="RFP Documents"
        subtitle="20+ / month"
        delay={0}
      />

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
        subtitle="Section-aware chunks"
        delay={0.15}
      />
      <ArchitectureNode
        x={COL1.x}
        y={ROWS.bottom}
        width={COL1.w}
        height={COL1.h}
        icon={AlertTriangle}
        title="Discrepancy Detection"
        subtitle="Flags inconsistencies"
        delay={0.2}
      />

      <ArchitectureNode
        x={COL2.x}
        y={ROWS.top}
        width={COL2.w}
        height={COL2.h}
        icon={ListChecks}
        title="NLP Requirement Classifier"
        subtitle="Deterministic rules"
        delay={0.25}
      />
      <ArchitectureNode
        x={COL2.x}
        y={ROWS.mid}
        width={COL2.w}
        height={COL2.h}
        icon={Sparkles}
        title="Azure OpenAI · GPT Reasoning"
        subtitle="LLM reasoning layer"
        accent
        delay={0.3}
      />
      <ArchitectureNode
        x={COL2.x}
        y={ROWS.bottom}
        width={COL2.w}
        height={COL2.h}
        icon={ShieldCheck}
        title="Schema-Validated Compliance"
        subtitle="Pydantic-enforced"
        delay={0.35}
      />

      <ArchitectureNode
        x={COL3.x}
        y={ROWS.top}
        width={COL3.w}
        height={COL3.h}
        icon={FileOutput}
        title="DOCX / JSON / XLSX Generator"
        subtitle="50+ outputs / month"
        delay={0.4}
      />
      <ArchitectureNode
        x={COL3.x}
        y={ROWS.mid}
        width={COL3.w}
        height={COL3.h}
        icon={History}
        title="Section-Level Change Log"
        subtitle="100% traceable"
        delay={0.45}
      />
      <ArchitectureNode
        x={COL3.x}
        y={ROWS.bottom}
        width={COL3.w}
        height={COL3.h}
        icon={BarChart3}
        title="Power BI Dashboard"
        subtitle="Reviewer visibility"
        accent
        delay={0.5}
      />
    </ArchitectureDiagram>
  );
}
