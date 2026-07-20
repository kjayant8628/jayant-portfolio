import { SiemensBidArchitecture } from "@/components/diagrams/siemens-bid-architecture";

export default function DiagramTestPage() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-7xl">
        <SiemensBidArchitecture />
      </div>
    </main>
  );
}