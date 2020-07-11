// 菜单 侧边栏
export default [
  { path: '/index', title: 'Ticket Reserve', icon: 'home' },
  { path: '/OrderList', title: 'Order List', icon: 'line-chart' },
  { path: '/consignList', title: 'Consign List', icon: 'globe' },
  { path: '/AdvancedSearch', title: 'Advanced Search', icon: 'group' },
  {
    path: '/',
    title: 'Execute Flow',
    icon: 'table',
    children: [
      {
        path: '/ticketCollect',
        title: 'Ticket Collect',
        icon: 'user'
      },
      {
        path: '/enterStation',
        title: 'Enter Stationt',
        icon: 'bank'
      }
    ]
  }
]
