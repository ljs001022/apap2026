
defaultEDO = (req)=>{
    return{
        user: req.user
        ,meta:{
            title:""
            ,keyword:""
            ,description:""
            ,image:""
        }
        // ,lng: req.params.lng
        ,category: null
        ,url:""
    }
}

module.exports = defaultEDO;