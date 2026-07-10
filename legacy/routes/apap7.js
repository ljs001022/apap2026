const defaultEDO = require("./modules/edo");


index = (req,res) => {
	const renderObj = defaultEDO(req);
	renderObj.page = "index";
	renderObj.category = "index";
    res.render('./apap7/index.ejs',renderObj);
}

indexPub = (req,res) => {
	const renderObj = defaultEDO(req);
	renderObj.page = "indexPub";
	renderObj.category = "index";
    res.render('./apap7/index_pub.ejs',renderObj);
}

exhibitionPub = (req,res) => {
	const renderObj = defaultEDO(req);
	renderObj.page = "exhibitionPub";
	renderObj.category = "exhibition";
    res.render('./apap7/exhibition_pub.ejs',renderObj);
}
communityPub = (req,res) => {
	const renderObj = defaultEDO(req);
	renderObj.page = "communityPub";
	renderObj.category = "community";
    res.render('./apap7/community_pub.ejs',renderObj);
}
aboutPub = (req,res) => {
	const renderObj = defaultEDO(req);
	renderObj.page = "aboutPub";
	renderObj.category = "about";
    res.render('./apap7/about_pub.ejs',renderObj);
}


module.exports={
    index
	,indexPub
	,exhibitionPub
	,communityPub
	,aboutPub
}
