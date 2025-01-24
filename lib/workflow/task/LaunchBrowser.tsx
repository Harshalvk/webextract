import { TaskType } from "@/types/task.types";
import { Globe, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch browser",
  icon: (props: LucideProps) => (
    <Globe className="stroke-pink-500" {...props} />
  ),
  isEntryPoint: true,
};
