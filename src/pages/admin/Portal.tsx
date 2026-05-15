import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search,
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function AdminPortal() {
  const stats = [
    { label: "Active Subscriptions", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Boxes Shipped Today", value: "142", icon: Package, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Live Waitlist", value: "89", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Projected Revenue", value: "$42.5k", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg" />
          <span className="font-display font-bold text-slate-800">KinderRent Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink to="/admin" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/admin/inventory" icon={Package}>Box Publisher</SidebarLink>
          <SidebarLink to="/admin/users" icon={Users}>Active Users</SidebarLink>
          <SidebarLink to="/admin/settings" icon={Settings}>CMS Settings</SidebarLink>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Overview</h1>
            <p className="text-slate-500 font-medium">Welcome back, Stephanie.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              New Box
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (stat && (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  +12.5%
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <p className="text-slate-500 text-sm font-semibold">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </motion.div>
          )))}
        </section>

        {/* Recent Activity / Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Recent Publishings</h3>
              <button className="text-sm font-bold text-blue-600 hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-slate-50 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Mountain Climber #{1024 + i}</h4>
                    <p className="text-slate-500 text-sm">3D Files • 12 Lessons • Published 2h ago</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">QR_X29P</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
             <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Live Class Waitlist</h3>
              <button className="text-sm font-bold text-blue-600 hover:underline">Manage Queue</button>
            </div>
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-slate-300" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-lg">89 Parents Waiting</p>
                <p className="text-slate-500 text-sm max-w-[200px]">Next class starts in 14 minutes. Ensure all materials are live.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon: Icon, children }: { to: string, icon: any, children: React.ReactNode }) {
  return (
    <NavLink 
      to={to} 
      end
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all
        ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
      `}
    >
      <Icon className="w-5 h-5" />
      {children}
    </NavLink>
  );
}
