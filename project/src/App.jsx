import React, { useState } from 'react';
import API from './api';
import WelcomeScreen from './components/WelcomeScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import SuccessScreen from './components/SuccessScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ValidateEmailScreen from './components/ValidateEmailScreen';
import PersonalInfoScreen from './components/PersonalInfoScreen';
import LoginScreen from './components/LoginScreen';
import CreateNewPasswordScreen from './components/CreateNewPasswordScreen';
import DashboardScreen from './components/Dashboard/DashboardHome';

function App() {
  const [currentScreen, setCurrentScreen] = useState('create-account');
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [emailToken, setEmailToken] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [validateError, setValidateError] = useState('');

  const navigateToScreen = (screen) => setCurrentScreen(screen);

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log('Form submitted:', formData);
    setCurrentScreen('personal-info'); // Move directly to PersonalInfoScreen
  };

  // Called after registration
  const handleAccountCreated = async (user) => {
    setFormData(user);
    console.log('Account created:', formData);
    setShowValidateModal(true); // Show modal immediately

    // Request backend to send email token
    try {
      await API.post('/auth/send-email-token', { email: user.email });
      // You can op
      // tionally handle the token here if needed
    } catch (err) {
      console.error('Failed to send email token:', err, formData);
    }
  };

  // Called after email is validated
  const handleEmailValidated = async (code) => {
    console.log('Validating email with code:', code, formData);
    try {
      const res = await API.post('/auth/validate-email-token', { email: formData.email, code });
      if (res.data.success) {
        setShowValidateModal(false);
        setCurrentScreen('personal-info');
        setValidateError('');
      } else {
        setValidateError(res.data.message || 'Invalid code');
      }
    } catch (err) {
      setValidateError(err?.response?.data?.message || 'Validation failed');
      console.error('Email validation failed:', err);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigateToScreen} />;
      case 'create-account':
        return <CreateAccountScreen onSubmit={handleAccountCreated} onBack={() => navigateToScreen('welcome')} onForgotPassword={() => navigateToScreen('forgot-password')} />;
      case 'success':
        return <SuccessScreen formData={formData} onContinue={() => setShowValidateModal(true)} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onBack={() => navigateToScreen('create-account')} onComplete={() => navigateToScreen('create-new-password')} />;
      case 'personal-info':
        return <PersonalInfoScreen onComplete={() => navigateToScreen('login')} />;
      case 'login':
        return <LoginScreen onLoginSuccess={() => navigateToScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'create-new-password':
        return <CreateNewPasswordScreen onComplete={() => navigateToScreen('login')} onBack={() => navigateToScreen('login')} />;
      default:
        return <WelcomeScreen onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}

      {showValidateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-0">
            <ValidateEmailScreen
              formData={formData}
              onValidate={handleEmailValidated}
              validateError={validateError}
            />
          </div>
        </div>
      )}
    </div>
  );
}


export default App;