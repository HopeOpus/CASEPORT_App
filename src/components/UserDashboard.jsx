import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Calendar, 
  Bell, 
  User, 
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  LogOut
} from 'lucide-react';

const UserDashboard = ({ userData, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Appeal Brief - Case ABC/2024/001',
      type: 'Appeal Brief',
      status: 'submitted',
      submissionDate: '2024-01-15',
      courtDivision: 'Abuja Division',
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      title: 'Motion for Stay of Execution',
      type: 'Motion',
      status: 'pending',
      submissionDate: '2024-01-18',
      courtDivision: 'Abuja Division',
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      title: 'Notice of Appeal - Case XYZ/2024/002',
      type: 'Notice',
      status: 'approved',
      submissionDate: '2024-01-12',
      courtDivision: 'Abuja Division',
      fileSize: '1.2 MB'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'submitted': return <Upload className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {userData?.fullName || 'Barrister'}</h2>
            <p className="opacity-90">Your CasePort dashboard is ready for legal document management</p>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>ID: {userData?.uniqueId || 'CA/ABJ/123456'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{userData?.courtLocation || 'Abuja Division'}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <Plus className="h-5 w-5 inline mr-2" />
              New Filing
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600">
                {documents.filter(d => d.status === 'approved').length}
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {documents.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-purple-600">2</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
            <button className="text-green-800 hover:text-green-900 font-medium">View All</button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {documents.slice(0, 3).map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.fileSize} • {doc.submissionDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    <span className="capitalize">{doc.status}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Documents</h2>
          <p className="text-gray-600">Manage your legal documents and filings</p>
        </div>
        <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Document</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>All Types</option>
              <option>Appeal Brief</option>
              <option>Motion</option>
              <option>Notice</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Submitted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600">{doc.type}</p>
                </div>
              </div>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                {getStatusIcon(doc.status)}
                <span className="capitalize">{doc.status}</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Submitted:</span>
                <span>{doc.submissionDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Court Division:</span>
                <span>{doc.courtDivision}</span>
              </div>
              <div className="flex justify-between">
                <span>File Size:</span>
                <span>{doc.fileSize}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition-colors text-sm">
                View Document
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img src="./logo-dark.svg" alt="" className="h-8 w-12" />
                <img src="./court-dark.svg" alt="" className="h-8 w-12" />
              </div>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-semibold text-gray-900">CasePort</h1>
                <p className="text-sm text-gray-600">Legal Document Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-semibold text-sm">
                    {userData?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'JD'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{userData?.fullName || 'John Doe'}</p>
                  <p className="text-xs text-gray-600">Legal Practitioner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'dashboard' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'documents' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>My Documents</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'calendar' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Calendar</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'profile' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'settings' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <button
                  onClick={() => onNavigate('welcome')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar</h3>
              <p className="text-gray-600">Court dates and deadlines coming soon...</p>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Management</h3>
              <p className="text-gray-600">Profile settings coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Settings</h3>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;