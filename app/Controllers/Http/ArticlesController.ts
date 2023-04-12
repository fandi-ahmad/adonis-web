// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import Article from "App/Models/Article"
import CreateArticleValidator from "App/Validators/CreateArticleValidator"

export default class ArticlesController {
    public async index({view}) {
        // ambil data dari db
        // pemberian nama model harus sama dengan nama tabel pada database
        // const articles = await Database.from('articles').select('*')     | perintah jika tidak menggunakan Model
        const articles = await Article.all()
        return view.render('news/view', {articles})
    }

    public async create({view}) {
        return view.render('news/create')
    }

    public async store({response, request}) {
        // const payload = request.body()

        // membuat validasi required
        // const articleSchema = schema.create({
        //     title: schema.string(),
        //     image: schema.string(),
        //     content: schema.string(),
        // })

        try {
            const payload = await request.validate(CreateArticleValidator )
            await Database.table('articles').insert({
                ... payload,
                slug: payload.title
            })
            return response.redirect().back()
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async edit({ view, params }) {
        const {slug} = params
        const article = await Database.from('articles').where('slug', slug).first()
        return view.render('news/edit', { article })
    }

    public async update({request, response, params}) {
        const payload = await request.validate(CreateArticleValidator)
        // await Database.from('articles').update(payload)
        await Database.from('articles').where('slug', params.slug).update(payload)
        return response.redirect().back()
    }

    public async destroy({params, response}) {
        await Database.from('articles').where('slug', params.slug).delete()
        return response.redirect().back()
    }
}
