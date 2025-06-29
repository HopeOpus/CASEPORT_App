import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = ({ userRole = 'admin', onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching users from registration system
    const mockUsers = [
      {
        id: 1,
        fullName: 'Barrister John Doe',
        email: 'john.doe@legal.co',
        phone: '0701-234-5678',
        uniqueId: 'CA/ABJ/123456',
        courtLocation: 'Abuja Division - Shehu Shagari Way',
        status: 'active',
        registrationDate: '2024-01-15',
        lastLogin: '2024-01-20',
        documentsSubmitted: 12,
        casesHandled: 8
      },
      {
        id: 2,
        fullName: 'Barrister Jane Smith',
        email: 'jane.smith@chambers.ng',
        phone: '0802-345-6789',
        uniqueId: 'CA/LAG/789012',
        courtLocation: 'Lagos Division - Lagos, Lagos State',
        status: 'pending',
        registrationDate: '2024-01-18',
        lastLogin: 'Never',
        documentsSubmitted: 0,
        casesHandled: 0
      },
      {
        id: 3,
        fullName: 'Barrister Michael Johnson',
        email: 'michael.j@lawfirm.com',
        phone: '0703-456-7890',
        uniqueId: 'CA/KAN/345678',
        courtLocation: 'Kano Division - Kano, Kano State',
        status: 'suspended',
        registrationDate: '2024-01-10',
        lastLogin: '2024-01-19',
        documentsSubmitted: 25,
        casesHandled: 15
      }
    ];
    setUsers(mockUsers);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'suspended': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    suspendedUsers: users.filter(u => u.status === 'suspended').length,
    totalDocuments: users.reduce((sum, u) => sum + u.documentsSubmitted, 0),
    totalCases: users.reduce((sum, u) => sum + u.casesHandled, 0)
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingUsers}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalDocuments}</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent User Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {users.slice(0, 5).map(user => (
              <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-800 font-semibold text-sm">
                      {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {getStatusIcon(user.status)}
                    <span className="capitalize">{user.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Registered {user.registrationDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-800 font-semibold text-sm">
                          {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.uniqueId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{user.courtLocation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Last login: {user.lastLogin}</div>
                    <div>{user.documentsSubmitted} docs, {user.casesHandled} cases</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      {userRole === 'superadmin' && (
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUserModal = () => {
    if (!showUserModal || !selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold text-xl">
                  {selectedUser.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedUser.fullName}</h4>
                <p className="text-gray-600">{selectedUser.uniqueId}</p>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(selectedUser.status)}`}>
                  {getStatusIcon(selectedUser.status)}
                  <span className="capitalize">{selectedUser.status}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Contact Information</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Email:</span> {selectedUser.email}</div>
                  <div><span className="text-gray-600">Phone:</span> {selectedUser.phone}</div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">Court Information</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Location:</span> {selectedUser.courtLocation}</div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">Account Activity</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Registration:</span> {selectedUser.registrationDate}</div>
                  <div><span className="text-gray-600">Last Login:</span> {selectedUser.lastLogin}</div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">Usage Statistics</h5>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Documents:</span> {selectedUser.documentsSubmitted}</div>
                  <div><span className="text-gray-600">Cases:</span> {selectedUser.casesHandled}</div>
                </div>
              </div>
            </div>

            {userRole === 'superadmin' && (
              <div className="border-t border-gray-200 pt-6">
                <h5 className="font-medium text-gray-900 mb-3">Admin Actions</h5>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Activate User
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    Suspend User
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

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
                <h1 className="text-xl font-semibold text-gray-900">
                  {userRole === 'superadmin' ? 'Super Admin' : 'Admin'} Dashboard
                </h1>
                <p className="text-sm text-gray-600">CasePort Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-semibold text-sm">AD</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">{userRole === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
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
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'users' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'documents' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </button>

              {userRole === 'superadmin' && (
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>System Settings</span>
                </button>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUserManagement()}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Document Management</h3>
              <p className="text-gray-600">Document management features coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && userRole === 'superadmin' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600">System configuration options coming soon...</p>
            </div>
          )}
        </main>
      </div>

      {renderUserModal()}
    </div>
  );
};

export default AdminDashboard;