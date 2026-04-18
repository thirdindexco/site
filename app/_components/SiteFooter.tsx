export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-[1440px] pl-5 md:pl-[calc(8.33%+18px)] pr-5 pb-3 pt-6 font-mono font-light text-[7px] uppercase tracking-[-0.01em] text-black/50">
        © {year} third index llc
      </div>
    </footer>
  );
}
