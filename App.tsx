import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Tags, 
  Activity, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronDown,
  ShoppingBag,
  Megaphone,
  FileText,
  CreditCard,
  Gift
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import TagManagement from './components/TagManagement';
import TrajectoryList from './components/TrajectoryList';
import { User } from './types';

// Define page IDs for all sub-menus
type PageId = 
  | 'user-dashboard' 
  | 'user-list' 
  | 'user-trajectory' 
  | 'user-tags'
  | 'marketing-overview'
  | 'marketing-campaigns'
  | 'store-orders'
  | 'store-products';

// Navigation Structure Definition
interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const NAV_CONFIG: NavGroup[] = [
  {
    id: 'module-user',
    label: '用户管理',
    icon: Users,
    items: [
      { id: 'user-dashboard', label: '数据概览', icon: LayoutDashboard },
      { id: 'user-list', label: '用户列表', icon: FileText }, // Renamed from "用户管理" to avoid confusion
      { id: 'user-trajectory', label: '用户轨迹', icon: Activity },
      { id: 'user-tags', label: '标签数据', icon: Tags },
    ]
  },
  {
    id: 'module-marketing',
    label: '营销管理',
    icon: Megaphone,
    items: [
      { id: 'marketing-overview', label: '营销概览', icon: LayoutDashboard },
      { id: 'marketing-campaigns', label: '活动管理', icon: Gift },
    ]
  },
  {
    id: 'module-store',
    label: '订单与商城管理',
    icon: ShoppingBag,
    items: [
      { id: 'store-orders', label: '订单列表', icon: CreditCard },
      { id: 'store-products', label: '商品管理', icon: ShoppingBag },
    ]
  }
];

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('user-dashboard');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['module-user']);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Toggle Sidebar Group
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToUserList = () => {
    setSelectedUser(null);
  };

  // Helper to get current breadcrumbs
  const getCurrentBreadcrumb = () => {
    if (activePage === 'user-list' && selectedUser) {
      return { module: '用户管理', page: '用户详情' };
    }
    for (const group of NAV_CONFIG) {
      const item = group.items.find(i => i.id === activePage);
      if (item) {
        return { module: group.label, page: item.label };
      }
    }
    return { module: '用户管理', page: '数据概览' };
  };

  const renderContent = () => {
    // Special case for User Detail view overlay
    if (activePage === 'user-list' && selectedUser) {
      return <UserDetail user={selectedUser} onBack={handleBackToUserList} />;
    }

    switch (activePage) {
      // Module: User Management
      case 'user-dashboard': return <Dashboard />;
      case 'user-list': return <UserList onUserSelect={handleUserSelect} />;
      case 'user-trajectory': return <TrajectoryList />;
      case 'user-tags': return <TagManagement />;

      // Module: Marketing (Placeholders)
      case 'marketing-overview': 
      case 'marketing-campaigns':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <Megaphone size={48} className="mb-4 text-gray-300" />
            <h3 className="text-xl font-medium text-gray-700">营销管理模块建设中</h3>
            <p className="mt-2 text-sm">此功能将在下一版本上线，包含优惠券、活动配置等功能。</p>
          </div>
        );

      // Module: Store (Placeholders)
      case 'store-orders':
      case 'store-products':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
             <ShoppingBag size={48} className="mb-4 text-gray-300" />
             <h3 className="text-xl font-medium text-gray-700">商城与订单系统对接中</h3>
             <p className="mt-2 text-sm">正在连接ERP系统，请稍后访问。</p>
          </div>
        );
        
      default: return <Dashboard />;
    }
  };

  const breadcrumb = getCurrentBreadcrumb();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">Qi</div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">岐问健康</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {NAV_CONFIG.map(group => {
            const isExpanded = expandedGroups.includes(group.id);
            const isActiveGroup = group.items.some(item => item.id === activePage);

            return (
              <div key={group.id} className="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActiveGroup ? 'text-blue-800 bg-blue-50/50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <group.icon size={18} className={isActiveGroup ? 'text-blue-600' : 'text-gray-500'} />
                    <span>{group.label}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                </button>

                {/* Group Items */}
                {isExpanded && (
                  <div className="pl-4 space-y-1 relative">
                    {/* Vertical Line for hierarchy visual */}
                    <div className="absolute left-[21px] top-0 bottom-0 w-px bg-gray-100"></div>
                    
                    {group.items.map(item => {
                      const isActive = activePage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActivePage(item.id);
                            setSelectedUser(null); // Reset detail view when changing nav
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative z-10 ${
                            isActive 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                           <item.icon size={16} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                           {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
              ADM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">机构管理员</p>
              <p className="text-xs text-gray-500 truncate">朝阳大悦城店</p>
            </div>
            <LogOut size={16} className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0">
           <div className="flex items-center text-sm text-gray-500">
             CRM管理平台 <ChevronRight size={14} className="mx-2"/> 
             <span className="text-gray-900 font-medium">{breadcrumb.module}</span>
             <ChevronRight size={14} className="mx-2"/> 
             <span className="text-gray-900 font-medium">{breadcrumb.page}</span>
           </div>
           <div className="flex items-center gap-4">
             <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
               <Settings size={20} />
             </button>
           </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-7xl mx-auto h-full">
             {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
