/// load feed helper loop function///

//helper function loops through array, renders each post into DOM
function createPostCard(post) {
    //create div
    let divCard = document.createElement('div');
    divCard.className = 'postCard';

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
    //create line break after media
    let lineBreak = document.createElement('br');
    divCard.append(lineBreak);

    //create formatted timestamp
    let cardTime = document.createElement('sub')
    cardTime.className = 'cardTimestamp';
    //get createdAT
    let createdAt = post.createdAt;
    //convert from string to Date object
    let date = new Date(createdAt);
    //format date into a readable string,
    //toLocaleString() method of Date instances returns string with representation of this date in the local timezone
    let cardPostDate = date.toLocaleString();
    cardTime.innerText = cardPostDate;
    divCard.append(cardTime);
    //return back inside loadfeed() append this result to feedContainer
    console.log()
    return divCard;

}

export { createPostCard };