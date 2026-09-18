import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { toText } from "hast-util-to-text";
import katex from "katex";
import { SKIP, visitParents } from "unist-util-visit-parents";

const emptyOptions = {};
const emptyClasses = [];

function classList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean);
  return emptyClasses;
}

export default function rehypeKatex(options) {
  const settings = options || emptyOptions;

  return function (tree, file) {
    visitParents(tree, "element", function (element, parents) {
      const classes = classList(element.properties.className);
      const languageMath = classes.includes("language-math");
      const mathDisplay = classes.includes("math-display");
      const mathInline = classes.includes("math-inline");
      let displayMode = mathDisplay;

      if (!languageMath && !mathDisplay && !mathInline) return;

      let parent = parents[parents.length - 1];
      let scope = element;

      if (element.tagName === "code" && languageMath && parent?.type === "element" && parent.tagName === "pre") {
        scope = parent;
        parent = parents[parents.length - 2];
        displayMode = true;
      }

      if (!parent) return;

      const value = toText(scope, { whitespace: "pre" });
      let result;

      try {
        result = katex.renderToString(value, { ...settings, displayMode, throwOnError: true });
      } catch (error) {
        const cause = error instanceof Error ? error : new Error(String(error));
        file.message("Could not render math with KaTeX", {
          ancestors: [...parents, element],
          cause,
          place: element.position,
          ruleId: cause.name.toLowerCase(),
          source: "rehype-katex",
        });
        try {
          result = katex.renderToString(value, { ...settings, displayMode, strict: "ignore", throwOnError: false });
        } catch {
          result = [
            {
              type: "element",
              tagName: "span",
              properties: {
                className: ["katex-error"],
                style: "color:" + (settings.errorColor || "#cc0000"),
                title: String(error),
              },
              children: [{ type: "text", value }],
            },
          ];
        }
      }

      if (typeof result === "string") {
        result = fromHtmlIsomorphic(result, { fragment: true }).children;
      }

      const index = parent.children.indexOf(scope);
      parent.children.splice(index, 1, ...result);
      return SKIP;
    });
  };
}
