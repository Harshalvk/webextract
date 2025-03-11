import { TaskParamType, TaskType } from "@/types/task.types";
import { WorkflowTask } from "@/types/workflow.types";
import { Link, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const NavigateUrlTask = {
  type: TaskType.NAVIGATE_URL,
  label: "Navigate Url",
  icon: (props: LucideProps) => (
    <Link className="stroke-primary" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "URL",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
