export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(88,28,135,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_24%),linear-gradient(180deg,#06070d_0%,#05070d_100%)] px-6">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative w-full max-w-xl rounded-[28px] border border-amber-300/18 bg-[linear-gradient(180deg,rgba(18,18,24,0.96),rgba(12,12,18,0.98))] p-8 text-center shadow-[0_0_0_1px_rgba(255,211,143,0.03),inset_0_1px_0_rgba(255,255,255,0.02)]">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-200/95">
            Mythos
          </div>

          <h1 className="mt-4 font-serif text-[42px] leading-[0.95] text-stone-100">
            Retrieving The Session
          </h1>

          <p className="mt-4 text-[17px] leading-7 text-stone-300/84">
            Gathering the latest campaign state, recent messages, and world details from the
            archive.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-violet-300/90" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-amber-300/90 [animation-delay:150ms]" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-stone-300/80 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
