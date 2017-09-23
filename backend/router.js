const express = require("express");

let fb = require('./api/fb');
let router = express.Router();

// GET routes
router.get('/fb?', fb.FbHandler);
router.get('/drafts', fb.DraftsHandler);
router.get('/articles', fb.ArticlesHandler);

// POST routes
router.post('/delete', fb.DeleteDraftHandler);
router.post('/approve', fb.ApproveDraftHandler);
router.post('/update', fb.UpdateParagraphHandler);


module.exports = [router];