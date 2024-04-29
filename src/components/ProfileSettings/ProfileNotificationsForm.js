import React, { useState } from 'react';

export default function ProfileNotificationsForm() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [notificationFrequency, setNotificationFrequency] = useState('daily');

    return (
        <div className="p-6 bg-white rounded-md shadow-lg dark:bg-ff_bg_continer_dark dark:text-white dark:shadow-dark">
            <h2 className="text-2xl font-bold mb-5 text-gray-700 dark:text-white">Notification Settings</h2>

            <div className="space-y-4">
                {/* Email Notifications Toggle */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <span>Email Notifications</span>
                    </label>
                </div>

                {/* Push Notifications Toggle */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={pushNotifications}
                            onChange={() => setPushNotifications(!pushNotifications)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <span>Push Notifications</span>
                    </label>
                </div>

                {/* Notification Frequency */}
                <div>
                    <label htmlFor="frequency" className="block mb-2">Notification Frequency</label>
                    <select 
                        value={notificationFrequency} 
                        onChange={(e) => setNotificationFrequency(e.target.value)}
                        className="form-select block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-4"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
