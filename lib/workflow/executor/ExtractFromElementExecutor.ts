import { ExecutionEnvironment } from "@/types/executor.types";
import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("selector is not provided");
      return false;
    }
    const html = environment.getInput("HTML");
    if (!html) {
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error("Element not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Element not found");
      return false;
    }

    environment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
