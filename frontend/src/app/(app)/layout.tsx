import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WalletConnect } from "@/components/wallet-connect";
import getConfig from "next/config";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { cookieToInitialState } from "wagmi";
import { Providers } from "../providers";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <Providers initialState={initialState}>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b">
            <SidebarTrigger />
            <WalletConnect />
          </header>
          <main className="p-4 space-y-4">{children}</main>
        </div>
      </SidebarProvider>
      <Toaster />
    </Providers>
  );
}
