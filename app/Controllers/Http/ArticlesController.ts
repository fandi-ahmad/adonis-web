// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ArticlesController {
    public async index({view}) {
        // ambil data dari db
        const articles = await Database.from('articles').select('*')
        return view.render('news.view', {articles})
    }

    public async create({view}) {
        return view.render('news.create')
    }

    public async store({response, request}) {
        // const payload = request.body()

        // membuat validasi required
        const articleSchema = schema.create({
            title: schema.string(),
            image: schema.string(),
            content: schema.string(),
        })

        try {
            const payload = await request.validate({ schema: articleSchema })
            await Database.table('articles').insert({
                ... payload,
                slug: payload.title
            })
            return response.redirect().back()
        } catch (error) {
            response.badRequest(error.messages)
        }

    }
}
