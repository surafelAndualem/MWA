angular.module("bookstore").factory("bookFactory", bookFactory);

function bookFactory($http){
    return {
        oneBook:getOneBook,
        allBook:getAllBook,
        addBook:addBook,
        deleteBook:deleteBook,
        searchBook:searchBook
    }

    function getOneBook(id){
        
        return $http.get("/api/book/"+id).then(complete).catch(fail);
    }
    
    function getAllBook(offset){
        return $http.get("/api/book/?offset="+offset).then(complete).catch(fail);
        
    }

    function addBook(book){
        
        return $http.post("/api/book",book).then(complete).catch(fail);
    }

    function deleteBook(id){
        return $http.delete("/api/book/"+id).then(complete).catch(fail);
    }

    function searchBook(searc){
        return $http.get("/api/bookSer/"+searc).then(complete).catch(fail);
    }


    function complete(response){
        console.log("found book is",response.data);
        return response.data;
    }

    function fail(error){
        console.log(error);
        return error.statusText;
    }

}