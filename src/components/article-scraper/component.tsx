import React, { FunctionComponent } from "react";
import "./styles.scss";
import { browser, Tabs } from "webextension-polyfill-ts";

// // // //

// Scripts to execute in current tab
const scrollToTopScript = `window.scroll(0,0)`;
const scrollToBottomScript = `window.scroll(0,9999999)`;

/**
 * Executes a string of Javascript on the current tab
 * @param code The string of code to execute on the current tab
 */
function scrapeArticle(): void {
  // Query for the active tab in the current window
  const code = `alert("you made it!")`;

  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs: Tabs.Tab[]) => {
      // Pulls current tab from browser.tabs.query response
      const currentTab: Tabs.Tab | undefined = tabs[0];

      // Short circuits function execution is current tab isn't found
      if (!currentTab) {
        return;
      }

      // Executes the script in the current tab
      browser.tabs
        .executeScript(currentTab.id, {
          code,
        })
        .then(() => {
          console.log("Done Scrolling");
        });
    });
}

// // // //

export const ArticleScraper: FunctionComponent = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <button
          className="btn btn-block btn-outline-dark"
          onClick={(): void => scrapeArticle()}
        >
          Scrape Medium.com Article
        </button>
      </div>
    </div>
  );
};
