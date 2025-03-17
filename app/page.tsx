import QrGenerator from "@/components/QrGenerator";

export default function Home() {
  return (
    <div className={"min-h-screen flex flex-col gap-6 "}>
      <div className="overflow-hidden">
        <QrGenerator />
      </div>
    </div>
  );
}
