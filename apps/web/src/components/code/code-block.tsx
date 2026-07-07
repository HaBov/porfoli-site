import { codeToHtml } from "shiki";

import { CopyCodeButton } from "@/components/code/copy-code-button";
import { CODE_LANGUAGE_LABELS, type CodeLanguage } from "@/content";
import { cn } from "@/lib/cn";

type CodeBlockProps = {
  code: string;
  filename: string;
  language: CodeLanguage;
  caption?: string;
  highlightLines?: number[];
  lineNumbers?: boolean;
};

function addHighlightedLines(html: string, highlightLines: number[]): string {
  if (highlightLines.length === 0) {
    return html;
  }

  const highlightedLines = new Set(highlightLines);

  let currentLine = 0;

  return html.replace(/<span class="line">/g, (match) => {
    currentLine += 1;

    if (highlightedLines.has(currentLine)) {
      return '<span class="line highlighted">';
    }

    return match;
  });
}

export async function CodeBlock({
  code,
  filename,
  language,
  caption,
  highlightLines = [],
  lineNumbers = true,
}: CodeBlockProps) {
  const normalizedCode = code.replace(/^\n+|\n+$/g, "");

  const renderedCode = await codeToHtml(normalizedCode, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  const highlightedHtml = addHighlightedLines(renderedCode, highlightLines);

  return (
    <figure className="border-line bg-surface my-6 overflow-hidden rounded-2xl border">
      <div className="border-line bg-elevated flex min-h-12 items-center justify-between gap-4 border-b px-3 sm:px-4">
        <div className="min-w-0">
          <p className="text-foreground truncate font-mono text-xs sm:text-sm">{filename}</p>

          <p className="text-muted mt-0.5 text-[11px]">{CODE_LANGUAGE_LABELS[language]}</p>
        </div>

        <CopyCodeButton code={normalizedCode} />
      </div>

      <div
        className={cn("code-block-content overflow-x-auto", lineNumbers && "with-line-numbers")}
        dangerouslySetInnerHTML={{
          __html: highlightedHtml,
        }}
      />

      {caption ? (
        <figcaption className="border-line text-muted border-t px-4 py-3 text-xs leading-5">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
