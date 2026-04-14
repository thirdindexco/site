import Image from "next/image";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-between px-6 py-16 text-[15px] leading-relaxed">
      <header>
        <Image
          src="/logo.svg"
          alt="third index"
          width={375}
          height={71}
          priority
          className="h-8 w-auto"
        />
      </header>

      <section className="space-y-6">
        <p>a small software studio. design and engineering for product interfaces.</p>
        <p className="text-ink/60">
          we focus on the parts most teams skip — empty states, edge cases, the in-between
          moments. the details where good products become great.
        </p>
      </section>

      <footer className="space-y-2 text-ink/60">
        <p>currently taking on new work.</p>
        <p>
          <a
            className="link-underline pb-[2px] text-ink"
            href="mailto:hello@thirdindex.co"
          >
            hello@thirdindex.co
          </a>
        </p>
      </footer>
    </main>
  );
}
