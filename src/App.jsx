import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import SuccessScreen from './components/SuccessScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ValidateEmailScreen from './components/ValidateEmailScreen';
import PersonalInfoScreen from './components/PersonalInfoScreen';
import LoginScreen from './components/LoginScreen';
import CreateNewPasswordScreen from './components/CreateNewPasswordScreen';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userRole, setUserRole] = useState(null); // 'user', 'admin', 'superadmin'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    uniqueId: '',
    courtLocation: '',
    profilePhoto: null,
    electronicSignature: null
  });

  const navigateToScreen = (screen, role = null) => {
    setCurrentScreen(screen);
    if (role) {
      setUserRole(role);
    }
  };

  const handleFormSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentScreen('success');
  };

  const handleLogin = (credentials, role = 'user') => {
    // Simulate login logic
    console.log('Login attempt:', credentials);
    
    // Set user role based on credentials or API response
    setUserRole(role);
    
    // Navigate to appropriate dashboard
    if (role === 'admin' || role === 'superadmin') {
      setCurrentScreen('admin-dashboard');
    } else {
      setCurrentScreen('user-dashboard');
    }
  };

  const handleProfileComplete = (profileData) => {
    setFormData(prev => ({ ...prev, ...profileData }));
    setUserRole('user');
    setCurrentScreen('user-dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigateToScreen} />;
      
      case 'create-account':
        return (
          <CreateAccountScreen 
            onSubmit={handleFormSubmit} 
            onBack={() => navigateToScreen('welcome')} 
            onForgotPassword={() => navigateToScreen('forgot-password')}
            onLogin={() => navigateToScreen('login')}
          />
        );
      
      case 'success':
        return (
          <SuccessScreen 
            formData={formData} 
            onContinue={() => navigateToScreen('validate-email')} 
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPasswordScreen 
            onBack={() => navigateToScreen('create-account')} 
            onComplete={() => navigateToScreen('create-new-password')} 
          />
        );
      
      case 'validate-email':
        return (
          <ValidateEmailScreen 
            formData={formData} 
            onValidate={() => navigateToScreen('personal-info')} 
          />
        );
      
      case 'personal-info':
        return (
          <PersonalInfoScreen 
            onComplete={handleProfileComplete} 
          />
        );
      
      case 'login':
        return (
          <LoginScreen 
            onNavigate={navigateToScreen}
            onLogin={handleLogin}
          />
        );
      
      case 'create-new-password':
        return (
          <CreateNewPasswordScreen 
            onComplete={() => navigateToScreen('login')} 
            onBack={() => navigateToScreen('login')} 
          />
        );
      
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            userRole={userRole}
            onNavigate={navigateToScreen}
          />
        );
      
      case 'user-dashboard':
        return (
          <UserDashboard 
            userData={formData}
            onNavigate={navigateToScreen}
          />
        );
      
      default:
        return <WelcomeScreen onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
}

export default App;