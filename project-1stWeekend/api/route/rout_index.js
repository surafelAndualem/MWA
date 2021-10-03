
const express=require("express");
//const { model } = require("mongoose");
const books=require("../controller/books_controller.js");
const router=express.Router();

router.route("/book").get(books.getAllBooks).post(books.addNewBooks)
router.route("/book/:bid").get(books.getOneBook).delete(books.deleteBook).put(books.updateBook)
router.route("/book/:bid/authors").get(books.getAuthorsForBook).post(books.addAuthor)
router.route("/book/:bid/authors/:aid").get(books.getAuthorById).delete(books.deleteAuthor).put(books.updatAuthor)


module.exports=router;