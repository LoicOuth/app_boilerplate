import router from '@adonisjs/core/services/router'

const HomeController = () => import('#home/controllers/home_controller')

router.get('/', [HomeController, 'render']).as('home.index')
