import { useState, useEffect } from 'react';
import { 
  Home, 
  Camera, 
  ShieldCheck, 
  DollarSign, 
  Sparkles, 
  FolderLock, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Activity, 
  Calculator, 
  ChevronRight, 
  Zap 
} from 'lucide-react';
import AdminPortalModal from './components/AdminPortalModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [sqFt, setSqFt] = useState<number>(3200);
  const [pitch, setPitch] = useState<number>(1.12); // multiplier for 6/12 pitch
  const [pitchLabel, setPitchLabel] = useState<string>('6/12 Moderate');
  const [material, setMaterial] = useState<'shingle' | 'metal' | 'slate'>('shingle');
  const [scanBooked, setScanBooked] = useState(false);

  useEffect(() => {
    if ((window.location.pathname.includes('admin') || window.location.hash.includes('admin')) || window.location.pathname.startsWith('/admin')) {
      setIsAdminOpen(true);
    }
  }, []);

  // Real-time takeoff calculation
  const squares = Math.round((sqFt * pitch * 1.12) / 100); // 12% waste factor
  const materialCostPerSquare = material === 'shingle' ? 385 : material === 'metal' ? 620 : 1150;
  const totalEstimate = squares * materialCostPerSquare;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-400">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                APEX ROOFING <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">DRONE TAKEOFF OS</span>
              </span>
              <p className="text-xs font-semibold text-zinc-400 font-mono">Pitch Multipliers, Aerial Photogrammetry &amp; Claims</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#calculator"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Calculator className="w-3.5 h-3.5" />
              Launch Instant Takeoff
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800 text-amber-400 font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              XACTIMATE ACCREDITED &bull; FLIR THERMAL CERTIFIED
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bespoke Roofing Takeoffs &amp; Autonomous Aerial Scans.
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              Eliminate ladder fall risk and manual estimate inaccuracies. Our high-precision drone photogrammetry calculates square footage, slope pitch vectors, and valley flashings in minutes, delivering insurance-ready claims and instant homeowner contract proposals.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-850">
              <div>
                <p className="text-2xl font-bold font-mono text-white">99.4%</p>
                <p className="text-xs text-zinc-300 font-mono">Takeoff Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-amber-400">4 Hours</p>
                <p className="text-xs text-zinc-300 font-mono">Drone Report Turnaround</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">$35k+</p>
                <p className="text-xs text-zinc-300 font-mono">Average Contract Ticket</p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Engine */}
          <div id="calculator" className="lg:col-span-6 bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider font-mono uppercase text-amber-400 font-bold tracking-wider">MATHEMATICAL TAKEOFF SIMULATOR</span>
              <h3 className="text-xl font-bold text-white">Interactive Roof Calculator</h3>
              <p className="text-base text-zinc-200 leading-relaxed">Adjust square footage and slope pitch to see instant material breakdowns.</p>
            </div>

            <div className="space-y-5">
              {/* Sq Ft Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">Home Footprint Area:</span>
                  <span className="text-white font-bold">{sqFt.toLocaleString()} sq ft</span>
                </div>
                <input 
                  type="range" 
                  min="1200" 
                  max="8000" 
                  step="100"
                  value={sqFt}
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Pitch Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold font-mono text-zinc-400 block">Roof Slope &amp; Pitch Multiplier</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setPitch(1.05); setPitchLabel('4/12 Low Slope'); }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      pitch === 1.05 ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    4/12 Low (1.05x)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPitch(1.12); setPitchLabel('6/12 Moderate'); }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      pitch === 1.12 ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    6/12 Mod (1.12x)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPitch(1.25); setPitchLabel('10/12 Steep'); }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      pitch === 1.25 ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    10/12 Steep (1.25x)
                  </button>
                </div>
              </div>

              {/* Material Package */}
              <div className="space-y-2">
                <label className="text-sm font-semibold font-mono text-zinc-400 block">Architectural Material Spec</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMaterial('shingle')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      material === 'shingle' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    GAF Shingles
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaterial('metal')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      material === 'metal' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Standing Seam
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaterial('slate')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      material === 'slate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Natural Slate
                  </button>
                </div>
              </div>

              {/* Calculation Output Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-400">Total Calculated Squares:</span>
                  <span className="text-sm font-mono font-bold text-white">{squares} Roofing Squares</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-800 pt-2">
                  <span className="text-xs font-mono text-zinc-400">Estimated Total Proposal:</span>
                  <span className="text-2xl font-mono font-extrabold text-amber-400">${totalEstimate.toLocaleString()}</span>
                </div>
              </div>

              {!scanBooked ? (
                <button
                  type="button"
                  onClick={() => setScanBooked(true)}
                  className="w-full py-3 rounded-xl bg-amber-500 text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Request 4K Drone Photogrammetry Scan
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-white">Aerial Scan Queued</p>
                  <p className="text-xs font-semibold text-zinc-400 font-mono">Our FAA Part 107 pilot will fly your roof within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Why Holding Companies Buy This */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">FAA Part 107 Drone Workflow</h4>
            <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
              Automated high-res orthomosaic imagery captures every ridge, hip, valley, and penetration for zero-error estimating.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Insurance Supplement Engine</h4>
            <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
              Generates line-item export reports compliant with State Farm, Allstate, and Travelers insurance adjusters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Supabase PostgreSQL Wiring</h4>
            <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
              Complete database tables with Row Level Security for square footage calculations, drone flight logs, and customer contracts.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#09090b] py-8 text-center text-xs text-zinc-300 font-mono">
        <p>© 2026 APEX ROOFING ESTIMATOR OS &bull; Turnkey Digital Operating System &bull; Ghost Factory™ Flagship #57</p>
      </footer>

      {/* Floating VIP Admin Portal Pass Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-zinc-950 text-white border border-amber-500/40 hover:border-amber-400 px-4 py-3 rounded-xl shadow-2xl transition-all duration-200 flex items-center gap-2 cursor-pointer font-mono text-xs font-bold uppercase tracking-wider group hover:text-amber-400"
        id="roofing-admin-pass-btn"
      >
        <FolderLock className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
        [ ROOFING AUDIT PASS ]
      </button>

      {/* Admin Portal Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

    </div>
  );
}
