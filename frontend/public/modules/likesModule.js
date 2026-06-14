async function toggleLike(targetId, targetType, isLiked) {
    // if liked send DELETE via query, unlike send POST with JSON
    const endpoint = isLiked
        ? `/api/likes?targetId=${targetId}&targetType=${targetType}`
        : '/api/likes';
    const method = isLiked ? 'DELETE' : 'POST';
    // build fetch object with method and headers
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    //add JSON body for POST 
    if (method === 'POST') {
        options.body = JSON.stringify({
            targetId,
            targetType,
        });
    }
    // api request
    const response = await fetch(endpoint, options);
    //return json response 
    return response.json();
}


export { toggleLike };