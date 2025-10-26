import { useState, useEffect } from 'react';
import api from '../utils/api';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReferrals: 0,
    bonusQualifiedCount: 0,
    todayEntries: 0
  });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data);
      
      // Calculate stats
      const totalUsers = response.data.length;
      const totalReferrals = response.data.reduce((sum, u) => sum + (u.referral_count || 0), 0);
      const bonusQualified = response.data.filter(u => (u.referral_count || 0) >= 5);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayUsers = response.data.filter(u => new Date(u.created_at) >= today);
      
      setStats({
        totalUsers,
        totalReferrals,
        bonusQualifiedCount: bonusQualified.length,
        todayEntries: todayUsers.length
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const response = await api.get('/api/admin/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `giveaway_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const handleExportBonus = async () => {
    setExporting(true);
    try {
      const response = await api.get('/api/admin/export-bonus', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bonus_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const handleExportNew = async () => {
    setExporting(true);
    try {
      const response = await api.get('/api/admin/export-new', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `new-users-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const handleExport4GB = async () => {
    setExporting(true);
    try {
      const response = await api.get('/api/admin/export-4gb', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `4gb-bonus-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Get bonus qualified users (5+ referrals)
  const bonusQualified = users.filter(u => (u.referral_count || 0) >= 5)
    .sort((a, b) => (b.referral_count || 0) - (a.referral_count || 0));

  // Get top 10 referrers
  const topReferrers = [...users]
    .sort((a, b) => (b.referral_count || 0) - (a.referral_count || 0))
    .slice(0, 10);

  // Get recent entries
  const recentEntries = [...users]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);

  // Format time
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return minutes + ' min ago';
    if (hours < 24) return hours + 'h ago';
    if (days < 7) return days + 'd ago';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 mb-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-1">🎯 Admin Dashboard</h1>
        <p className="text-sm opacity-95">UnlimitedData GH Giveaway</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">👥 Participants</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">🔗 Referrals</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalReferrals}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-2 border-green-500">
          <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">🎁 Bonus</div>
          <div className="text-2xl font-bold text-green-600">{stats.bonusQualifiedCount}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">📅 Today</div>
          <div className="text-2xl font-bold text-gray-800">{stats.todayEntries}</div>
        </div>
      </div>

      {/* Bonus Qualified Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">🎁 4GB Bonus Qualified (5+ Refs)</h2>
        {bonusQualified.length > 0 ? (
          <div className="space-y-2">
            {bonusQualified.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <div className="font-semibold text-gray-800">{user.phone_number}</div>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{user.referral_count}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm">No users qualified yet.</p>
          </div>
        )}
      </div>

      {/* Top 10 Referrers */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">🏆 Top 10 Referrers</h2>
        {topReferrers.length > 0 ? (
          <div className="space-y-2">
            {topReferrers.map((user, index) => {
              const hasBonus = user.referral_count >= 5;
              return (
                <div key={user.id} className={`flex items-center justify-between p-2 rounded-lg ${
                  hasBonus ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      hasBonus ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="font-semibold text-gray-800">{user.phone_number}</div>
                    {hasBonus && <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">4GB</span>}
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{user.referral_count}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm">No referrals yet.</p>
          </div>
        )}
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">⏰ Recent Entries (Last 10)</h2>
        {recentEntries.length > 0 ? (
          <div className="space-y-2">
            {recentEntries.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-semibold text-gray-800">{user.phone_number}</div>
                <div className="text-sm text-gray-500">{formatTime(user.created_at)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm">No entries yet.</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">⚙️ Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleExportNew}
            disabled={exporting}
            className="bg-green-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-green-600 disabled:opacity-50 transition"
          >
            {exporting ? '⏳ Exporting...' : '🆕 Export New Users'}
          </button>
          <button
            onClick={handleExport4GB}
            disabled={exporting}
            className="bg-purple-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-purple-600 disabled:opacity-50 transition"
          >
            {exporting ? '⏳ Exporting...' : '🎁 Export 4GB (5+ refs)'}
          </button>
          <button
            onClick={handleExportBonus}
            disabled={exporting}
            className="bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-orange-600 disabled:opacity-50 transition"
          >
            {exporting ? '⏳ Exporting...' : '📊 All Referrers'}
          </button>
          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-blue-600 disabled:opacity-50 transition"
          >
            {exporting ? '⏳ Exporting...' : '📥 Export ALL Users'}
          </button>
          <a
            href="/"
            className="bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-gray-600 transition text-center"
          >
            🏠 Home
          </a>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-gray-600 transition"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;