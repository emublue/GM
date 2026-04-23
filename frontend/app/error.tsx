"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(88,28,135,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_24%),linear-gradient(180deg,#06070d_0%,#05070d_100%)] px-6">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative w-full max-w-2xl rounded-[28px] border border-amber-300/18 bg-[linear-gradient(180deg,rgba(18,18,24,0.96),rgba(12,12,18,0.98))] p-8 shadow-[0_0_0_1px_rgba(255,211,143,0.03),inset_0_1px_0_rgba(255,255,255,0.02)]">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-200/95">
            System Disruption
          </div>

          <h1 className="mt-4 font-serif text-[44px] leading-[0.95] text-stone-100">
            The Chronicle Could Not Be Loaded
          </h1>

          <p className="mt-4 max-w-xl text-[17px] leading-7 text-stone-300/84">
            The session data did not arrive in a usable state. This is usually a temporary
            backend or database connection problem, and a retry often clears it.
          </p>

          <div className="mt-6 rounded-[22px] border border-white/8 bg-white/[0.025] p-4">
            <div className="text-[12px] uppercase tracking-[0.16em] text-stone-400/80">
              Error Details
            </div>
            <p className="mt-3 break-words text-[15px] leading-6 text-stone-200/90">
              {error.message || "Unknown application error."}
            </p>
            {error.digest ? (
              <p className="mt-3 text-[13px] text-stone-500">Reference: {error.digest}</p>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="rounded-2xl border border-violet-400/40 bg-violet-500/12 px-5 py-3 text-[15px] font-medium text-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.18)] transition hover:bg-violet-500/18"
            >
              Retry Connection
            </button>
            <a
              href="/"
              className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-3 text-[15px] font-medium text-stone-200/90 transition hover:bg-white/[0.04]"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
