const moduleRoute = {
    path: '/',
    component: () => import('./HomeModule.vue'),
    children: [
        {
            path: '',
            name: 'Home Page',
            component: () => import('./views/HomePage.vue'),
        }
    ],
    meta: {
        auth: true
    }
}

export default router => {
    router.addRoute(moduleRoute)
}