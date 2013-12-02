// Start Profiler
require('./lib/profile');

// Module dependencies.
var request = require('request'),
  cheerio = require('cheerio'),
  mongoose = require('mongoose'),
  async = require('async'),
  config = require('./config/config');

// Connect to MongoDB
mongoose.connect(config.db);

// Require models
var models_path = __dirname + '/app/models';
require('./lib/models-loader')(models_path);

var Post = mongoose.model('Post');

var resetTopPosts = function(cb) {
  var conditions = {top: true},
    update = {top: false},
    options = {multi: true};

  Post.update(conditions, update, options, function(err) {
    if(err) cb(err);
    console.log('[DONE] resetTopPosts');
    cb(null);
  });
};

var createOrUpdatePosts = function(data, cb) {
  var posts = [],
    i = 0;

  async.whilst(
      function() { return i < data.length; },
      function(callback) {
        Post.createOrUpdate(data[i], function(err, post) {
          posts.push(post);
          callback();
        });
        i++;
      },
      function(err) {
          if(err) cb(err);
          console.log('[DONE] createOrUpdatePosts');
          cb(null, posts);
      }
  );
};

var getPosts = function($, side) {
  var $container = $('.container'),
    $leftSide = $container.find('.side.'+side),
    $designerNewsPosts = $leftSide.find('.post-info');

  var source = (side == 'left') ? 'designer_news' : 'hacker_news';
  var posts = [];

  $designerNewsPosts.each(function(index) {
    var $postAnchor = $(this).find('.title'),
      $below = $(this).find('p');

      var postTitle = $postAnchor.text().trim(),
        postLink = $postAnchor.attr('href');

      var strings = $below.text().split(' | '),
        leftStrings = strings[0].split(' points by '),
        points = leftStrings[0],
        author = leftStrings[1],
        rightStrings = strings[1].split(' comments'),
        comments = rightStrings[0];

      posts.push({
        top: true,
        position: index + 1,
        title: postTitle,
        link: postLink,
        author: author,
        points: points,
        comments: comments,
        source: source
      });
  });

  return posts;
};

var run = function(callback) {
  console.log('Requesting http://thenews.im');
  request('http://thenews.im', function(err, resp, body) {
    if (err) callback(err);

    var $ = cheerio.load(body);
    var dnNews = getPosts($, 'left'),
      hnNews = getPosts($, 'right'),
      posts = dnNews.concat(hnNews);

    resetTopPosts(function(err) {
      if(err) callback(err);

      createOrUpdatePosts(posts, function(err, posts) {
        if(err) callback(err);
        callback();
      });
    });
  });
};

run(function(err) {
  if(err) console.log(err);
  console.log('[DONE] running cron');
  process.exit();
});