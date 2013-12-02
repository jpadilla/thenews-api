#thenews-api

This is Scraper and Web API for [http://thenews.im](http://thenews.im), a pretty cool project by [ahmetsulek](http://ahmetsulek.com/) that brings together LayerVault's [Designer News](https://news.layervault.com/stories) and Y Combinator's [Hacker News](https://news.ycombinator.com).

![image](http://d.pr/i/obm0+)

The `cron.js` script handles fetching and scraping data from thenews.im and storing it in MongoDB.

The `server.js` script runs an express server serving the following endpoints:

- **/top** - Loads all posts found in thenews.im
- **/top/hn** - Loads all Hacker News posts found in thenews.im
- **/top/dn** - Loads all Designer News posts found in thenews.im

### Example response

```json
[{
    "author": "Gadzhi K.",
    "comments": 2,
    "createdAt": "2013-12-02T03:22:56.086Z",
    "link": "http://www.fastcocreate.com/3017108/you-need-to-see-this-17-minute-film-set-entirely-on-a-teens-computer-screen",
    "points": 21,
    "position": 1,
    "source": "designer_news",
    "title": "You Need To See This 17-Minute Film Set Entirely On A Teen's Computer Screen | Co.Create",
    "updatedAt": "2013-12-02T05:24:04.058Z"
}, {
    "author": "wyclif",
    "comments": 364,
    "createdAt": "2013-12-02T03:22:56.298Z",
    "link": "http://www.amazon.com/b?ref_=tsm_1_tw_s_amzn_mx3eqp&node=8037720011",
    "points": 617,
    "position": 1,
    "source": "hacker_news",
    "title": "Amazon Prime Air",
    "updatedAt": "2013-12-02T05:24:04.221Z"
}]
```



## Scraper
```
$ node cron.js
Requesting http://thenews.im
[DONE] resetTopPosts
[DONE] createOrUpdatePosts
[DONE] running cron
```

## Server
```
$ node server.js
```

