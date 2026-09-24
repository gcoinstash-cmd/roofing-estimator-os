import { useState, useEffect } from 'react';
import { X, ShieldCheck, Sparkles, Home, Camera, DollarSign, Award, Clock, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'roofing2026';

const mockEstimates = [
  { id: 'EST-901', client: 'Harrison Estate & Stables', squares: '64 Squares', pitch: '8/12 Steep', material: 'Standing Seam Metal', status: 'contract_signed', value: '$38,400' },
  { id: 'EST-902', client: 'Malibu Modern Cliffside Villa', squares: '42 Squares', pitch: '4/12 Low Slope', material: 'Architectural GAF Timberline', status: 'in_review', value: '$22,600' },
  { id: 'EST-903', client: 'Crestview Office Commercial Hub', squares: '180 Squares', pitch: 'Flat / TPO Membrane', material: '60-mil White TPO Reflective', status: 'due_diligence', value: '$94,000' },
  { id: 'EST-904', client: 'Brentwood Manor Residential', squares: '52 Squares', pitch: '10/12 High Pitch', material: 'Vermont Natural Slate', status: 'scheduled', value: '$56,800' },
];

const mockDroneScans = [
  { id: 'DRN-301', address: 'Harrison Estate', damage: 'Hail impact on windward slope (38 divots)', status: 'Report Generated', camera: '4K Thermal & Photogrammetry' },
  { id: 'DRN-302', address: 'Brentwood Manor', damage: 'Underlayment moisture ingress near valley flashing', status: 'Verified', camera: 'FLIR Thermal Sensor' },
];

const metrics = [
  { label: 'Active Pipeline GMV', value: '$211,800', icon: DollarSign, color: 'text-amber-400' },
  { label: 'Avg Ticket Value', value: '$35,200', icon: Home, color: 'text-emerald-400' },
  { label: 'Insurance Win Rate', value: '96.8%', icon: Award, color: 'text-blue-400' },
  { label: 'Drone Turnaround', value: '4 Hours', icon: Clock, color: 'text-yellow-400' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'estimates' | 'drone' | 'supabase'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Click the auto-fill button below.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0c0c0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-sm font-bold">
              ROOF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">ROOFING ESTIMATOR OS</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">v1.0.0 VIP</span>
              </div>
              <p className="text-xs text-zinc-400">Drone Measurement Engine, Pitch Multipliers &amp; Insurance Claims</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!authenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-xl text-white">Estimator Portal Authentication</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Enter your administrative key to view aerial photogrammetry scans, takeoff sheets, and insurance supplements.
              </p>
            </div>

            <div className="w-full space-y-3">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                placeholder="Enter passkey (e.g. roofing2026)"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-center text-sm focus:outline-none focus:border-amber-400 placeholder-zinc-600"
              />
              {authError && <p className="text-xs text-rose-400 font-mono">{authError}</p>}
              <button
                onClick={handleAuth}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all cursor-pointer"
              >
                Authenticate Estimator Gate
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasskey(PASSKEY);
                  setAuthenticated(true);
                  setAuthError('');
                }}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                [ AUTO-FILL DEMO PASS: roofing2026 ]
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-zinc-800 bg-[#0c0c0e]/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Takeoff Telemetry
              </button>
              <button
                onClick={() => setActiveTab('estimates')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'estimates'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Takeoff Bids (4)
              </button>
              <button
                onClick={() => setActiveTab('drone')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'drone'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Drone Scans (2)
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'bg-zinc-800/80 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Supabase Engine
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{m.label}</span>
                          <m.icon className={`w-4 h-4 ${m.color}`} />
                        </div>
                        <p className="text-xl font-bold font-mono text-white">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Operational Status Card */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-zinc-900 to-zinc-900 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider">TAKEOFF ENGINE CALIBRATED</span>
                      </div>
                      <p className="text-xs text-zinc-300">Waste factor set at 12.5%. Roof pitch multiplier automatically synchronized with slope sensor data.</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-xs text-zinc-300">
                      Margin Floor: 38.5%
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'estimates' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Active Bids &amp; Takeoffs</h4>
                    <span className="text-xs text-amber-400 font-mono">4 Total Pipeline</span>
                  </div>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Project / Property</th>
                          <th className="p-3">Specs (Pitch)</th>
                          <th className="p-3">Material Package</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Contract Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 font-mono text-zinc-300">
                        {mockEstimates.map((e) => (
                          <tr key={e.id} className="hover:bg-zinc-900/40">
                            <td className="p-3 text-amber-400 font-bold">{e.id}</td>
                            <td className="p-3 font-semibold text-white">{e.client}</td>
                            <td className="p-3 text-zinc-400">{e.squares} ({e.pitch})</td>
                            <td className="p-3">{e.material}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                                e.status === 'contract_signed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                e.status === 'scheduled' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                                'bg-zinc-800 text-zinc-400'
                              }`}>
                                {e.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-bold text-white">{e.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'drone' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Drone Photogrammetry Scans</h4>
                    <span className="text-xs text-amber-400 font-mono">2 Completed Scans</span>
                  </div>
                  <div className="space-y-3">
                    {mockDroneScans.map((d) => (
                      <div key={d.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-semibold text-sm text-white">{d.address} &bull; <span className="text-amber-400 font-mono text-xs">{d.id}</span></p>
                          <p className="text-xs text-zinc-400">{d.damage}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-zinc-400">{d.camera}</span>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] font-mono uppercase">
                            {d.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'supabase' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">PostgreSQL Schema &amp; Claims Ledgers</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Production PostgreSQL database wired with Row Level Security (RLS) policies for square footage takeoffs, pitch calculations, and insurance claim line items.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-[10px] font-mono text-zinc-500">TABLE 1</p>
                        <p className="text-xs font-mono font-bold text-white">roofing_estimates</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-[10px] font-mono text-zinc-500">TABLE 2</p>
                        <p className="text-xs font-mono font-bold text-white">drone_inspections</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-[10px] font-mono text-zinc-500">TABLE 3</p>
                        <p className="text-xs font-mono font-bold text-white">insurance_claims</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
