/*global document */
import Vue from 'vue';
import Router from 'vue-router';

import index from './index.vue';
import information from './information.vue';
import success from './success.vue';

import {addClassName , removeClassName} from '../../lib/class';

Vue.use(Router);

let router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    },{
        path: '/information',
        name: 'information',
        component: information
    },{
        path: '/success',
        name: 'success',
        component: success
    },{
        path: '*',
        redirect: '/'
    }]
});

router.beforeEach((to , from , next)=>{
    document.body.scrollTop = 0;
    window.scrollTo(0,0);
    //重置footer样式
    let content = document.getElementById('J_content_wrapper');
    if ( to.path === '/' && content){
        removeClassName(content , 'information');
        addClassName(content , 'apply');
    }else if ( to.path === '/information' && content ){
        removeClassName(content , 'apply');
        addClassName(content , 'information');
    }else if ( content ){
        removeClassName(content , 'apply');
        removeClassName(content , 'information');
    }
    next();
});

export default router;