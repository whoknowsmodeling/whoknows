"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { unlockWebsite } from "@/app/maintenance/actions";
import { Eye, EyeOff } from "lucide-react";

interface MaintenanceUnlockFormProps {
  buttonText: string;
  placeholderText: string;
}

export function MaintenanceUnlockForm({ buttonText, placeholderText }: MaintenanceUnlockFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);

    try {
      const result = await unlockWebsite(password);

      if (result.success) {
        toast.success("Akses diberikan.");
        router.push("/");
        router.refresh();
      } else {
        toast.error(result.error || "Password salah.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="relative flex-1">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholderText}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-900/80 backdrop-blur-sm border-neutral-800 text-white focus:ring-white placeholder:text-neutral-500 text-sm py-5 pr-10 w-full"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-neutral-200 transition-all font-sans font-medium text-xs tracking-widest uppercase px-6 py-5 whitespace-nowrap"
        >
          {loading ? "Checking..." : buttonText}
        </Button>
      </div>
    </form>
  );
}
