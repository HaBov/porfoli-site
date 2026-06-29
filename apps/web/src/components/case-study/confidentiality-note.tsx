import { LockKeyhole } from "lucide-react";

type ConfidentialityNoteProps = {
  children: React.ReactNode;
};

export function ConfidentialityNote({ children }: ConfidentialityNoteProps) {
  return (
    <aside className="border-line bg-elevated rounded-2xl border p-5 sm:p-7">
      <div className="flex gap-4">
        <div className="bg-surface text-accent flex size-10 shrink-0 items-center justify-center rounded-xl">
          <LockKeyhole aria-hidden="true" className="size-5" />
        </div>

        <div>
          <h3 className="text-primary text-base font-semibold">Confidentiality boundary</h3>

          <div className="text-secondary mt-2 text-sm leading-7">{children}</div>
        </div>
      </div>
    </aside>
  );
}
