export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'System Management',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'User Management',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'Online Monitor',
    icon: 'monitor',
    path: '/monitor',
    routes: [
      {
        path: '/monitor/interface',
        name: 'API Monitor',
        component: './Monitor',
      },
    ],
  },
  {
    name: 'Project Management',
    icon: 'project',
    path: '/project',
    routes: [
      {
        path: '/project/overview',
        name: 'Project Overview',
        component: './Overview',
      },
      {
        path: '/project/config',
        name: 'Project Config',
        component: './ProjectConfig',
      },
      {
        path: '/project/member',
        name: 'Member MGT',
        component: './MemberManage',
      },
      {
        path: '/project/board',
        name: 'Card Board',
        component: './Board',
      },
      {
        path: '/project/sprint',
        name: 'Sprint Dashboard',
        component: './Dashboard',
      },
      {
        path: '/project/case',
        name: 'Case MGT',
        component: './CaseManage',
      },
      {
        path: '/project/auto',
        name: 'Test Plan',
        component: './Automation',
      },
      {
        path: '/project/retro',
        name: 'Retro Actions',
        component: './Retro',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
