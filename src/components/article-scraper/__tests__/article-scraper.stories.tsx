import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ArticleScraper } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("ArticleScraper", module).add("renders", () => {
  return (
    <Story>
      <ArticleScraper />
    </Story>
  );
});
