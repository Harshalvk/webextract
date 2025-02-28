import { waitFor } from "@/lib/helper/waitFor";
import { ExecutionEnvironment } from "@/types/executor.types";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    console.log("URL::::", websiteUrl);
    const browser = await puppeteer.launch({
      headless: false, // for testing
    });
    await waitFor(3000);
    await browser.close();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
