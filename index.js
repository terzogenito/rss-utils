const fileUtils = require('@terzogenito/file-utils');

function getTag(data, tag) {
    const startTag = '<' + tag;
    const endTag = '</' + tag + '>';
    const startIndex = data.indexOf(startTag);
    if (startIndex === -1) {
        throw new Error('<' + tag + '> tag not found in the XML data.');
    }
    const startTagEndIndex = data.indexOf('>', startIndex);
    if (startTagEndIndex === -1) {
        throw new Error('Malformed <' + tag + '> tag in the XML data.');
    }
    const endIndex = data.indexOf(endTag);
    if (endIndex === -1) {
        throw new Error('</' + tag + '> tag not found in the XML data.');
    }
    return data.slice(startTagEndIndex + 1, endIndex).trim();
}

function getRSS(url, callback) {
    fileUtils.getContent(url, data => {
        callback(data);
    });
}

function getChannel(url, callback) {
    getRSS(url, data => {
        const channel = getTag(data, 'channel');
        callback(channel);
    });
}

function getItems(channel){
    return [...channel.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match => match[1].trim());
}

function getList(channel){
    const list = [];
    const items = getItems(channel);
    items.forEach(item => {
        list.push({
            title: getTag(item, 'title'),
            description: getTag(item, 'description'),
            link: getTag(item, 'link')
        });
    });
    return list;
}

function getFeed(url, callback) {
    getChannel(url, data => {
        callback(getList(data));
    });
}

module.exports = {
  getTag,
  getRSS,
  getChannel,
  getItems,
  getList,
  getFeed,
};