import { DollarSign, BarChart3, Lock, Smartphone, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BankingDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-semibold">Banking</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-6">Banking Dashboard</h1>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive banking dashboard with real-time analytics, transaction monitoring, and financial insights.
            </p>
            <div className="space-y-4">
              {['Real-time Analytics', 'Transaction Monitoring', 'Multi-currency Support', 'Advanced Security'].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="/Images/bank.jpg" alt="E-Commerce" className="rounded-2xl shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Analytics</h3>
            <p className="text-gray-300">Real-time financial insights and reports</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Lock className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Bank-level Security</h3>
            <p className="text-gray-300">256-bit encryption and 2FA</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Smartphone className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Mobile First</h3>
            <p className="text-gray-300">Optimized for all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingDashboard;
