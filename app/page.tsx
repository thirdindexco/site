export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-between px-6 py-16 text-[15px] leading-relaxed">
      <header>
        <h1 className="font-medium">third index</h1>
      </header>

      <section className="space-y-6">
        <p>a small software studio. design and engineering for product interfaces.</p>
        <p className="text-neutral-600">
          we work on the parts of products everyone else skips. empty states. error cases. the
          moments between the moments. the off-by-one positions where good products become great
          ones.
        </p>
      </section>

      <footer className="space-y-2 text-neutral-600">
        <p>currently taking on new work.</p>
        <p>
          <a className="text-neutral-900 underline underline-offset-4" href="mailto:hello@thirdindex.co">
            hello@thirdindex.co
          </a>
        </p>
      </footer>
    </main>
  );
}
