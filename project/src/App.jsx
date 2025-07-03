import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import SuccessScreen from './components/SuccessScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ValidateEmailScreen from './components/ValidateEmailScreen';
import PersonalInfoScreen from './components/PersonalInfoScreen';
import LoginScreen from './components/LoginScreen';
import CreateNewPasswordScreen from './components/CreateNewPasswordScreen';
import DashboardHome from './components/Dashboard/DashboardHome';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentScreen('success');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigateToScreen} />;
      case 'create-account':
        return <CreateAccountScreen onSubmit={handleFormSubmit} onBack={() => navigateToScreen('welcome')} onForgotPassword={() => navigateToScreen('forgot-password')} />;
      case 'success':
        return <SuccessScreen formData={formData} onContinue={() => navigateToScreen('validate-email')} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onBack={() => navigateToScreen('create-account')} onComplete={() => navigateToScreen('create-new-password')} />;
      case 'validate-email':
        return <ValidateEmailScreen formData={formData} onValidate={() => navigateToScreen('personal-info')} />;
      case 'personal-info':
        return <PersonalInfoScreen onComplete={() => console.log('Profile setup complete')} />;
      case 'login':
        return <LoginScreen onNavigate={navigateToScreen} onLoginSuccess={() => navigateToScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardHome />;
      case 'create-new-password':
        return <CreateNewPasswordScreen onComplete={() => navigateToScreen('login')} onBack={() => navigateToScreen('login')} />;
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