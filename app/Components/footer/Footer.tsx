import type { FooterProps } from "../../src/types/footer.type";

function Footer({ email, name, dateFlowId, age }: FooterProps) {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-tight text-white">
              {name}
            </p>

            <p className="mt-1 truncate text-sm text-slate-400">{email}</p>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Flow ID
              </dt>

              <dd className="mt-1 font-medium text-slate-200">{dateFlowId}</dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Age
              </dt>

              <dd className="mt-1 font-medium text-slate-200">{age}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-5">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
