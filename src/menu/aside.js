// 菜单 侧边栏
export default [
  { path: '/index', title: 'Ticket Reserve', icon: 'home' },
  { path: '/OrderList', title: 'Order List', icon: 'home' },
  { path: '/consignList', title: 'Consign List', icon: 'home' },
  {
    path: '/',
    title: 'Execute Flow',
    icon: 'home',
    children: [
      {
        path: '/ticketCollect',
        title: 'Ticket Collect',
        icon: 'home'
      },
      {
        path: '/enterStation',
        title: 'Enter Stationt',
        icon: 'home'
      }
    ]
  }
]
