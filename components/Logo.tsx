import { cn } from "@/lib/utils";
import { Webhook } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  fontSize?: string;
  iconSize?: number;
};

const Logo = ({ fontSize = "text-2xl", iconSize = 20 }: Props) => {
  return (
    <Link
      href={"/dashboard"}
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-tr from-zinc-400 to-zinc-950 p-2">
        <Webhook size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-t from-zinc-500 dark:from-zinc-400 to-zinc-950 dark:to-white bg-clip-text text-transparent">
          Web
        </span>
        <span className="bg-gradient-to-t from-zinc-500 dark:from-zinc-400 to-zinc-950 dark:to-white bg-clip-text text-transparent">
          extract
        </span>
      </div>
    </Link>
  );
};

export default Logo;
