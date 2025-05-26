/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#home/routes/home_routes'
import '#auth/routes/auth_routes'
import '#dashboard/routes/dashboard_routes'
import '#notifications/routes/notification_routes'
import '#me/routes/me_routes'

import router from '@adonisjs/core/services/router'

router.get('/about', (ctx) => ctx.inertia.render('public/About')).as('about.index')
