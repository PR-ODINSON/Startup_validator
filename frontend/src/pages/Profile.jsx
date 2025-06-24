import React, { useState } from 'react';
import { ThemeToggle } from '../components';
import { User, Edit, Lock, Activity, Award, LogOut } from 'lucide-react';

const tabs = [
  { name: 'Overview', icon: User },
  { name: 'Edit Profile', icon: Edit },
  { name: 'Settings', icon: Lock },
  { name: 'Activity', icon: Activity },
  { name: 'Achievements', icon: Award },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              U
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">User Name</h2>
              <p className="text-slate-600 dark:text-slate-300">user@email.com</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-full font-semibold">Founder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 mb-8 border-b border-slate-200 dark:border-slate-700 pb-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.name
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-orange-100 dark:hover:bg-orange-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.name}
              </button>
            );
          })}
        </div>
        <div>
          {activeTab === 'Overview' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Profile Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow flex flex-col gap-2">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Ideas Submitted</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">5</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow flex flex-col gap-2">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Reports Downloaded</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">3</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Edit Profile' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Edit Profile</h3>
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Name</label>
                  <input className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" defaultValue="User Name" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" defaultValue="user@email.com" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Avatar</label>
                  <input type="file" className="w-full" />
                </div>
                <button type="submit" className="btn-primary mt-2">Save Changes</button>
              </form>
            </div>
          )}
          {activeTab === 'Settings' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-700 dark:text-slate-300">Theme</span>
                  <ThemeToggle />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Notification Preferences</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    <option>Email Only</option>
                    <option>Product Updates</option>
                    <option>All Notifications</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Language</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Activity' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Recent Activity</h3>
              <ul className="space-y-3">
                <li className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 shadow flex items-center gap-3">
                  <Activity className="w-5 h-5 text-orange-500" /> Submitted a new idea: <span className="font-semibold">AI Startup Validator</span>
                </li>
                <li className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 shadow flex items-center gap-3">
                  <Activity className="w-5 h-5 text-orange-500" /> Downloaded report: <span className="font-semibold">Validation Q4</span>
                </li>
                <li className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 shadow flex items-center gap-3">
                  <Activity className="w-5 h-5 text-orange-500" /> Updated profile information
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'Achievements' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/10 rounded-xl p-6 flex flex-col items-center shadow">
                  <Award className="w-8 h-8 text-orange-500 mb-2" />
                  <span className="font-bold text-slate-900 dark:text-white">First Idea!</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Submitted your first idea</span>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/10 rounded-xl p-6 flex flex-col items-center shadow">
                  <Award className="w-8 h-8 text-blue-500 mb-2" />
                  <span className="font-bold text-slate-900 dark:text-white">Report Pro</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Downloaded 3+ reports</span>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/10 rounded-xl p-6 flex flex-col items-center shadow">
                  <Award className="w-8 h-8 text-green-500 mb-2" />
                  <span className="font-bold text-slate-900 dark:text-white">Profile Complete</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Filled out your profile</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 