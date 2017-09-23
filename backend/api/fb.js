const request = require('request');
const cheerio = require('cheerio');
const ObjectId = require('mongodb').ObjectId;
let db;

require('../db').then(conn=> db=conn);

let ArticlesHandler = function(req, res){
    db.collection('articles').find({}, {url: 1}).toArray((err, items) =>{
        let articles = [];
        if (items){
            for (let i = 0; i < items.length; i++){
                articles.push({
                    url: items[i].url,
                })
            }
        } else if (err){
            res.status(500);
            res.jsonp({
                articles: null,
                error: err
            });
            res.end();
        }
        res.status(200);
        res.jsonp({
            articles: articles,
            error: null
        });
        res.end();
    });
};

let DeleteDraftHandler = function(req, res){
    db.collection('drafts').findOneAndDelete({_id: ObjectId(req.body.id)}).then((_) => {
        res.sendStatus(200);
    })
};

let ApproveDraftHandler = function(req, res) {
    db.collection('drafts').findOneAndUpdate({_id: ObjectId(req.body.id)}, {$set: {isApproved: true}}).then((_) => {
        db.collection('articles').findOne({url: req.body.url}).then((item, err) => {
            if (!item){
                res.sendStatus(404);
                res.end()
            } else if (item){
                item.paragraphs[parseInt(req.body.key)] = req.body.text;
                db.collection('articles').findOneAndUpdate({url: req.body.url}, {$set: {paragraphs: item.paragraphs}}).then((_) => {
                    res.sendStatus(200);
                    res.end();
                })
            } else if (err){
                res.status(500);
                res.jsonp({
                    error: err
                });
                res.end()
            }
        });
    })
};

let DraftsHandler = function(req, res){
    db.collection('drafts').find({isApproved: false}).toArray((err, items) =>{

        let drafts = [];
        if (items){
            for (let i = 0; i < items.length; i++){
                drafts.push({
                    id: items[i]._id,
                    originalText: items[i].originalText,
                    usersText: items[i].usersText,
                    url: items[i].url,
                    index: items[i].index
                })
            }
        } else if (err){
            res.status(500);
            res.jsonp({
                drafts: null,
                error: err
            });
            res.end();
        }
        res.status(200);
        res.jsonp({
            drafts: drafts,
            error: null
        });
        res.end();
    });
};

let UpdateParagraphHandler = function(req, res){
    if (req.body.usersText === '' || req.body.url === ''){
        res.status(404);
        res.end()
    }
    let paragraphDraft = {
        url: req.body.url,
        originalText: req.body.originalText,
        usersText: req.body.usersText,
        index: req.body.index,
        isApproved: false
    };
    db.collection('drafts').findOne({url: paragraphDraft.url, originText: paragraphDraft.originalText}).then((item, err) => {
        if (!item){
            db.collection('drafts').insertOne(paragraphDraft).then((ops) => {
                res.status(200);
                res.end()
            })
        } else if (item){
            res.status(204);
            res.end();
        } else if (err){
            res.status(500);
            res.jsonp({
                error: err
            });
            res.end();
        }
    });
};

let FbHandler = function(req, res){
    let queryUrl = req.query.articleURL;
    db.collection('articles').findOne({url: queryUrl}).then((item, err) => {
        if (!item){
        request.get(req.query.articleURL, (err, response) => {
            if (err) {
                res.status(500);
                res.jsonp({
                    error: err
                });
                res.end();
            } else {
                let $ = cheerio.load(response.body);
                let article = {
                    url: req.query.articleURL,
                    headline: $('h2.headline').text(),
                    paragraphs: [],
                    originalText: [],
                    usersText: [],
                    isApproved: false
                };
                $('.lab-bodytext-content p').each(function (_, item) {
                    article.paragraphs.push($(item).text())
                });
                db.collection('articles').insertOne(article).then((ops) =>{
                    if (err) {
                        console.error("Error inserting article to database", err);
                        res.status(500);
                        res.end();
                    } else {
                        res.status(200);
                        res.jsonp({
                            headline: article.headline,
                            paragraphs: article.paragraphs
                        });
                        res.end();
                    }
                });
            }
        })
    } else if (err){
        res.status(500);
        res.jsonp({
            error: err
        });
        res.end();
    } else {
        res.status(200);
        res.jsonp({
            headline: item.headline,
            paragraphs: item.paragraphs
        });
        res.end();
    }
    });
};

module.exports.FbHandler = FbHandler;
module.exports.DraftsHandler = DraftsHandler;
module.exports.ArticlesHandler = ArticlesHandler;
module.exports.DeleteDraftHandler = DeleteDraftHandler;
module.exports.ApproveDraftHandler = ApproveDraftHandler;
module.exports.UpdateParagraphHandler = UpdateParagraphHandler;