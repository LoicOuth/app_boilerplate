/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const HomeController = () => import('#controllers/home_controller')
const ToogleThemeController = () => import('#controllers/me/toggle_theme_controller')

router.get('/', [HomeController, 'render']).as('home.index')
router.get('/about', (ctx) => ctx.inertia.render('about'))

router
  .group(() => {
    router.post('/theme', [ToogleThemeController, 'handle']).as('me.theme')
  })
  .prefix('me')
