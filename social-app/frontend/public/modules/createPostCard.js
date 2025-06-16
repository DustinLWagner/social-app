/// load feed helper loop function///

//helper function loops through array, renders each post into DOM
function createPostCard(post) {
    //create div
    let divCard = document.createElement('div');
    divCard.className = 'postCard';
    divCard.dataset.postId = post.id;

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

    ////////////////////////bottom div of post card for interaction butons//////////////////////////////

    let cardBttmDiv = divCard.appendChild(document.createElement('div'));
    cardBttmDiv.className = 'cardBttmDiv';

    //like button
    let likeBtn = document.createElement('button');
    likeBtn.className = 'cardBtns likeBtn';
    likeBtn.dataset.postId = post.id;
    cardBttmDiv.append(likeBtn);
    //share button
    let shareBtn = document.createElement('button');
    shareBtn.className = 'cardBtns shareBtn';
    shareBtn.dataset.postId = post.id;
    cardBttmDiv.append(shareBtn);
    //comment button
    let commentBtn = document.createElement('button');
    commentBtn.className = 'cardBtns commentBtn';
    commentBtn.dataset.postId = post.id;
    cardBttmDiv.append(commentBtn);

    //create formatted timestamp
    let cardTime = document.createElement('sub')
    cardTime.className = 'cardTimestamp';
    //get createdAT
    let createdAt = post.createdAt;
    //convert from string to Date object
    let date = new Date(createdAt);
    //format date into a readable string,
    //toLocaleString() method of Date instances returns date/time in users local timezone
    let cardPostDate = date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    cardTime.innerText = cardPostDate;
    divCard.append(cardTime);

    //return back inside loadfeed() append this result to feedContainer
    return divCard;

}

export { createPostCard };