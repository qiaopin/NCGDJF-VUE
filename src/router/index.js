import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/overallSituation/index',
    meta: {
      title: '总体情况', icon: 'shuju_6'
    },
    children: [{
      path: 'overallSituation',
      name: 'OverallSituation',
      component: () => import('@/views/overallSituation/index'),
      meta: { title: '总体情况', icon: '' }
    }, {
      path: 'state',
      name: 'State',
      component: () => import('@/views/overallSituation/state/index'),
      meta: { title: '详细数据', icon: '' },
    }]
  },

  {
    path: '/projectManagement',
    component: Layout,
    redirect: '/projectManagement/index',
    name: 'ProjectManagement',
    meta: {
      title: '项目管理', icon: 'shujuxuanzhong'
    },
    children: [
      {
        path: 'personnel',
        name: 'Personnel',
        component: () => import('@/views/projectManagement/personnel/index'),
        meta: { title: '人员查询', icon: '' }
      },
      {
        path: 'permissions',
        name: 'Permissions',
        component: () => import('@/views/projectManagement/permissions/index'),
        meta: { title: '权限管理', icon: '' }
      },
      {
        path: 'checkArea',
        name: 'CheckArea',
        component: () => import('@/views/projectManagement/checkArea/index'),
        meta: { title: '核查区管理', icon: '' }
      }
    ]
  },

  {
    path: '/processingData',
    component: Layout,
    redirect: '/processingData/fillData',
    name: 'ProcessingData',
    meta: {
      title: '数据处理', icon: '数据处理'
    },
    children: [
      {
        path: 'fillData',
        name: 'FillData',
        component: () => import('@/views/processingData/fillData/index'),
        meta: { title: '数据填报', icon: '' }
      },
      {
        path: 'judgeData',
        name: 'JudgeData',
        component: () => import('@/views/processingData/judgeData/index'),
        meta: { title: '数据判断', icon: '' }
      }
    ]
  },

  {
    path: '/queryData',
    component: Layout,
    redirect: '/queryData/ground',
    name: 'QueryData',
    meta: {
      title: '数据查询', icon: '数据查询,数据库查询'
    },
    children: [
      {
        path: 'ground',
        name: 'Ground',
        component: () => import('@/views/queryData/ground/index'),
        meta: { title: '宗地查询', icon: '' }
      },
      {
        path: 'pseudo',
        name: 'Pseudo',
        component: () => import('@/views/queryData/pseudo/index'),
        meta: { title: '伪宗地查询', icon: '' }
      }
    ]
  },

  {
    path: '/auditGround',
    component: Layout,
    redirect: '/projectManagement/auditGround',
    name: 'AuditGround',
    meta: {
      title: '数据审核', icon: '收费站数据审核'
    },
    children: [
      {
        path: 'auditGround',
        name: 'AuditGround',
        component: () => import('@/views/auditData/auditGround/index'),
        meta: { title: '宗地审核', icon: '' }
      },
      {
        path: 'pseudoGround',
        name: 'PseudoGround',
        component: () => import('@/views/auditData/pseudoGround/index'),
        meta: { title: '伪宗地审核', icon: '' }
      }
    ]
  },

  {
    path: '/overallStatistics',
    component: Layout,
    redirect: '/outputData/overallStatistics',
    name: 'OverallStatistics',
    meta: {
      title: '数据输出', icon: '输出'
    },
    children: [
      {
        path: 'overallStatistics',
        name: 'OverallStatistics',
        component: () => import('@/views/outputData/overallStatistics/index'),
        meta: { title: '总体统计', icon: '' }
      },
      {
        path: 'classificationStatistics',
        name: 'ClassificationStatistics',
        component: () => import('@/views/outputData/classificationStatistics/index'),
        meta: { title: '分级统计', icon: '' }
      }
    ]
  },

  {
    path: '/slinge',
    component: Layout,
    children: [
      {
        path: 'slinge',
        name: 'slinge',
        component: () => import('@/views/fourForm/components/slinge'),
        meta: { title: '单户住宅类', icon: 'form' }
      }
    ]
  },
  {
    path: '/multiFamily',
    component: Layout,
    children: [
      {
        path: 'multiFamily',
        name: 'multiFamily',
        component: () => import('@/views/fourForm/components/multiFamily'),
        meta: { title: '多户住宅类', icon: 'form' }
      }
    ]
  },
  {
    path: '/publicService',
    component: Layout,
    children: [
      {
        path: 'publicService',
        name: 'publicService',
        component: () => import('@/views/fourForm/components/publicService'),
        meta: { title: '公共管理服务类', icon: 'form' }
      }
    ]
  },
  {
    path: '/Industry',
    component: Layout,
    children: [
      {
        path: 'Industry',
        name: 'Industry',
        component: () => import('@/views/fourForm/components/Industry'),
        meta: { title: '产业类', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/slinge',
  //   component: () => import('@/views/fourForm/components/slinge'),
  //   hidden: true
  // },
  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '数据处理',
        component: () => import('@/views/map/index'),
        meta: { title: '数据处理', icon: 'form' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
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
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   mode: 'hash', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
