import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workflow.types";
import { LogCollector } from "./log.types";

export type Environment = {
  browser?: Browser;
  page?: Page;
  //phases with nodeId/taskId as key
  phases: {
    [key: string]: {
      //key: nodeId/taskId
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: string): void;

  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;

  getPage(): Page | undefined;
  setPage(page: Page): void;

  log: LogCollector;
};
