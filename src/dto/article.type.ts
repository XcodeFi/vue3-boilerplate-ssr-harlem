export interface ArticlePaging {
    allArticles: Pagination<Article>;
}

export class ArticleResponseGraphql extends GraphqlResponse<ArticlePaging> {

}