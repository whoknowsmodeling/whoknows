import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-neutral-500 animate-spin" />
      <p className="text-sm text-neutral-400 font-medium uppercase tracking-widest animate-pulse">
        Loading Data...
      </p>
    </div>
  );
}
