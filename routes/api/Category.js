const express = require('express');
const CategoryController = require('../../controllers/CategoryController');

const router = express.Router();

// Method: GET
// Des: Get all category
// URL: /api/category
router.get('/', CategoryController.get);

// Method: POST
// Des: add  category
// URL: /api/category/add
router.post('/add', CategoryController.addCategory);

// Method: PUT
// Des: add sub category
// URL: /api/category/addSub/:id
router.put('/addSub/:id', CategoryController.addSubCategory);

// Method: DELETE
// Des: Delete  category
// URL: /api/category/delete/:id
router.delete('/delete/:id', CategoryController.deleteCategory);

// Method: PUT
// Des: Edit  category
// URL: /api/category/edit/:id
router.put('/edit/:id', CategoryController.editCategory);
router.put('/editsub/:id/:idSub', CategoryController.editSubCategory);


// Method: DELETE
// Des: Delete  category
// URL: /api/category/delete/:id
router.delete('/deleteSub/:id/:idSub', CategoryController.deleteSubCategory);

module.exports = router;