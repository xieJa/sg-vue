import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const About =() => import('../page/About')
const Contact =() => import('../page/Contact')
const Servers =() => import('../page/Servers')
const Project =() => import(/* webpackChunkName: "Project" */ '../page/project/Project')
const ProjectDetail =() => import(/* webpackChunkName: "Project" */ '../page/project/ProjectDetail')
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [    
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Servers',
      name: 'Servers',
      component: Servers
    },
    {
      path: '/Project',
      name: 'Project',
      component: Project,
      meta:{keepAlive:true},
      children:[
        {
          path: '/ProjectDetail',
          name: 'ProjectDetail',
          component: ProjectDetail,
        }        
      ],
      
    },    
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    }
  ],
 
})

export default router