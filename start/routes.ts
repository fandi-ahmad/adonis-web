/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import Database from '@ioc:Adonis/Lucid/Database'
// import ArticlesController from 'App/Controllers/Http/ArticlesController'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})


// Route.get('/news', ({view}) => {
//   return view.render('news.view')
// })

// penambahan as('news_view') untuk penamaan ketika dipanggil di file lain

Route.get('/news', 'ArticlesController.index').as('news_view')
Route.get('/news/create', 'ArticlesController.create').as('news_create')
Route.post('/news/create', 'ArticlesController.store').as('news_store')
Route.get('/news/:slug/edit', 'ArticlesController.edit').as('news_edit')


Route.patch('/news/:slug', 'ArticlesController.update').as('news_update')

// .where('id', {
//   match: /^[0-9]+$/,
//   cast: (id) => Number(id),
// }).as('news_update')

Route.delete('/news/:id', ({params}) => {
  return { params }
}).where('id', {
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
})


// ==== penambahan kode ini untuk merubah id menjadi integer ====
// .where('id', {
//   match: /^[0-9]+$/,
//   cast: (id) => Number(id),
// })
