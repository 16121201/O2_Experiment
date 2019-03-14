import Vue from 'vue'
import Router from 'vue-router'
import Analysis from '@/components/Analysis'
import LoadDataset from '@/components/LoadDataset'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis
    },
    {
      path: '/',
      name: 'LoadDataset',
      component: LoadDataset
    }
  ]
})
