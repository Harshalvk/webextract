import type { LucideIcon } from "lucide-react";
import React from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

type Props = {
  icon?: LucideIcon;
  title?: string;
  subTitle?: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const CustomDialogHeader = ({
  icon,
  title,
  subTitle,
  iconClassName,
  titleClassName,
  subtitleClassName,
}: Props) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {icon &&
            React.createElement(icon, { className: cn("", iconClassName) })}
          {title && (
            <p className={cn("text-xl text-primary", titleClassName)}>
              {title}
            </p>
          )}
          {subTitle && (
            <p
              className={cn("text-sm text-muted-foreground", subtitleClassName)}
            >
              {subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
