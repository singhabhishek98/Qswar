import { Heart, Calendar, FileText, Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthcareApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">Healthcare</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-6">Healthcare App</h1>
            <p className="text-xl text-gray-300 mb-8">
              Mobile application for booking appointments, managing patient records, and telemedicine consultations.
            </p>
            <div className="space-y-4">
              {['Appointment Booking', 'Patient Records', 'Video Consultations', 'Prescription Management'].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="/Images/health.jpg" alt="E-Commerce" className="rounded-2xl shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Calendar className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Easy Scheduling</h3>
            <p className="text-gray-300">Book appointments in seconds</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <FileText className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Digital Records</h3>
            <p className="text-gray-300">Secure patient data management</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <Users className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Telemedicine</h3>
            <p className="text-gray-300">Connect with doctors remotely</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareApp;
