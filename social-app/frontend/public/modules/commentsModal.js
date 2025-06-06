async function commentsModal() {
    const commentsContainer = document.getElementById('commentsContainer');


    //commentsContainer button logic
    document.querySelectorAll('.postCard').forEach(card => {
        card.addEventListener('click', () => {
            commentsContainer.style.display = 'flex';
            const postId = card.dataset.postId;
            console.log(postId);
        });
    });
    //clicking outside comments div hides modal
    document.getElementById('commentsContainer').addEventListener('click', (click) => {
        if (click.target === commentsContainer) {
            commentsContainer.style.display = 'none';
        }
    });





}

export { commentsModal }