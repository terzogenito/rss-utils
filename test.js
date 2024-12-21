const app = require('./index');

app.getRSS('https://rss.nytimes.com/services/xml/rss/nyt/World.xml', data => {
	console.log(data);
});

app.getRSS('test-rss.xml', data => {
	console.log(app.getTag(data, 'rss'));
});

app.getChannel('test-rss.xml', data => {
	console.log(data);
	console.log(app.getItems(data));
	console.log(app.getList(data));
});

app.getFeed('test-rss.xml', data => {
	console.log(data);
});

app.getFeed('https://rss.nytimes.com/services/xml/rss/nyt/World.xml', data => {
	console.log(data);
});
