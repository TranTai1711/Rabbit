const express = require('express');
const NewsController = require('../../controllers/NewsController');

const router = express.Router();

// Method: GET
// Des: Get all category
// URL: /api/category
router.get('/', NewsController.getNews);

// Method: POST
// Des: add  category
// URL: /api/category/add
router.post('/add', NewsController.addNews);

// Method: DELETE
// Des: delete category
// URL: /api/category/delete/id
router.delete('/delete/:id', NewsController.deleteNews);

router.put('/edit/:id', NewsController.editNews);


module.exports = router;