const CategoryModel = require('../models/models/Category.model');

module.exports = {
    get : async (req, res, next)=>{
    try {
        const category = await CategoryModel.find();
        res.json({category});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server errors");
        }
    },
    addCategory: async (req,res, next) => {
        const{categoryName} = req.body;
        try {
            let category = await CategoryModel.findOne({categoryName});
            if(category) res.status(401).json({error: "Danh muc da ton tai"});
            category =new CategoryModel({
                categoryName
            });
            category.save();
            res.json({category});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        
        }
    },
    addSubCategory: async (req,res,next) => {
        const{name} = req.body;
        const id = req.params.id;
        try {
            let category = await CategoryModel.findById(id);
            if(!category) res.status(401).json({error: "Danh muc khong ton tai"});
            console.log({category});
            category.subCategory.push({name});
            console.log({category});
            category.save();
            res.json({category});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        
        }
    },
    deleteCategory: async(req,res,next) => {
        const id = req.params.id;
        try {
            let category = await CategoryModel.findById(id);
            if(!category) res.status(401).json({error: "Danh muc khong ton tai"});
            category = await CategoryModel.findByIdAndDelete(id);
            category.save();
            res.json({category, status: "Success"});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    deleteSubCategory: async(req,res,next) => {
        const id = req.params.id;
        const idSub = req.params.idSub;
        try {
            let category = await CategoryModel.findById(id);
            if(!category) return res.status(401).json({error: "Danh muc khong ton tai"});
            
            category = category.subCategory.filter(item => {
                return item._id !== idSub;
            });
            category.sasve();
            res.json({category,status:"Success"});  
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    editCategory: async(req,res,next) => {
        const id = req.params.id;
        const {categoryName} = req.body;
        try {
            let category = await CategoryModel.findById(id);
            if(!category) res.status(401).json({error: "Danh muc khong ton tai"});
            category.categoryName = categoryName;
            // console.log({category})
            category.save();
            res.json({category, status: "Success"});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    editSubCategory: async(req,res,next) => {
        const id = req.params.id;
        const idSub = req.params.idSub;
        const {name} = req.body;

        try {
            const category = await CategoryModel.findById(id);
            if(!id) return res.status(401).json({error: "Id is invalid"});
            category = category.subCategory.map(item => item.push())
            console.log(category);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    }
}