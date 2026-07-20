
"use client";

import {
  Database,
  Binary,
  GitBranch,
  Beaker,
  BrainCircuit,
  Workflow,
  FlaskConical,
  BarChart3,
  ShieldCheck,
  Activity,
} from "lucide-react";

import {
  ArchitectureDiagram,
  ArchitectureNode,
  ArchitectureSection,
  ConnectionLine,
  AnimatedPacket,
  anchor,
} from "@/components/diagrams";

const W = 230;
const H = 84;

const N = {
  s:{x:40,y:40,w:W,h:H},
  p:{x:40,y:180,w:W,h:H},
  m:{x:40,y:340,w:W,h:H},
  k:{x:360,y:340,w:W,h:H},
  f:{x:690,y:340,w:W,h:H},
  o:{x:1010,y:340,w:W,h:H},
  g:{x:1010,y:180,w:W,h:H},
  e:{x:1330,y:180,w:W,h:H},
  i:{x:1330,y:340,w:W,h:H},
  r:{x:1330,y:500,w:W,h:H},
};

export function DDIArchitecture() {
 const a = (
    b: { x: number; y: number; w: number; h: number },
    side: "left" | "right" | "top" | "bottom"
  ) => anchor(b.x, b.y, b.w, b.h, side);

  return (
    <ArchitectureDiagram
      viewBox="0 0 1600 620"
      minHeight={560}
      title="Drug-Drug Interaction Prediction"
      description="Biomedical knowledge graphs and molecular representations are fused into a Graph Neural Network to predict clinically relevant drug interactions."
    >

      <ArchitectureSection x={20} y={20} width={270} height={430} label="Data Pipeline" icon={Database}/>
      <ArchitectureSection x={320} y={300} width={620} height={170} label="Feature Engineering" icon={Workflow}/>
      <ArchitectureSection x={980} y={140} width={590} height={470} label="Graph Learning & Inference" icon={BrainCircuit}/>

      <ArchitectureNode {...N.s} icon={Database}
        title="Biomedical Sources"
        subtitle="DrugBank • KEGG • UniProt • ATC • MeSH"/>

      <ArchitectureNode {...N.p} icon={Beaker}
        title="Data Engineering"
        subtitle="Cleaning • Mapping • Drug Pair Generation"
        accent/>

      <ArchitectureNode {...N.m} icon={Binary}
        title="Molecular Features"
        subtitle="RDKit • Morgan FP • Atom Features"/>

      <ArchitectureNode {...N.k} icon={GitBranch}
        title="Knowledge Graph"
        subtitle="Relations • Targets • KG Embeddings"/>

      <ArchitectureNode {...N.f} icon={Workflow}
        title="Multimodal Fusion"
        subtitle="Feature Fusion • Normalization"/>

      <ArchitectureNode {...N.g} icon={BrainCircuit}
        title="Graph Neural Network"
        subtitle="PyTorch Geometric"
        accent/>

      <ArchitectureNode {...N.o} icon={FlaskConical}
        title="Model Optimization"
        subtitle="Hyperparameter Search • Cross Validation"/>

      <ArchitectureNode {...N.e} icon={BarChart3}
        title="Evaluation"
        subtitle="Accuracy • Precision • Recall • F1 • ROC-AUC"/>

      <ArchitectureNode {...N.i} icon={ShieldCheck}
        title="Interaction Prediction"
        subtitle="Drug Pair Risk Classification"
        accent/>

      <ArchitectureNode {...N.r} icon={Activity}
        title="Clinical Interpretation"
        subtitle="Risk Score • Decision Support"/>

      <ConnectionLine id="sp" from={a(N.s,"bottom")} to={a(N.p,"top")} />
      <ConnectionLine id="pm" from={a(N.p,"bottom")} to={a(N.m,"top")} />
      <ConnectionLine id="pk" from={a(N.p,"right")} to={a(N.k,"left")} />
      <ConnectionLine id="mf" from={a(N.m,"right")} to={a(N.f,"left")} />
      <ConnectionLine id="kf" from={a(N.k,"right")} to={a(N.f,"left")} dashed label="KG"/>
      <ConnectionLine id="fg" from={a(N.f,"right")} to={a(N.g,"left")} />
      <ConnectionLine id="og" from={a(N.o,"left")} to={a(N.g,"right")} dashed label="tune"/>
      <ConnectionLine id="ge" from={a(N.g,"right")} to={a(N.e,"left")} />
      <ConnectionLine id="gi" from={a(N.g,"bottom")} to={a(N.i,"top")} />
      <ConnectionLine id="ir" from={a(N.i,"bottom")} to={a(N.r,"top")} />

      <AnimatedPacket pathId="sp"/>
      <AnimatedPacket pathId="pm" delay={0.4}/>
      <AnimatedPacket pathId="mf" delay={0.8}/>
      <AnimatedPacket pathId="fg" delay={1.2}/>
      <AnimatedPacket pathId="gi" delay={1.6}/>
      <AnimatedPacket pathId="ir" delay={2.0}/>

    </ArchitectureDiagram>
  );
}
