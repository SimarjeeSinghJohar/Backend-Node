//sorting collection on the the basis  sorting value
const sortValues = (postCollection, sortValues, sortBy, sortingDirections) => {
    const direction = "desc";
    switch (sortValues.findIndex((i) => i == sortBy)) {
        case 0:
            if (sortingDirections.includes(direction)) {
                postCollection.sort((post1, post2) => post2.id - post1.id);

            }
            else {
                postCollection.sort((post1, post2) => post1.id - post2.id);
            }
            break;
        case 1:
            if (sortingDirections.includes(direction)) {
                postCollection.sort((post1, post2) => post2.reads - post1.reads);

            }
            else {
                postCollection.sort((post1, post2) => post1.reads - post2.reads);

            }
            break;
        case 2:
            if (sortingDirections.includes(direction)) {
                postCollection.sort((post1, post2) => post2.likes - post1.likes);

            }
            else {
                postCollection.sort((post1, post2) => post1.likes - post2.likes);

            }
            break;
        case 3:
            if (sortingDirections.includes(direction)) {
                postCollection.sort((post1, post2) => post2.popularity - post1.popularity);

            }
            else {
                postCollection.sort((post1, post2) => post1.popularity - post2.popularity);

            }
            break;
    }

    return postCollection;
};

//Deduping Collection of responses

function dedupedCollection(postCollection) {

    let result = [];

    let dedupedPost = {};

    for (let i in postCollection) {

        post = postCollection[i]['id'];

        dedupedPost[post] = postCollection[i];

    }

    for (i in dedupedPost) {

        result.push(dedupedPost[i]);

    }
    return result;
}


module.exports = {
    sortValues: sortValues,
    dedupedCollection: dedupedCollection
};         