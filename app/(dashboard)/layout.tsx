import { auth } from "@/auth";
import BreadcrumHeader from "@/components/BreadcrumHeader";
import DesktopSidebar from "@/components/Sidebar";
import SignIn from "@/components/SignIn";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import UserAccount from "@/components/UserAccount";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumHeader />
          <div className="gap-2 flex items-center">
            {user ? (
              <UserAccount user={user} />
            ) : (
              <SignIn/>
            )}
            <ModeToggle />
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
