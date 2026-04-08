"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Welcome back, Admin");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif text-white font-medium">Admin Portal</h1>
          <p className="text-neutral-400 text-sm mt-1">Authorized access only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@whoknows.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white focus:ring-white transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-neutral-300">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white focus:ring-white transition-all"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-6 font-medium text-sm tracking-widest uppercase"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => router.push("/")}
            className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors"
          >
            Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}
