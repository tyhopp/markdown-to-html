#[tokio::main]
async fn main() {
    let endpoints = api::routes();

    warp::serve(endpoints)
        .run(([127, 0, 0, 1], 3000))
        .await;
}

mod api {
    use super::filters;
    use super::handlers;
    use warp::Filter;

    pub fn routes() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
        transform_markdown()
    }

    pub fn transform_markdown() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
        warp::path!("markdown-to-html")
            .and(warp::post())
            .and(filters::json_body())
            .and_then(handlers::transform_markdown)
    }
}

mod filters {
    use super::models::{RequestBody};
    use warp::Filter;

    pub fn json_body() -> impl Filter<Extract = (RequestBody,), Error = warp::Rejection> + Clone {
        warp::body::content_length_limit(1024 * 16).and(warp::body::json())
    }
}

mod models {
    use serde_derive::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug)]
    pub struct RequestBody {
        pub markdown: String
    }

    #[derive(Serialize, Deserialize, Debug)]
    pub struct ResponseBody {
        pub html: String
    }
}

mod handlers {
    use super::models::{RequestBody, ResponseBody};
    use std::convert::Infallible;
    use ammonia::clean;
    use pulldown_cmark::{Parser, Options, html::push_html};

    pub async fn transform_markdown(body: RequestBody) -> Result<impl warp::Reply, Infallible> {
        let options = Options::empty();
        let parsed_markdown = Parser::new_ext(&body.markdown, options);
        let mut unsafe_html = String::new();

        push_html(&mut unsafe_html, parsed_markdown);

        let safe_html = clean(&*unsafe_html);

        let response = ResponseBody {
            html: safe_html
        };
        
        Ok(warp::reply::json(&response))
    }
}