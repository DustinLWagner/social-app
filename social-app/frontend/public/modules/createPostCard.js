import { injectCommentCount } from "/modules/injectCommentCount.js"
import { injectLikeCount } from "/modules/injectLikeCount.js";
import { commentsModal } from "/modules/commentsModal.js";
import { toggleLike } from "/modules/likesModule.js";

/// load feed helper loop function///

//helper function loops through array, renders each post into DOM
function createPostCard(post) {
    //create div
    const divCard = document.createElement('div');
    divCard.className = 'postCard';
    divCard.dataset.postId = post.id;

    //username links to profile page
    const username = document.createElement('h3');
    username.className = 'postcardUsername';
    username.innerHTML = `<a href="/pages/profile.html?userId=${post.author.id}"> ${post.author.username} </a>`;
    divCard.append(username);

    //create add post content
    const content = document.createElement('p');
    content.className = 'cardContent';
    content.innerText = post.content;
    divCard.append(content);

    //check if post.mediaUrl exists and is not empty
    if (post.mediaUrl && post.mediaUrl.trim()) {
        //if yes create img element, set src to mediaUrl, give class postMedia
        const postMedia = document.createElement('img');
        postMedia.className = 'postMedia';
        postMedia.src = post.mediaUrl;
        divCard.append(postMedia);
    }
    //create line break after media
    const lineBreak = document.createElement('br');
    divCard.append(lineBreak);

    ////////////////////////bottom div of post card for interaction butons//////////////////////////////

    const cardBttmDiv = divCard.appendChild(document.createElement('div'));
    cardBttmDiv.className = 'cardBttmDiv';

    //like button

    const likeBtn = document.createElement('button');
    likeBtn.className = 'cardBtns likeBtn';
    likeBtn.dataset.postId = post.id;
    likeBtn.dataset.targetType = 'post';
    if (post.likedByUser) {
        //set full heart icon and mark as liked
        likeBtn.classList.add('full');
        likeBtn.dataset.isLiked = 'true';
    } else {
        //keep default empty heart
        likeBtn.dataset.isLiked = 'false';
    }
    cardBttmDiv.append(likeBtn);

    //display output from injectLikeCount next to Like button
    const likesCount = document.createElement('sub');
    likesCount.className = 'likeCounterDisplay';
    likesCount.name = 'likesCount'
    injectLikeCount(post.id, likesCount);
    likeBtn.append(likesCount);

    //update like button status
    likeBtn.addEventListener('click', async () => {
        const targetId = Number(likeBtn.dataset.postId);
        const targetType = likeBtn.dataset.targetType;
        //get current button state
        const isLiked = likeBtn.dataset.isLiked === 'true';
        //call api and wait
        try {
            const result = await toggleLike(targetId, targetType, isLiked);

            if (result.message === 'Unliked!') {
                //was liked now unlike UI state
                likeBtn.classList.remove('full');//sets the empty heart
                likeBtn.dataset.isLiked = 'false';
                const currentCount = parseInt(likesCount.innerText || '0');
                likesCount.innerText = currentCount > 1 ? currentCount - 1 : '';
            } else if (result.message === 'Liked!') {
                //was unliked now like UI state
                likeBtn.classList.add('full');//sets the full heart
                likeBtn.dataset.isLiked = 'true'
                const currentCount = parseInt(likesCount.innerText || '0');
                likesCount.innerText = currentCount + 1;
            }

            else if (result.error) {
                console.error('Error:', result.error);
            }
            //update likes counter on click
            injectLikeCount(targetId, likesCount);
        } catch (error) {
            console.error('Network error:', error);
        }
    });

    //share button
    const shareBtn = document.createElement('button');
    shareBtn.className = 'cardBtns shareBtn';
    shareBtn.dataset.postId = post.id;
    cardBttmDiv.append(shareBtn);

    //comment button
    const commentBtn = document.createElement('button');
    commentBtn.className = 'cardBtns commentBtn';
    commentBtn.dataset.postId = post.id;
    cardBttmDiv.append(commentBtn);

    //display output from injectCommentCount next to comment button
    const comCount = document.createElement('sub');
    comCount.className = 'counterDisplay';
    comCount.name = 'commentCount'
    injectCommentCount(post.id, comCount);
    commentBtn.append(comCount);

    commentsModal(commentBtn, post);

    //create formatted timestamp
    const cardTime = document.createElement('sub')
    cardTime.className = 'cardTimestamp';
    //get createdAT
    const createdAt = post.createdAt;
    //convert from string to Date object
    const date = new Date(createdAt);
    //format date into a readable string,
    //toLocaleString() method of Date instances returns date/time in users local timezone
    const cardPostDate = date.toLocaleString('en-US', {
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