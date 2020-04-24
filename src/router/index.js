import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '仪表盘',
    meta: { title: '仪表盘', icon: 'dashboard' },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/usercenter',
    component: Layout,
    name: '用户权限管理',
    meta: { title: '用户权限管理', icon: 'user' },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/usercenter/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'group',
        name: '角色管理',
        component: () => import('@/views/usercenter/group/index'),
        meta: { title: '角色管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/project',
    component: Layout,
    name: '项目管理',
    meta: { title: '项目管理', icon: 'code' },
    children: [
      {
        path: 'project',
        name: '项目管理',
        component: () => import('@/views/project/project/index'),
        meta: { title: '项目管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/release',
    component: Layout,
    name: '代码上线',
    meta: { title: '代码上线', icon: 'user' },
    children: [
      {
        path: 'apply',
        name: '申请上线',
        component: () => import('@/views/release/apply/index'),
        meta: { title: '申请上线', icon: 'user' }
      },
      {
        path: 'list',
        name: '申请列表',
        component: () => import('@/views/release/list/index'),
        meta: { title: '申请列表', icon: 'tree' }
      },
      {
        path: 'history',
        name: '上线列表',
        component: () => import('@/views/release/history/index'),
        meta: { title: '上线列表', icon: 'tree' }
      }
    ]
  },


  {
    path: '/workorder',
    component: Layout,
    name: '工单系统',
    meta: { title: '工单系统', icon: 'form' },
    children: [
      {
        path: 'apply',
        name: '工单申请',
        component: () => import('@/views/workorder/apply/index'),
        meta: { title: '工单申请', icon: 'form' }
      },
      {
        path: 'list',
        name: '申请列表',
        component: () => import('@/views/workorder/list/index'),
        meta: { title: '申请列表', icon: 'table' }
      },
      {
        path: 'history',
        name: '工单历史',
        component: () => import('@/views/workorder/history/index'),
        meta: { title: '工单历史', icon: 'table' }
      }
    ]
  },

  {
    path: '/tasks',
    component: Layout,
    name: '任务系统',
    meta: { title: '任务系统', icon: 'tree' },
    children: [
      {
        path: 'add',
        name: '任务添加',
        component: () => import('@/views/tasks/add/index'),
        meta: { title: '任务添加', icon: 'form' }
      },
      {
        path: 'list',
        name: '任务列表',
        component: () => import('@/views/tasks/list/index'),
        meta: { title: '申请列表', icon: 'table' }
      },
    ]
  },

  // {
  //   path: '/books',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: '图书管理系统',
  //   meta: { title: '图书管理系统', icon: 'example' },
  //   children: [
  //     {
  //       path: 'book',
  //       name: '图书',
  //       component: () => import('@/views/books/book/index'),
  //       meta: { title: '图书', icon: 'table' }
  //     },
  //     {
  //       path: 'author',
  //       name: '作者',
  //       component: () => import('@/views/books/author/index'),
  //       meta: { title: '作者', icon: 'tree' }
  //     },
  //     {
  //       path: 'publish',
  //       name: '出版商',
  //       component: () => import('@/views/books/publish/index'),
  //       meta: { title: '出版商', icon: 'table' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

