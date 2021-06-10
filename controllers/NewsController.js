const newsModel = require('../models/models/News.model')

module.exports = {
    getNews : async(req,res,next) => {
        try {
            const news = await newsModel.find();
            res.json({news});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    addNews : async(req,res,next) => {
        const {title, description, content, author, category, images, approve, show, dateCreate} = req.body;
        // console.log(req.body);
        try {
            news = new newsModel({
                title,
                description,
                content, 
                author, 
                category, 
                images, 
                approve, 
                show, 
                dateCreate
            });
            news.save();
            res.json({news});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    deleteNews : async(req,res,next) => {
        const id = req.params.id;
        try {
            const news = await newsModel.findById(id);
            if(news) return res.status(401).json({status: "Id is invalid"})

            news =await newsModel.findByIdAndDelete(id);
            news.save();
            res.json({news, status: "success"});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    editNews: async(req,res,next) => {
        const id = req.params.id;
        const {title, description, content, author, category, images, approve, show, dateCreate} = req.body;
        try {
            const news = await newsModel.findById(id);
            if(!news) return res.status(401).json({status: "Id is invalid"})
            news.title = title;
            news.description = description;
            news.content = content;
            news.author = author;
            news.category = category;
            news.images = images;
            news.approve = approve;
            news.show = show;
            news.save();
            res.json({news, status: "Success"});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    }
}

