import * as React from "react";
import { ArticleScraper } from "../component";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

it("component renders", () => {
    const tree: ReactTestRendererJSON | null = renderer
        .create(<ArticleScraper />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
