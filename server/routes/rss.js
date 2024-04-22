import RSS from 'rss';

export default defineEventHandler(event => {

  const feed = new RSS({
    title: 'Denis Starov',
    site_url: 'https://academy.chromatone.center',
    feed_url: `https://academy.chromatone.center/rss`,
  });

  const posts = [
    { title: 'Test article', path: 'https://academy.chromatone.center/test', description: 'test article to see RSS', tag_list: ['tag', 'tag2'], published_at: Date.now() }
  ]

  for (const post of posts) {
    feed.item({
      title: post.title,
      url: `${post.path}`,
      description: post.description,
      date: post.published_at,
      categories: post.tag_list,
    });
  }

  const feedString = feed.xml({ indent: true });

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);

})