import { ShoppingCart, Zap, Shield, TrendingUp, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ECommercePlatform = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <ShoppingCart className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">E-Commerce</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-6">E-Commerce Platform</h1>
            <p className="text-xl text-gray-300 mb-8">
              A full-featured online shopping platform with payment integration, inventory management, and real-time analytics.
            </p>
            <div className="space-y-4">
              {['Payment Gateway Integration', 'Real-time Inventory', 'Admin Dashboard', 'Mobile Responsive'].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="/Images/E_com.jpg" alt="E-Commerce" className="rounded-2xl shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Zap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Fast Performance</h3>
            <p className="text-gray-300">Lightning-fast load times with optimized code</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Shield className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Secure Payments</h3>
            <p className="text-gray-300">PCI-DSS compliant payment processing</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Scalable</h3>
            <p className="text-gray-300">Built to handle millions of transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECommercePlatform;
