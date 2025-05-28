/// load feed helper loop function///

//helper function loops through array, renders each post into DOM
function createPostCard(post) {
    //create div
    let divCard = document.createElement('div');
    divCard.className = 'postCard';

    //create username h3
    // let username = document.createElement('h3');
    // username.className = 'postcardUsername';
    // username.innerText = post.author.username;
    // divCard.append(username);

    //username links to profile page
    let username = document.createElement('h3');
    username.className = 'postcardUsername';
    username.innerHTML = `<a href="/pages/profile.html?userId=${post.author.id}"> ${post.author.username} </a>`;
    divCard.append(username);

    //create add post content
    let content = document.createElement('p');
    content.className = 'cardContent';
    content.innerText = post.content;
    divCard.append(content);

    //check if post.mediaUrl exists and is not empty
    if (post.mediaUrl && post.mediaUrl.trim()) {
        //if yes create img element, set src to mediaUrl, give class postMedia
        let postMedia = document.createElement('img');
        postMedia.className = 'postMedia';
        postMedia.src = post.mediaUrl;
        divCard.append(postMedia);
    }

    //create formatted timestamp
    let cardTime = document.createElement('sub')
    cardTime.className = 'cardTimestamp';
    //get createdAT
    let createdAt = post.createdAt;
    //convert from string to Date object
    let date = new Date(createdAt);
    //format date into a readable string
    let cardPostDate = date.toDateString();
    cardTime.innerText = cardPostDate;
    divCard.append(cardTime);
    //return back inside loadfeed() append this result to feedContainer
    return divCard;

}

export { createPostCard };