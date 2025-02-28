import { TaskParamType, TaskType } from "@/types/task.types";
import { WorkflowTask } from "@/types/workflow.types";
import { Globe, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch browser",
  icon: (props: LucideProps) => <Globe className="stroke-primary" {...props} />,
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.github.com",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [{ name: "Web page", type: TaskParamType.BROWSER_INSTANCE }],
} satisfies WorkflowTask;
