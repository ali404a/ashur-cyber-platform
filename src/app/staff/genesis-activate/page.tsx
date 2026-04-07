"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Loader2, Sparkles } from "lucide-react";
import { upgradeToAdmin } from "@/app/actions/adminActions";

export default function GenesisActivatePage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const targetPhone = "07748880081";

  useEffect(() => {
    async function activate() {
      try {
        const result = await upgradeToAdmin(targetPhone);
        if (result.success) {
          setStatus("success");
          // Clear cookies to ensure fresh login
          document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "user_phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    }
    activate();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center ring-1 ring-primary/20">
      <div className="max-w-md space-y-8">
        
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">Injecting_Admin_Authority...</h1>
              <p className="text-xs text-slate-500 font-mono tracking-widest animate-pulse">Relaying_Signal_To_Cluster // Security_Bypass_Active</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-24 h-24 bg-primary/20 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(0,255,65,0.3)] animate-bounce">
               <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-primary">Status: SECURE</h1>
                <p className="text-[10px] text-slate-500 font-mono tracking-[0.4em] uppercase">Account_{targetPhone}_Elevated</p>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                تمت ترقية حسابك بنجاح لمنصب المسؤول الأعلى. <br />
                يمكنك الآن التوجه لبوابة الكادر وتسجيل الدخول.
              </p>
              <div className="pt-8">
                <a 
                  href="/staff" 
                  className="inline-flex items-center gap-3 bg-primary text-background font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,65,0.2)]"
                >
                  <Sparkles className="w-4 h-4" />
                  دخول الكادر (Staff)
                </a>
              </div>
            </div>
          </>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <h1 className="text-red-500 text-3xl font-black italic uppercase">Elevation_Failed</h1>
            <p className="text-xs text-slate-500">يرجى التأكد من أنك قمت بإنشاء حساب بهذا الرقم أولاً.</p>
          </div>
        )}

      </div>
    </div>
  );
}
