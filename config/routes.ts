export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register' },
      { component: './404' }
    ]
  },
  {
    path: '/article',
    layout: false,
    routes: [
      { name: '学习笔记', path: '/article/study', component: './Article/Study' },
      { name: '关于我', path: '/article/aboutme', component: './Article/AboutMe' },
      { component: './404' }
    ]
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/user-manage', name: '用户管理', icon: 'smile', component: './Admin/UserManage' },
      { path: '/admin/user-info', name: '个人中心', icon: 'smile', component: './Admin/userInfo' },
      { component: './404' }
    ]
  },
  { path: '/', redirect: '/article/study' },
  { component: './404' }
]
