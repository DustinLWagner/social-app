//helper function loops through array, renders each post into DOM
function createCommentCard(comment) {
    //create div
    let divCard = document.createElement('div');
    divCard.className = 'commentCard';
    divCard.dataset.commentId = comment.id;

    //username links to profile page
    let username = document.createElement('h3');
    username.className = 'commentUsername';
    username.innerHTML = `<a href="/pages/profile.html?userId=${comment.author.id}"> ${comment.author.username} </a>`;
    divCard.append(username);

    //create add post content
    let content = document.createElement('p');
    content.className = 'cardContent';
    content.innerText = comment.content;
    divCard.append(content);

    //check if comment.mediaUrl exists and is not empty
    if (comment.mediaUrl && comment.mediaUrl.trim()) {
        //if yes create img element, set src to mediaUrl, give class commentMedia
        let commentMedia = document.createElement('img');
        commentMedia.className = 'commentMedia';
        commentMedia.src = comment.mediaUrl;
        divCard.append(commentMedia);
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
    likeBtn.dataset.commentId = comment.id;
    cardBttmDiv.append(likeBtn);
    //share button
    let shareBtn = document.createElement('button');
    shareBtn.className = 'cardBtns shareBtn';
    shareBtn.dataset.commentId = comment.id;
    cardBttmDiv.append(shareBtn);
    //comment button
    let commentBtn = document.createElement('button');
    commentBtn.className = 'cardBtns commentBtn';
    commentBtn.dataset.commentId = comment.id;
    cardBttmDiv.append(commentBtn);

    //create formatted timestamp
    let cardTime = document.createElement('sub')
    cardTime.className = 'cardTimestamp';
    //get createdAT
    let createdAt = comment.createdAt;
    //convert from string to Date object
    let date = new Date(createdAt);
    //format date into a readable string,
    //toLocaleString() method of Date instances returns date/time in users local timezone
    let cardCommentDate = date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    cardTime.innerText = cardCommentDate;
    divCard.append(cardTime);

    //return back inside loadfeed() append this result to feedContainer
    return divCard;

}

export { createCommentCard }