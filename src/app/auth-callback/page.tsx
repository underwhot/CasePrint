"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 1000,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      router.push(`/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-10">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-5 animate-spin text-primary" />
        <p className="text-lg">Authenticating...</p>
        <p className="text-sm text-muted-foreground">
          You will be redirected shortly
        </p>
      </div>
    </div>
  );
}
