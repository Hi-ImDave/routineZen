module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', {
            name: `${req.user.firstName} ${req.user.lastName}`
        })
    }
}