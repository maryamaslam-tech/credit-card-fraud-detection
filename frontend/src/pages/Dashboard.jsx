// pages/Dashboard.jsx
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, SlidersHorizontal } from "lucide-react";
import { Navbar, Footer } from "../Components";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-emerald-950">
      <Navbar />
      <section
        className="flex md:min-h-[calc(100vh-64px)]
        items-center justify-center bg-linear-to-tl from-emerald-900 via-slate-900 to-emerald-950 rounded-b-3xl border-b-2 border-emerald-800 px-4 py-10 sm:px-8 sm:py-16"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 text-left">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-emerald-400 sm:px-4 sm:py-2 sm:text-sm">
            TRANSACTION SECURITY
          </span>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Smarter Transaction Monitoring
          </h1>

          <p className="max-w-3xl text-xl font-semibold leading-relaxed text-emerald-200 sm:text-2xl md:text-3xl">
            Detect suspicious activity before it becomes a threat.
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Analyze transaction details and identify potentially fraudulent
            activity using our intelligent detection system.
          </p>

          <Link
            to="/detect"
            className="mt-3 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-500 active:scale-95"
          >
            Start Detection
            <ArrowRight className="h-5 w-5" />
          </Link>

          <div className="mt-6 flex items-center gap-2 text-sm text-emerald-300">
            <ShieldCheck className="h-5 w-5" />
            Secure Transaction Analysis
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Section Heading */}
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-emerald-400 sm:px-4 sm:py-2 sm:text-sm">
              OUR FEATURES
            </span>

            <h2 className="text-2xl font-bold text-white sm:text-4xl md:text-5xl">
              Built for Safer Transactions
            </h2>

            <p className="max-w-2xl text-center text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
              Smart tools to help identify suspicious transaction activity.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl border border-emerald-800 bg-slate-900/70 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 shrink-0 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">
                  Secure Analysis
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Evaluate transaction details and identify potentially fraudulent
                activity with intelligent analysis.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-emerald-800 bg-slate-900/70 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-7 w-7 shrink-0 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">
                  Fast Detection
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Analyze transaction information quickly and get prediction
                results without unnecessary delays.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-emerald-800 bg-slate-900/70 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-7 w-7 shrink-0 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">
                  Flexible Threshold
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Adjust the detection threshold to control how sensitive the
                fraud detection system should be.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Dashboard;
