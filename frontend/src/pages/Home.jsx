import { useState, useEffect } from 'react';
import api from '../utils/api';

function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referrerNumber, setReferrerNumber] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 23,
    minutes: 32,
    seconds: 38
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReferrals: 0,
    recentPhones: []
  });

  // Hide navbar on home page
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) navbar.style.display = 'none';
    return () => {
      if (navbar) navbar.style.display = 'flex';
    };
  }, []);

  // Fetch stats from API
  const fetchStats = async () => {
    try {
      const response = await api.get('/api/giveaway/stats');
      setStats({
        totalUsers: response.data.totalUsers || 0,
        totalReferrals: response.data.totalReferrals || 0,
        recentPhones: response.data.recentPhones || []
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  // Fetch stats on mount and refresh every 30 seconds
  useEffect(() => {
    fetchStats();
    const statsInterval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(statsInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    if (!phoneNumber) {
      setMessage('❌ Please enter your phone number');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/giveaway/quick-entry', {
        phoneNumber,
        referrerPhone: referrerNumber || null
      });

      // Handle response
      if (response.data.alreadyRegistered === true) {
        // Existing user - already claimed their 1GB
        setReferralCount(response.data.referralCount || 0);
        setShowSuccess(true);
        setMessage('✅ You\'re already registered! You claimed your 1GB already.');
      } else if (response.data.success === true && response.data.isNewUser === true) {
        // Brand new user - gets 1GB for free!
        setReferralCount(response.data.referralCount || 0);
        setShowSuccess(true);
        setMessage('🎉 Congratulations! You just got 1GB FREE DATA! Share with friends to get 4GB more!');
        // Refresh stats after successful registration
        fetchStats();
      } else {
        // Other success case
        setReferralCount(response.data.referralCount || 0);
        setShowSuccess(true);
        setMessage(response.data.message || '✅ Successfully registered!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ ' + (error.response?.data?.error || 'Connection error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    let time = '';
    if (days > 0) time += `${days}d `;
    time += `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return time;
  };

  const progressPercentage = Math.min((referralCount / 5) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-2">
      {/* Trust Bar */}
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md mb-2 p-2 sticky top-2 z-50">
        <div className="flex items-center justify-center gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-green-500">✓</span>
            <span className="font-semibold text-gray-800">Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full font-bold text-xs">🔴 LIVE</span>
            <span className="font-semibold text-gray-800">5 Active</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🕐</span>
            <span className="font-semibold text-gray-800">0 Today</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 text-center mb-2">
          
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold mb-3 border border-blue-200">
            <span>✓</span>
            <span>Official Campaign</span>
          </div>

          {/* Gift Icon */}
          <div className="text-5xl mb-3">🎁</div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            1GB Free Data Giveaway!
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Join thousands participating in this exclusive giveaway. Refer friends to increase your winning chances!
          </p>

          {/* Bonus Alert */}
          <div className="bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-xl p-3 mb-4 shadow-md">
            <div className="text-base font-bold mb-2 flex items-center justify-center gap-2">
              <span>🎉</span>
              <span>BONUS REWARD!</span>
              <span>🎉</span>
            </div>
            <p className="text-sm leading-snug">
              Refer 5 friends and get <strong>4GB FREE DATA</strong> instantly! 🚀
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalUsers}</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wide">Participants</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalReferrals}</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wide">Referrals</div>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl p-3 mb-4 shadow-md">
            <div className="text-xs mb-2 font-semibold opacity-95">⏰ Giveaway Ends In:</div>
            <div className="text-2xl font-bold tracking-wider font-mono">
              {formatTime()}
            </div>
          </div>

          {/* Recent Join */}
          {stats.recentPhones.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-3 text-yellow-800 font-semibold text-xs">
                <span>🔥</span>
                <span>Recent Join</span>
              </div>
              <div className="space-y-2 text-xs text-yellow-700 border-t border-dashed border-yellow-300 pt-2">
                {stats.recentPhones.slice(0, 3).map((phone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>📱</span>
                    <span>{phone} just joined!</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          {!showSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-left">
                <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                  Your Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-400">📱</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g., 0241234567"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-purple-500 focus:ring-3 focus:ring-purple-200 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-3 text-left">
                <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                  Referrer's Phone
                  <span className="text-gray-500 font-normal text-xs ml-1">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-400">👥</span>
                  <input
                    type="tel"
                    value={referrerNumber}
                    onChange={(e) => setReferrerNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Who referred you?"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-purple-500 focus:ring-3 focus:ring-purple-200 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl py-4 px-5 text-base font-semibold shadow-lg hover:shadow-xl active:scale-98 transition-all disabled:opacity-60 disabled:cursor-not-allowed min-h-[50px]"
              >
                {loading ? '⏳ Processing...' : '🎉 Join Giveaway Now'}
              </button>
            </form>
          ) : (
            <div>
              <div className="bg-blue-50 text-blue-700 rounded-xl p-3 mb-3 font-semibold text-sm">
                📱 Your Number: {phoneNumber}
              </div>
              
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <h3 className="font-bold text-yellow-800 mb-3 text-sm">📊 Your Referral Progress</h3>
                <p className="text-xs text-yellow-700 mb-3">
                  <strong>{referralCount}</strong> out of 5 referrals to unlock <strong>4GB FREE DATA</strong>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden mb-3 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xs flex items-center justify-center transition-all duration-800"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    {referralCount}/5
                  </div>
                </div>
                <p className="text-xs text-yellow-700 mb-3">💡 Share your phone number with friends!</p>
              </div>

              <p className="text-gray-600 text-xs my-3">
                Share your number with friends so they can enter you as their referrer!
              </p>

              <a 
                href="https://www.unlimiteddatagh.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full bg-green-500 text-white rounded-xl py-3 px-4 font-semibold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all"
              >
                🌐 Visit UnlimitedData GH
              </a>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-3 p-3 rounded-xl text-sm ${
              message.includes('✅') || message.includes('registered!')
                ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                : 'bg-red-50 text-red-700 border-2 border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-2 text-center">
          <h3 className="text-gray-800 font-bold mb-2 flex items-center justify-center gap-2 text-base">
            <span>💬</span>
            <span>Need Help?</span>
          </h3>
          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
            Join our WhatsApp community for updates and support!
          </p>
          <div className="space-y-2">
            <a 
              href="https://chat.whatsapp.com/LEfSM2A3RVKJ1yY8JB5osP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-green-500 text-white rounded-xl py-3 px-4 font-semibold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all"
            >
              📱 Join WhatsApp
            </a>
            <a 
              href="tel:0503276136" 
              className="block bg-blue-500 text-white rounded-xl py-3 px-4 font-semibold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all"
            >
              📞 Call 0503276136
            </a>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-white rounded-2xl shadow-xl p-4 text-center">
          <h3 className="text-gray-800 font-bold mb-3 flex items-center justify-center gap-2 text-base">
            <span>⭐</span>
            <span>⭐</span>
            <span>Why Trust This?</span>
          </h3>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-[10px] font-semibold text-gray-600">Secure</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-[10px] font-semibold text-gray-600">Instant</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-[10px] font-semibold text-gray-600">Fair</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">💯</div>
              <div className="text-[10px] font-semibold text-gray-600">Genuine</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-2.5 border-t border-gray-200 pt-4">
            <div className="bg-gray-50 p-3 rounded-lg text-left border-l-3 border-purple-500">
              <p className="text-gray-600 text-xs leading-relaxed mb-2">
                "I won 1GB data last month! Very genuine and fast delivery. 🔥"
              </p>
              <p className="text-gray-500 text-[11px] font-semibold">- Kwame A., Accra</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-left border-l-3 border-purple-500">
              <p className="text-gray-600 text-xs leading-relaxed mb-2">
                "Legit! I referred 5 friends and got my 4GB bonus instantly! 🙏"
              </p>
              <p className="text-gray-500 text-[11px] font-semibold">- Abena M., Kumasi</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-left border-l-3 border-purple-500">
              <p className="text-gray-600 text-xs leading-relaxed mb-2">
                "Best data service in Ghana! The giveaways are real. 💪"
              </p>
              <p className="text-gray-500 text-[11px] font-semibold">- Kofi B., Tema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;