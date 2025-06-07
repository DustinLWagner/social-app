import { loadComments } from "/modules/loadComments.js";

async function commentsModal(card) {
    const commentsContainer = document.getElementById('commentsContainer');
    const viewComments = document.getElementById('viewComments');

    //commentsContainer button logic
    card.addEventListener('click', async (e) => {

        //ignore modal open if button is clicked
        if (e.target.closest('.cardBtns')) return;
        //set and pass postId to the modal
        const postId = card.dataset.postId;
        //get comments from loadComments()
        const comments = await loadComments(postId);
        //insert into modal
        viewComments.innerHTML = comments.map(comment =>
            `<div class=commentCard>
             <p><strong>${comment.author.username}</strong></p>
             <p>${comment.content}</p>
             </div>`).join('');
        //display modal
        commentsContainer.style.display = 'flex';

        console.log(postId);
        console.log(comments);
    });
};
//clicking outside comments container hides modal
document.getElementById('commentsContainer').addEventListener('click', (click) => {
    if (click.target === commentsContainer) {
        commentsContainer.style.display = 'none';
    }
});

export { commentsModal }