import {
  ArrowDownToLine,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  FolderKanban,
  Languages,
} from "lucide-react";
import Link from "next/link";

import type { ResumeDocument } from "@/content";
import { buttonStyles } from "@/components/ui/button";

type ResumeCardProps = {
  resume: ResumeDocument;
};

function formatUpdatedDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <section
      aria-labelledby="resume-download-heading"
      className="border-line bg-surface rounded-2xl border p-6 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-accent-muted text-accent inline-flex size-11 shrink-0 items-center justify-center rounded-xl">
              <FileText aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
                Current document
              </p>

              <h2
                id="resume-download-heading"
                className="text-foreground mt-1 text-2xl font-semibold tracking-[-0.03em]"
              >
                {resume.title}
              </h2>
            </div>
          </div>

          <p className="text-secondary mt-6 max-w-2xl text-base leading-8">{resume.description}</p>

          <dl className="border-line mt-7 grid gap-5 border-t pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-muted text-xs">Filename</dt>

              <dd className="text-foreground mt-1 font-mono text-sm break-words">
                {resume.filename}
              </dd>
            </div>

            <div>
              <dt className="text-muted text-xs">Format</dt>

              <dd className="text-foreground mt-1 flex items-center gap-2 text-sm font-medium">
                <FileText aria-hidden="true" className="text-accent size-4" />
                PDF
              </dd>
            </div>

            <div>
              <dt className="text-muted text-xs">Language</dt>

              <dd className="text-foreground mt-1 flex items-center gap-2 text-sm font-medium">
                <Languages aria-hidden="true" className="text-accent size-4" />

                {resume.language === "en" ? "English" : "Russian"}
              </dd>
            </div>

            <div>
              <dt className="text-muted text-xs">Last updated</dt>

              <dd className="text-foreground mt-1 flex items-center gap-2 text-sm font-medium">
                <CalendarDays aria-hidden="true" className="text-accent size-4" />

                {formatUpdatedDate(resume.updatedAt)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-3">
          <a
            href={resume.publicPath}
            download={resume.filename}
            className={buttonStyles({
              variant: "primary",
              size: "lg",
              className: "w-full",
            })}
          >
            <ArrowDownToLine aria-hidden="true" className="size-5" />
            Download PDF
          </a>

          <Link
            href="/experience"
            className={buttonStyles({
              variant: "secondary",
              size: "md",
              className: "w-full",
            })}
          >
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
            View Experience
          </Link>

          <Link
            href="/projects"
            className={buttonStyles({
              variant: "outline",
              size: "md",
              className: "w-full",
            })}
          >
            <FolderKanban aria-hidden="true" className="size-4" />
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
