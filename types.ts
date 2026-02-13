// Section 2.1 Data Dictionary

export enum UserStatus {
  Normal = '正常',
  Dormant = '休眠', // 30 days inactive
  Lost = '流失',    // 90 days inactive
  Frozen = '冻结'
}

export enum Gender {
  Male = '男',
  Female = '女',
  Unknown = '未知'
}

export enum ChronicDisease {
  Hypertension = '高血压',
  Diabetes = '糖尿病',
  Hyperlipidemia = '高血脂',
  Arthritis = '关节炎',
  CervicalSpondylosis = '颈椎病',
  LumbarDisease = '腰椎病',
  Other = '其他'
}

export enum ConstitutionType {
  YangDeficiency = '阳虚',
  YinDeficiency = '阴虚',
  QiDeficiency = '气虚',
  BloodDeficiency = '血虚',
  PhlegmDampness = '痰湿',
  DampHeat = '湿热',
  BloodStasis = '血瘀',
  QiStagnation = '气郁',
  Peaceful = '平和'
}

export enum ActivityType {
  DigitalHuman = '数字人对话',
  Knowledge = '知识点击',
  CheckIn = '打卡',
  Appointment = '预约',
  Mall = '商城', // Browsing/Buying
  Report = '报告查看',
  Login = 'APP登录'
}

export interface User {
  id: string; // 32-bit unique ID
  name: string;
  phone: string; // Needs masking
  gender: Gender;
  age: number;
  store: string;
  chronicDiseases: ChronicDisease[]; // Top 3
  constitution: ConstitutionType[]; // Top 2
  status: UserStatus;
  lastActive: string; // ISO Date string
  assignedStaff: string;
  bmi?: number;
  bodyFat?: number; // percentage
  painLevel?: number; // 1-10
  painArea?: string[];
  tags: string[];
}

export interface Trajectory {
  id: string;
  userId: string;
  userName: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  duration?: number; // seconds
  device?: string; // iOS/Android
  isAbnormal?: boolean;
  store?: string;
  details?: any; // For detailed view (chat logs, order items, etc.)
}

export interface TagGroup {
  id: string;
  name: string;
  isSystem: boolean; // Cannot delete system groups
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  count: number; // Associated users
  status: 'enabled' | 'disabled';
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change: number; // Percentage
  period: string;
}
