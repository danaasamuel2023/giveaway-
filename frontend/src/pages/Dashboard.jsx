import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, linkRes] = await Promise.all([
          api.get('/api/users/me'),
          api.get('/api/users/referral-link')
        ]);
        
        setUserData(profileRes.data);
        setReferralLink(linkRes.data.referral_link);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const bonusEligible = userData?.referral_count >= 5;
  const remainingReferrals = Math.max(0, 5 - (userData?.referral_count || 0));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Welcome, {user?.full_name}!</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Your Data Reward</h3>
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {userData?.data_awarded || 0} GB
            </div>
            <p className="text-gray-600">
              {bonusEligible 
                ? 'Congratulations! You\'ve earned the bonus!' 
                : `You'll get ${remainingReferrals} GB more when you reach 5 referrals`}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Referrals</h3>
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {userData?.referral_count || 0}
            </div>
            <p className="text-gray-600">
              {remainingReferrals > 0 
                ? `Keep going! ${remainingReferrals} more for bonus`
                : 'You\'ve reached the goal!'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Share Your Referral Link</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white"
            />
            <button
              onClick={copyToClipboard}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Share this link with friends. When they sign up using your link, they'll help you earn your bonus data!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold">{userData?.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold">{userData?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold">{userData?.phone_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Referral Code:</span>
              <span className="font-semibold font-mono">{userData?.referral_code}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
