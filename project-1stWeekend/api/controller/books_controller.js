const mongoose = require("mongoose")
const Book = mongoose.model("Book");

module.exports.getAllBooks = function(req,res){
    Book.find().exec(function(err,data){
        const response = {
            status:200,
            data: data
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
       console.log(data);
        res.status(response.status).json(response.data)
    })
}

module.exports.addNewBooks = function(req, resp){
    console.log("==>", req.body);
    Book.create({
        title : req.body.title, 
	    publishedYear: req.body.publishedYear,
	    catagory: req.body.catagory,
        author: req.body.author
    },
    function(err, book){
        if(err){
            console.log("error");
        }
        else{
            console.log(book);
            resp.status(201).json(book);
        }
    }
    )
}

module.exports.getOneBook = function(req,res){
    if(req.params && req.params.bid){
        const id = req.params.bid;
        Book.findById(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
                res.status(response.status).json({"message":"not correct type of id "})
                return ;
            }
            else if(!data){
                response.status = 400;
                response.data = "Book not found";
            } 
            res.status(response.status).json(response.data)
        })
    }
    
}

module.exports.deleteBook = function(req,res){
    if(req.params && req.params.bid ){
        const id = req.params.bid;
        Book.findByIdAndRemove(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Book not found";
            } 
            res.status(response.status).json(response.data)
            
        })
    }
}

module.exports.updateBook = function(req,res){
    if(req.params && req.params.bid ){
        const id = req.params.bid;
        Book.findById(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Book not found";
            } 
            if(data){
                _updateBook(req,res,data)
            } else {
                res.status(response.status).json(response.data)
            }
            
        })
    }
}

function _updateBook(req,res,book){

    book.title = req.body.title;
    book.publishedYear = req.body.publishedYear;
    book.catagory = req.body.catagory;
    book.price = req.body.price;
    book.author = req.body.author;
    
    book.save(function(err,student){
        const response = {
            status:200,
            data: student
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
        else {
            res.status(response.status).json(response.data)
        }
    })
}

module.exports.getAuthorsForBook = function(req,res){
    if(req.params && req.params.bid){
        const id = req.params.bid; 
        Book.findById(id).exec(function(err,data){
        if(err){
            res.status(500).json({"message":"this is not correct author ID "})
            return;
        }
            res.status(200).json(data.author)
        })
    }
}


module.exports.getAuthorById = function(req,res){
    if(req.params && req.params.aid){
        const aid = req.params.aid;
        const bid = req.params.bid;
        console.log("input Id",bid);
        Book.findById(bid).exec(function(err,data){
          if(err){

            res.status(404).json({"message":"not found id"})
            return;
          }
            console.log("data ",data);
            let authors = data.author;
            
            console.log("books ..", authors);
          
            let author = authors.filter(elem =>elem._id == aid);
            if(author.length==0){
                res.status(404).json({"message":"file not found"});
                return;
            }
            console.log("found  book ", author);
            res.json(author)
            
        })
    }
    
}

module.exports.deleteAuthor = function(req,res){
    if(req.params && req.params.aid && req.params.bid){
        const aid = req.params.aid;
        const bid = req.params.bid;
        console.log("input Id",bid);

        Book.findById(bid).exec(function(err,updatedBook){
            let authors = updatedBook.author;
            console.log("authors ..", authors);
           
            let updatedAuthors = authors.filter(elem =>elem._id != aid);
            updatedBook.author=updatedAuthors
            updatedBook.save(function(err,newBook){
                const response = {
                    status:200,
                    data: newBook
                }
                if(err){
                    response.status = 500;
                    response.data = err;
                    return;
                }
                else {
                    res.status(response.status).json(response.data)
                }
            })

        })
    }
    
}

module.exports.addAuthor = function(req,res){
    if(req.params && req.params.bid){
       
        const bid = req.params.bid;
        console.log("input Id",bid);
        let auth={};
        auth.name=req.body.name;
        auth.age=parseInt(req.body.age);
        console.log("authors ..", auth);
        Book.findById(bid).exec(function(err,updatedBook){
            console.log("found book ..", updatedBook);
            let authors = updatedBook.author;
            console.log("authours of found book ..", authors);
           authors.push(auth);
           updatedBook.author=authors;
           console.log("saved new book authors", updatedBook.author);
           updatedBook.save(function(err,newBook){
               console.log("saved new book", newBook);
                const response = {
                    status:200,
                    data: newBook
                }
                if(err){
                    response.status = 500;
                    response.data = err;
                    return;

                }
                else {
                    res.status(response.status).json(response.data);
                }
            })

        })
    }
    
}

module.exports.updatAuthor = function(req,res){
    if(req.params && req.params.bid && req.params.aid){
        let bid=req.params.bid;
        let authorId=req.params.aid;
        Book.findById(bid).exec(function(err,updatedBook){
            if(err){
                res.status(404).json({"message":err});
            }
            console.log("updated author",updatedBook);
            let authors = updatedBook.author;
console.log(" only autohr",authors);
        let updatAuthor= authors.filter(elem=>elem._id==authorId)[0];
console.log("filterde authors",updatAuthor);
          updatAuthor.name=req.body.name;
          updatAuthor.age=req.body.age;
          console.log("afer new  update are added",updatAuthor);
          updatedBook.save(function(err,newBook){
            console.log("saved new book", newBook);
             const response = {
                 status:200,
                 data: newBook
             }
             if(err){
                 response.status = 500;
                 response.data = err;
                 return;
             }
             else {
                 res.status(response.status).json(response.data);
             }
         })
        })


    }}