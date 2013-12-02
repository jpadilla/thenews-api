#thenews-api

This is Scraper and Web API for [http://thenews.im](http://thenews.im), a pretty cool project by [ahmetsulek](http://ahmetsulek.com/) that brings together LayerVault's [Designer News](https://news.layervault.com/stories) and Y Combinator's [Hacker News](https://news.ycombinator.com).

![image](http://d.pr/i/obm0+)

The `cron.js` script handles fetching and scraping data from thenews.im and storing it in MongoDB.

The `server.js` script runs an express server serving the following endpoints:

- **/top** - Loads all posts found in thenews.im
- **/top/hn** - Loads all Hacker News posts found in thenews.im
- **/top/dn** - Loads all Designer News posts found in thenews.im


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

