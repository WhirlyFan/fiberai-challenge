import path from "path";
import { parseCompanyList, scrapeCompanyPages } from "./utils";
import { createDir } from "../challenge-1/utils";
import fse from "fs-extra";
import { CSV_INPUT_PATH, JSON_OUTPUT_PATH } from "./resources";

/**
 * The entry point function. This will read the provided CSV file, scrape the companies'
 * YC pages, and output structured data in a JSON file.
 */
export async function processCompanyList() {
  const __filepath = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filepath);
  const csvPath = path.join(__dirname, CSV_INPUT_PATH);
  // Parse the CSV file and return a list of companies and their YC URLs
  const companies = await parseCompanyList(__dirname, csvPath);
  // Create the 'out' directory if it doesn't exist
  await createDir(__dirname, "out");
  // Scrape company pages
  const scrapedData = await scrapeCompanyPages(companies);
  // Write the JSON string to the file
  // This can be done in batches if the data is too large, however that seems out of scope for this problem
  await fse.writeFile(
    path.join(__dirname, JSON_OUTPUT_PATH),
    JSON.stringify(scrapedData, null, 2)
  );
}
