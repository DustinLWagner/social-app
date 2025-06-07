import { getComments } from "/modules/getComments.js";
import { createCommentCard } from "/modules/createCommentCard.js";

async function commentsModal(card) {
    const commentsContainer = document.getElementById('commentsContainer');
    const viewComments = document.getElementById('viewComments');

    //commentsContainer button logic
    card.addEventListener('click', async (e) => {

        //ignore modal open if button is clicked
        if (e.target.closest('.cardBtns')) return;
        //set and pass postId to the modal
        const postId = card.dataset.postId;
        //get comments 
        const comments = await getComments(postId);
        //if no comments display message
        if (!comments.length) {
            document.getElementById('viewComments').innerHTML = '<p>No Comments</p>';
        }
        //insert into modal
        //Loop through comments and create cards
        for (const comment of comments) {
            //Create the card 
            let card = createCommentCard(comment);
            //append postCard from createCommentCard
            viewComments.append(card);
            // commentsModal(card); //open comments of a comment
        };

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
        viewComments.innerHTML = '';
    }
});

export { commentsModal }