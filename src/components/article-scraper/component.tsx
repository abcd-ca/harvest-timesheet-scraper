import React, { FunctionComponent } from "react";
import "./styles.scss";
import { browser, Tabs } from "webextension-polyfill-ts";

// // // //

interface ArticleScraperState {
  article: string;
}

export class ArticleScraper extends React.Component<{}, ArticleScraperState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { article: "..." };
  }

  scrapeArticle(): void {
    function getMediumArticle(): string {
      const title = document.querySelector(
        "#root > div > article > div > section > div > div > div > div > h1",
      )?.textContent;

      const subtitle = document.querySelector(
        "#root > div > article > div > section > div > div > div > h2",
      )?.textContent;

      const bodyNodes = []

      const sections = document.querySelectorAll("#root > div > article > div > section > div > div")

      for (const section of sections as any) {
        bodyNodes.push(...(section?.children || []))
      }

      const author = document.querySelector(
        "#root > div > article > div > section > div > div > div > div > div > div > div > div > span > div > span > a",
      )?.textContent;

      let content = `${title}\n\n`;
      content += `${subtitle}\n\n`;
      content += `By : ${author}\n\n`;

      for (let i = 0; i < bodyNodes.length; i++) {
        const node = bodyNodes[i]

        // Ignore divs
        if (["H1", "H2", "H3", "P", "BLOCKQUOTE", "UL", "PRE"].indexOf(node.tagName) != -1) {
          // console.log(node.textContent)
          content += `${node.textContent}\n\n`
        }
      }

      // console.log([title, subtitle, author, content])

      content = content.replace(/[“”]/g, '"')
                       .replace(/[‘’]/g, "'")
                       .replace(/\—/g, "-")
                       .replace(/[^\x00-\x7F]/g, "");

      return content
    }

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs: Tabs.Tab[]) => {
        // Pulls current tab from browser.tabs.query response
        const currentTab: Tabs.Tab | undefined = tabs[0];

        // Short circuits function execution is current tab isn't found
        if (!currentTab) {
          return;
        }

        // browser.runtime.sendMessage({ popupMounted: true });
        // Executes the script in the current tab
        browser.tabs
          .executeScript(currentTab.id, {
            code: "(" + getMediumArticle + ")();",
          })
          .then(article => {
            this.setState({ article: `${article}` })
          });
      });
  }

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-lg-12">
          <button
            className="btn btn-block btn-outline-dark"
            onClick={(): void => this.scrapeArticle()}
          >
            Scrape Medium.com Article
          </button>

          <textarea
            name="result"
            id="result"
            className="form-control"
            cols={30}
            rows={10}
            value={this.state.article}
            readOnly
          ></textarea>

          {/* <button className="btn btn-block btn-outline-dark">Copy</button> */}
        </div>
      </div>
    );
  }
}
