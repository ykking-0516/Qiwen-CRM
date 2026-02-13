import { User, UserStatus, Gender, ChronicDisease, ConstitutionType, ActivityType, Trajectory, TagGroup, KPIMetric } from './types';

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'u_10001_32bit_identifier_xu89',
    name: '张伟',
    phone: '13812345678',
    gender: Gender.Male,
    age: 45,
    store: '朝阳大悦城店',
    chronicDiseases: [ChronicDisease.Hypertension, ChronicDisease.CervicalSpondylosis],
    constitution: [ConstitutionType.PhlegmDampness, ConstitutionType.QiDeficiency],
    status: UserStatus.Normal,
    lastActive: '2024-05-20T14:30:00',
    assignedStaff: '李娜',
    bmi: 26.5,
    bodyFat: 22,
    painLevel: 4,
    painArea: ['颈', '腰'],
    tags: ['高价值', '慢病干预中']
  },
  {
    id: 'u_10002_32bit_identifier_ak22',
    name: '王芳',
    phone: '13987654321',
    gender: Gender.Female,
    age: 32,
    store: '西单大悦城店',
    chronicDiseases: [],
    constitution: [ConstitutionType.Peaceful],
    status: UserStatus.Dormant,
    lastActive: '2024-04-10T09:15:00',
    assignedStaff: '未分配',
    bmi: 21.0,
    bodyFat: 24,
    painLevel: 0,
    painArea: [],
    tags: ['需激活']
  },
  {
    id: 'u_10003_32bit_identifier_bz99',
    name: '李强',
    phone: '15011112222',
    gender: Gender.Male,
    age: 58,
    store: '海淀黄庄店',
    chronicDiseases: [ChronicDisease.Diabetes, ChronicDisease.Hypertension, ChronicDisease.LumbarDisease],
    constitution: [ConstitutionType.YinDeficiency],
    status: UserStatus.Frozen,
    lastActive: '2023-12-01T10:00:00',
    assignedStaff: '赵云',
    bmi: 28.1,
    bodyFat: 28,
    painLevel: 7,
    painArea: ['腿', '膝'],
    tags: ['违规操作', '投诉用户']
  },
   {
    id: 'u_10004_32bit_identifier_cm88',
    name: '赵敏',
    phone: '13766668888',
    gender: Gender.Female,
    age: 28,
    store: '朝阳大悦城店',
    chronicDiseases: [ChronicDisease.CervicalSpondylosis],
    constitution: [ConstitutionType.YangDeficiency],
    status: UserStatus.Normal,
    lastActive: '2024-05-21T08:20:00',
    assignedStaff: '李娜',
    bmi: 19.5,
    bodyFat: 21,
    painLevel: 2,
    painArea: ['颈'],
    tags: ['活跃', '会员']
  }
];

// Mock Trajectories with more detail
export const MOCK_TRAJECTORIES: Trajectory[] = [
  {
    id: 't_001',
    userId: 'u_10001_32bit_identifier_xu89',
    userName: '张伟',
    type: ActivityType.DigitalHuman,
    description: '与数字人对话：主题-颈椎保养',
    timestamp: '2024-05-20T14:30:00',
    duration: 120,
    device: 'iOS 17.0',
    store: '-',
    isAbnormal: false,
    details: {
      topic: '颈椎保养',
      rounds: 4,
      chatLog: [
        { role: 'user', content: '最近脖子总是很酸痛怎么办？' },
        { role: 'ai', content: '建议您尝试每工作1小时活动颈部，并可以使用热敷缓解。我们有专门的颈椎康复课程，是否需要为您推荐？' },
        { role: 'user', content: '好的，发给我看看' },
        { role: 'ai', content: '已为您推送《办公室5分钟护颈操》，请点击查看。' }
      ]
    }
  },
  {
    id: 't_002',
    userId: 'u_10001_32bit_identifier_xu89',
    userName: '张伟',
    type: ActivityType.Mall,
    description: '浏览商品：颈椎按摩仪',
    timestamp: '2024-05-20T14:15:00',
    duration: 300,
    device: 'iOS 17.0',
    store: '-',
    isAbnormal: false
  },
  {
    id: 't_003',
    userId: 'u_10004_32bit_identifier_cm88',
    userName: '赵敏',
    type: ActivityType.CheckIn,
    description: '完成居家打卡：八段锦',
    timestamp: '2024-05-21T08:20:00',
    device: 'Android 14',
    store: '朝阳大悦城店',
    isAbnormal: false
  },
  {
    id: 't_004',
    userId: 'u_10003_32bit_identifier_bz99',
    userName: '李强',
    type: ActivityType.Login,
    description: '尝试登录（冻结状态）',
    timestamp: '2024-05-19T23:45:00',
    device: 'Unknown',
    store: '-',
    isAbnormal: true
  },
  {
    id: 't_005',
    userId: 'u_10001_32bit_identifier_xu89',
    userName: '张伟',
    type: ActivityType.Appointment,
    description: '预约：中医推拿',
    timestamp: '2024-05-20T10:00:00',
    device: 'iOS 17.0',
    store: '朝阳大悦城店',
    isAbnormal: false
  },
  {
    id: 't_006',
    userId: 'u_10002_32bit_identifier_ak22',
    userName: '王芳',
    type: ActivityType.Knowledge,
    description: '阅读文章：春季养肝食谱',
    timestamp: '2024-05-18T20:10:00',
    duration: 450,
    device: 'Android 13',
    store: '-',
    isAbnormal: false
  },
  {
    id: 't_007',
    userId: 'u_10003_32bit_identifier_bz99',
    userName: '李强',
    type: ActivityType.Mall,
    description: '快速下单：降糖茶 (未支付)',
    timestamp: '2024-05-18T23:50:00',
    device: 'Android 12',
    store: '-',
    isAbnormal: true, // Anomalous buying behavior
    details: {
       warning: '短时间内重复下单未支付超过5次'
    }
  }
];

// Mock Tags
export const MOCK_TAG_GROUPS: TagGroup[] = [
  {
    id: 'g_health',
    name: '健康维度',
    isSystem: true,
    tags: [
      { id: 't_bmi_h', name: '高BMI', count: 124, status: 'enabled' },
      { id: 't_neck', name: '颈肩疼痛', count: 89, status: 'enabled' },
      { id: 't_yang', name: '阳虚体质', count: 45, status: 'enabled' }
    ]
  },
  {
    id: 'g_behavior',
    name: '行为维度',
    isSystem: true,
    tags: [
      { id: 't_mall_high', name: '商城高消费', count: 32, status: 'enabled' },
      { id: 't_active', name: '打卡活跃', count: 210, status: 'enabled' }
    ]
  },
  {
    id: 'g_custom',
    name: '运营自定义',
    isSystem: false,
    tags: [
      { id: 't_new', name: '新用户活动', count: 56, status: 'enabled' },
      { id: 't_risk', name: '流失风险', count: 12, status: 'enabled' }
    ]
  }
];

// Mock KPIs
export const MOCK_KPIS: KPIMetric[] = [
  { label: '今日活跃用户', value: 1245, change: 12.5, period: 'vs 昨日' },
  { label: '今日行为总次数', value: 8320, change: 5.2, period: 'vs 昨日' },
  { label: '数字人对话数', value: 450, change: -2.1, period: 'vs 昨日' },
  { label: '今日打卡人数', value: 890, change: 8.4, period: 'vs 昨日' },
];
