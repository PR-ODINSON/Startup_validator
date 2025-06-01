import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileDashboard() {
  // State variables for all dynamic data
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 1. FETCH ALL DATA ON COMPONENT MOUNT
  useEffect(() => {
    setLoading(true);
    // API calls to fetch profile, activity stats, and uploaded files
    Promise.all([
      axios.get('/api/profile'),    // Fetch user profile
      axios.get('/api/activity'),   // Fetch activity stats
      axios.get('/api/files'),      // Fetch uploaded files
    ])
      .then(([profileRes, activityRes, filesRes]) => {
        setProfile(profileRes.data);      // Set profile data
        setActivity(activityRes.data);    // Set activity stats
        setFiles(filesRes.data);          // Set uploaded files
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  // 2. HANDLE FORM INPUT CHANGES (updates local state only)
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 3. SAVE CHANGES TO PROFILE (API call to update profile)
  const handleSave = () => {
    setSaving(true);
    // API call to update profile details
    axios
      .put('/api/profile', profile)
      .then(() => setSaving(false))
      .catch(() => {
        setError('Failed to save changes');
        setSaving(false);
      });
  };

  // 4. RESET FORM TO LAST LOADED STATE (re-fetch profile from API)
  const handleReset = () => {
    setLoading(true);
    // API call to re-fetch profile data
    axios.get('/api/profile').then((res) => {
      setProfile(res.data);
      setLoading(false);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="dashboard" style={{ display: 'flex', gap: 24, padding: 32, background: '#f9f6ef', minHeight: '100vh' }}>
      {/* Left Panel: Profile Card and Shortcuts */}
      <div style={{ flex: 1, maxWidth: 260 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ background: '#f5eeda', borderRadius: '50%', width: 80, height: 80, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 'bold' }}>
            {profile.initials}
          </div>
          <h3 style={{ margin: '16px 0 4px 0' }}>{profile.fullName}</h3>
          <span style={{ color: '#888', marginBottom: 8, display: 'block' }}>{profile.role}</span>
          <span style={{ background: '#e7f5d9', color: '#6bbf3c', borderRadius: 12, padding: '2px 12px', fontSize: 12, fontWeight: 'bold' }}>
            ● {profile.online ? 'Online' : 'Offline'}
          </span>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
          <h4>Settnɡs shrocts</h4>
          <div style={{ marginBottom: 8, cursor: 'pointer' }}>Change Password</div>
          <div style={{ cursor: 'pointer' }}>Logout</div>
        </div>
      </div>

      {/* Center Panel: Account Details Form */}
      <div style={{ flex: 2, maxWidth: 420 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
          <h3>Account Details</h3>
          <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }}
              />
            </label>
            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }}
              />
            </label>
            <label>
              Role
              <select
                name="role"
                value={profile.role}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }}
              >
                <option>Administrator</option>
                <option>User</option>
              </select>
            </label>
            <label>
              Language
              <input
                type="text"
                name="language"
                value={profile.language}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }}
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              style={{ background: '#2968ef', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: 8, marginRight: 12, fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{ background: '#ececec', color: '#222', padding: '10px 24px', border: 'none', borderRadius: 8, fontWeight: 'bold' }}
            >
              Reset
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Activity Stats and Uploaded Files */}
      <div style={{ flex: 1, maxWidth: 260 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3>Activity stats</h3>
          <div>Total Submissions<br /><b>{activity.submissions}</b></div>
          <div style={{ marginTop: 8 }}>Last Login<br /><b>{activity.lastLogin}</b></div>
          <div style={{ marginTop: 8 }}>Account Created<br /><b>{activity.accountCreated}</b></div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3>Uploaded Files</h3>
          <ul style={{ paddingLeft: 16 }}>
            {files.map((file, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <span role="img" aria-label="file" style={{ marginRight: 6 }}>📄</span>
                {file.name} <span style={{ color: '#888' }}>{file.size}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
          <h3>Settings shortcuts</h3>
          <div style={{ marginBottom: 8, cursor: 'pointer' }}>Change Password</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
