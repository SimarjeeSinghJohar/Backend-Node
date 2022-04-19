const express = require('express');
const middleware = require('./middleware.js');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
let errorStatus;
const PORT = 4000;

app.get('/api/ping', (req, res) => {
    let response = {
        success: true
    }
    errorStatus = 200;
    return res.status(errorStatus).send(response);
});

app.get('/api/posts', async (req, res,) => {
    let tags = req.query.tags;
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;
    const sortingValues = ["id", "reads", "likes", "popularity"];
    const sortingDirections = ["asc", "desc"];
    const url = 'https://api.hatchways.io/assessment/blog/posts'
    let postCollection = [];
    let responseObject;
    let Response;

    //Setting default order for direction
    if (!direction) {
        direction = 'asc';
    }

    let errorValidation = validations(res, tags, sortingValues, sortBy, sortingDirections, direction);
    if(errorValidation){
        return res.status(errorValidation.errorStatus).json({error: errorValidation.errorMessage});
    }
    const listTags = tags.split(",");
    await Promise.all(
        listTags.map(async (tag) => {
            const params = `?tag=${tag}`;
            const current_hatchways_url = url + params;
            const settings = { "method": "GET", }
            Response = await fetch(current_hatchways_url, settings)
            .then(res => res.json())
            .catch(err => console.log(err));
            postCollection.push(...Response.posts);
        })
    );


    //Deduping post collection 

    let dedupeCollection = middleware.dedupedCollection(postCollection);

    //Sorting post collection  

    postCollection = middleware.sortValues(dedupeCollection, sortingValues, sortBy, direction);

    responseObject = { posts: postCollection };

    errorStatus = 200;
    return res.status(errorStatus).json(responseObject);
});

//Validate URL parameters
function validations(res, tags, sortingValues, sortBy, sortingDirections, direction) {

    let errorTags = validateTags(res, tags);
    if(errorTags){
        return errorTags;
    }

   let errorSortBy = validateSortBy(res, sortingValues, sortBy, sortingDirections, direction);

   if(errorSortBy){
       return errorSortBy;
   }
}

function validateTags(res, tags) {

    if (!tags) {
        let errorResponse = { errorMessage: "Tags parameter is required",
        errorStatus : 400};
        return errorResponse;
    }
}

function validateSortBy(res, sortingValues, sortBy, sortingDirections, direction) {

    if ((!sortingValues.find((sortingValue) => sortingValue === sortBy) || !sortingDirections.find((sortingDirection) => sortingDirection === direction))) {
        let errorResponse = { errorMessage: "sortBy parameter is invalid" , 
        errorStatus: 400};
        return errorResponse;
    }

}

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
    
})

module.exports = app
