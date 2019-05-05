
import smartManagerDashboard from '../sysmodule/smartManager/dashboard/index.vue'

export default{
  'path': '/smartManager',
  'name': 'smartManager',
  'component': smartManagerDashboard,
  'children': [
    {
      'path': '/core_serviceQuality',
      'component': () => import('@/sysmodule/smartOperate/coreBank/serviceQuality.vue'),
      'name': 'core_serviceQuality',
      'meta': { 'title': '总行服务质量', 'icon': 'dashboard', 'noCache': true }
    }
  ]
}
