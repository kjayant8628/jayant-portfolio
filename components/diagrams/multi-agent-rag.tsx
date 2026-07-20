
"use client";

import {
  BadgeCheck,
  Binary,
  BrainCircuit,
  Database,
  Globe,
  Search,
  ShieldCheck,
  Sparkles,
  MessageSquareText,
} from "lucide-react";

import {
  ArchitectureDiagram,
  ArchitectureNode,
  ArchitectureSection,
  ConnectionLine,
  AnimatedPacket,
  anchor,
} from "@/components/diagrams";

const INPUT = { x: 20, y: 300, w: 160, h: 72 };
const COL1 = { x: 260, w: 180, h: 72 };
const COL2 = { x: 520, w: 180, h: 72 };
const COL3 = { x: 790, w: 180, h: 72 };
const COL4 = { x: 1070, w: 200, h: 72 };
const OUTPUT = { x: 1360, y: 300, w: 180, h: 72 };

const ROW = { top: 120, mid: 300, bottom: 480 };

export function MultiAgentArchitecture() {
  const a = (
    b: { x: number; y: number; w: number; h: number },
    s: "left" | "right" | "top" | "bottom"
  ) => anchor(b.x, b.y, b.w, b.h, s);

  return (
    <ArchitectureDiagram
      viewBox="0 0 1580 620"
      minHeight={500}
      title="Multi-Agent RAG Workflow"
      description="Planner coordinates specialized agents, retrieves knowledge, validates responses and iterates until approval."
    >
      <ArchitectureSection x={230} y={70} width={1060} height={500} label="Multi-Agent Workflow" icon={BrainCircuit}/>
      <ArchitectureSection x={500} y={10} width={420} height={120} label="Knowledge Base" icon={Database} delay={0.1}/>
      <ArchitectureSection x={1330} y={220} width={220} height={170} label="Output" icon={BadgeCheck} delay={0.2}/>

      <ArchitectureNode x={INPUT.x} y={INPUT.y} width={INPUT.w} height={INPUT.h}
        icon={MessageSquareText} title="User Question" subtitle="Natural language"/>

      <ArchitectureNode x={COL1.x} y={ROW.mid} width={COL1.w} height={COL1.h}
        icon={BrainCircuit} title="Planner Agent" subtitle="Task orchestration" accent delay={0.1}/>

      <ArchitectureNode x={COL2.x} y={ROW.top} width={COL2.w} height={COL2.h}
        icon={Search} title="Research Agent" subtitle="Evidence gathering" delay={0.2}/>

      <ArchitectureNode x={560} y={40} width={170} height={60}
        icon={Database} title="Vector DB" subtitle="Knowledge index"/>

      <ArchitectureNode x={760} y={40} width={170} height={60}
        icon={Binary} title="Embeddings" subtitle="Semantic vectors"/>

      <ArchitectureNode x={COL3.x} y={ROW.mid} width={COL3.w} height={COL3.h}
        icon={Globe} title="External Agent" subtitle="Tools / APIs" delay={0.25}/>

      <ArchitectureNode x={COL4.x} y={ROW.mid} width={COL4.w} height={COL4.h}
        icon={ShieldCheck} title="Critic Agent" subtitle="Verification" accent delay={0.3}/>

      <ArchitectureNode x={COL4.x+230} y={ROW.mid} width={220} height={72}
        icon={Sparkles} title="Final Response Agent" subtitle="Compose answer" delay={0.35}/>

      <ArchitectureNode x={OUTPUT.x} y={OUTPUT.y} width={OUTPUT.w} height={72}
        icon={BadgeCheck} title="Verified Answer" subtitle="Final output"/>

      <ConnectionLine id="q-plan" from={a(INPUT,"right")} to={a({...COL1,y:ROW.mid},"left")} />
      <ConnectionLine id="plan-research" from={a({...COL1,y:ROW.mid},"top")} to={a({...COL2,y:ROW.top},"left")} />
      <ConnectionLine id="research-db" from={a({...COL2,y:ROW.top},"top")} to={a({x:560,y:40,w:170,h:60},"bottom")} />
      <ConnectionLine id="db-embed" from={a({x:560,y:40,w:170,h:60},"right")} to={a({x:760,y:40,w:170,h:60},"left")} />
      <ConnectionLine id="embed-critic" from={a({x:760,y:40,w:170,h:60},"bottom")} to={a({...COL4,y:ROW.mid},"top")} />
      <ConnectionLine id="plan-ext" from={a({...COL1,y:ROW.mid},"right")} to={a({...COL3,y:ROW.mid},"left")} />
      <ConnectionLine id="ext-critic" from={a({...COL3,y:ROW.mid},"right")} to={a({...COL4,y:ROW.mid},"left")} />
      <ConnectionLine id="critic-final" from={a({...COL4,y:ROW.mid},"right")} to={a({x:COL4.x+230,y:ROW.mid,w:220,h:72},"left")} label="Approved"/>
      <ConnectionLine id="final-out" from={a({x:COL4.x+230,y:ROW.mid,w:220,h:72},"right")} to={a(OUTPUT,"left")} />
      <ConnectionLine id="revision" from={a({...COL4,y:ROW.mid},"bottom")} to={a({...COL1,y:ROW.mid},"bottom")} dashed label="Needs Revision"/>

      <AnimatedPacket pathId="q-plan"/>
      <AnimatedPacket pathId="plan-research" delay={0.5}/>
      <AnimatedPacket pathId="research-db" delay={1.0}/>
      <AnimatedPacket pathId="embed-critic" delay={1.5}/>
      <AnimatedPacket pathId="critic-final" delay={2.0}/>
      <AnimatedPacket pathId="final-out" delay={2.5}/>
      <AnimatedPacket pathId="revision" delay={3.0}/>
    </ArchitectureDiagram>
  );
}
