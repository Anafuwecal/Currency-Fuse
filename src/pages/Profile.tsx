import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, CreditCard, Bell, Palette, Globe, Save, Edit, Camera, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    dateOfBirth: '1990-05-15',
    bio: 'Experienced cryptocurrency trader and portfolio manager with over 5 years in the fintech industry.',
    company: 'CurrencyFuse',
    position: 'Senior Trader',
    website: 'https://johndoe.com'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to an API
    console.log('Profile saved:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setProfileData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      dateOfBirth: '1990-05-15',
      bio: 'Experienced cryptocurrency trader and portfolio manager with over 5 years in the fintech industry.',
      company: 'CurrencyFuse',
      position: 'Senior Trader',
      website: 'https://johndoe.com'
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ash-900">Profile</h1>
          <p className="text-ash-600">Manage your personal information and preferences</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="btn-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="btn-secondary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <div className="relative inline-block">
                                        <div className="w-32 h-32 bg-gradient-to-br from-ash-600 to-ash-800 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                          {profileData.firstName[0]}{profileData.lastName[0]}
                        </div>
                {isEditing && (
                                          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-ash-200 hover:border-ash-300 transition-colors">
                          <Camera className="w-4 h-4 text-ash-600" />
                        </button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-ash-900 mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-ash-600 mb-4">{profileData.position}</p>
              <div className="space-y-2 text-sm text-ash-600">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member since 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
                                <h3 className="text-lg font-semibold text-ash-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-ash-600" />
                      Personal Information
                    </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="card">
                                <h3 className="text-lg font-semibold text-ash-900 mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-ash-600" />
                      Professional Information
                    </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Company</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Position</label>
                <input
                  type="text"
                  value={profileData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-ash-700 mb-2">Website</label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="card">
            <h3 className="text-lg font-semibold text-ash-900 mb-4">About Me</h3>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="input-field disabled:bg-ash-50 disabled:cursor-not-allowed resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-ash-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button className="flex items-center justify-center space-x-2 p-4 bg-ash-50 hover:bg-ash-100 rounded-lg transition-colors">
                        <Shield className="w-5 h-5 text-ash-600" />
                        <span className="font-medium text-ash-700">Security Settings</span>
                      </button>
              <button className="flex items-center justify-center space-x-2 p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-success-600" />
                <span className="font-medium text-success-700">Notifications</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors">
                <CreditCard className="w-5 h-5 text-warning-600" />
                <span className="text-warning-700">Billing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
