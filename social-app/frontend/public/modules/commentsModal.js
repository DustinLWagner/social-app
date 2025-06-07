async function commentsModal(card) {
    const commentsContainer = document.getElementById('commentsContainer');


    //commentsContainer button logic
    card.addEventListener('click', (e) => {
        //ignore modal open if button is clicked
        if (e.target.closest('.cardBtns')) return;
        //set and pass postId to the modal
        const postId = card.dataset.postId;
        //display modal
        commentsContainer.style.display = 'flex';

        console.log(postId);
    });
};
//clicking outside comments div hides modal
document.getElementById('commentsContainer').addEventListener('click', (click) => {
    if (click.target === commentsContainer) {
        commentsContainer.style.display = 'none';
    }
});

export { commentsModal }