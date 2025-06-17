import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Save } from 'lucide-react';
import Card from '../components/Card';

export default function SettingsPage() {
  // mock state
  const [siteName, setSiteName] = useState('Mos Social');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    // mock save action
    alert('Settings saved (mock)');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <Card title="General Settings">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Site Name</label>
            <input
              type="text"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Enable Notifications</span>
            <Switch
              checked={enableNotifications}
              onChange={setEnableNotifications}
              className={`${enableNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
            >
              <span
                className={`${enableNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Maintenance Mode</span>
            <Switch
              checked={maintenanceMode}
              onChange={setMaintenanceMode}
              className={`${maintenanceMode ? 'bg-red-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
            >
              <span
                className={`${maintenanceMode ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
);
}
