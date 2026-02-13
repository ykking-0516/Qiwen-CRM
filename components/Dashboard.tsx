import React from 'react';
import { MOCK_KPIS } from '../constants';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowUp, ArrowDown, Activity, MessageSquare, ShoppingCart, UserCheck } from 'lucide-react';

const dataTrend = [
  { name: '00:00', active: 40 }, { name: '04:00', active: 10 }, { name: '08:00', active: 200 },
  { name: '12:00', active: 450 }, { name: '16:00', active: 380 }, { name: '20:00', active: 600 },
  { name: '23:59', active: 150 },
];

const dataBehavior = [
  { name: '数字人对话', value: 400 },
  { name: '知识点击', value: 300 },
  { name: '打卡', value: 300 },
  { name: '商城浏览', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_KPIS.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h3 className="text-slate-500 text-sm font-medium">{kpi.label}</h3>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-slate-800">{kpi.value}</span>
              <span className={`flex items-center text-sm font-medium ${kpi.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {Math.abs(kpi.change)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{kpi.period}</p>
          </div>
        ))}
      </div>

      {/* Charts Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} />
              活跃趋势分析 (DAU)
            </h3>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option>今日</option>
              <option>近7天</option>
              <option>近30天</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataTrend}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Behavior Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <UserCheck className="text-green-500" size={20} />
             行为类型占比
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataBehavior}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataBehavior.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Anomaly Alerts Preview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">最新异常提醒</h3>
          <button className="text-sm text-blue-600 hover:underline">查看全部</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">触发用户</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规则名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">触发时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">高</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">李强</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">数字人对话异常</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10分钟前</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="text-yellow-600">待处理</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">处理</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">中</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">张伟</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">长期未活跃突然活跃</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2小时前</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="text-green-600">处理中</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">详情</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
