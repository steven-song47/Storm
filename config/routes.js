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
  // {
  //   name: 'Security Testing',
  //   icon: 'table',
  //   path: '/dependency',
  //   component: './Dependency',
  // },
  {
    name: 'Project Management',
    icon: 'project',
    path: '/project',
    routes: [
      {
        path: '/project/config',
        name: 'Project Config',
        component: './ProjectConfig',
      },
      {
        path: '/project/board',
        name: 'Card Board',
        component: './Board',
      },
      {
        path: '/project/auto',
        name: 'Test Plan',
        component: './Automation',
      },
      {
        path: '/project/sprint',
        name: 'Sprint Dashboard',
        component: './Dashboard',
      },
      {
        path: '/project/member',
        name: 'Member Management',
        component: './MemberManage',
      },
      {
        path: '/project/workflow',
        name: 'Card Management',
        component: './Project',
      },
      {
        path: '/project/case',
        name: 'Case Management',
        component: './CaseManage',
      },
      {
        path: '/project/bug',
        name: 'Bug Management',
        component: './BugManage',
      },
      {
        path: '/project/retro',
        name: 'Retro Actions',
        component: './Project',
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
