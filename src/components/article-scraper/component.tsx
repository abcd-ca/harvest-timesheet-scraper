import React, { useEffect, useState } from "react";
import { browser, Tabs } from "webextension-polyfill-ts";

// // // //

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const ArticleScraper: React.FC<Props> = ({}) => {
  const [consolidatedEntry, setConsolidatedEntry] = useState<string>("");

  /**
   * The way this is called, it runs in the context of the current tab as a content script, which means it has limited
   * access to the parent extension's global scope, and can't access variables and functions defined
   * in the parent script.
   */
  function scrapeTimesheetEntries(): string[] {
    const timesheetEntries = Array.from(
      document.querySelectorAll(".entry-details .notes p"),
    ).map(el => el?.textContent);

    // can't use spread because runs in a context where the tslib helper functions are not available
    return timesheetEntries;
  }

  const onClickScrape = async (): Promise<void> => {
    console.log(`*** scrapeArticle `);

    const tabs: Tabs.Tab[] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    // Pulls current tab from browser.tabs.query response
    const currentTab: Tabs.Tab | undefined = tabs[0];

    // Short circuits function execution is current tab isn't found
    if (!currentTab) {
      return;
    }

    // browser.runtime.sendMessage({ popupMounted: true });
    // Executes the script in the current tab
    const [entries]: string[][] = await browser.tabs.executeScript(
      currentTab.id,
      {
        /*
          `scrape` runs in the context of the current tab as a content script, which means it has limited access
          to the parent extension's global scope, and can't access variables and functions defined in the parent script.
         */
        code: "(" + scrapeTimesheetEntries + ")();",
      },
    );

    setConsolidatedEntry(entries.join(", "));
  };

  const onClickCopyToClipboard = async (): Promise<void> => {
    await navigator.clipboard.writeText(consolidatedEntry);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <button
          className="btn btn-block btn-outline-dark"
          onClick={onClickScrape}
        >
          Scrape
        </button>
        <button
          className="btn btn-block btn-outline-dark"
          onClick={onClickCopyToClipboard}
        >
          Copy
        </button>

        <textarea
          name="result"
          id="result"
          className="form-control"
          cols={30}
          rows={10}
          value={consolidatedEntry}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};
