import { getComments } from "/modules/getComments.js";
import { createCommentCard } from "/modules/createCommentCard.js";
import { createCommentForm } from "/modules/createCommentForm.js"
import { handleCommentSubmit } from "/modules/handleCommentSubmit.js";

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
        //clear to prevent duplicates
        viewComments.innerHTML = '';
        const form = createCommentForm();
        //insert create comment form into modal
        viewComments.append(form);
        const fileInput = form.querySelector(`#fileInput-${form.id}`);
        const imgPreview = form.querySelector('#imgPreview');

        //if no comments append message
        if (!comments.length) {
            let noCom = document.createElement('p')
            noCom.innerText = 'No Comments';
            viewComments.append(noCom);
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

        //Image ONLY check for fileInput 
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (!file) {
                imgPreview.src = '';
                return;
            }

            if (file && !file.type.startsWith('image/')) {
                alert('Valid Image Files Only!');
                fileInput.value = ''; //reset input
                imgPreview.src = '';
                return;
            }

            imgPreview.src = URL.createObjectURL(file);
            imgPreview.height = 120;
        });

        //submit comment button handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleCommentSubmit({
                postId,
                commentContent: form.querySelector('#commentContent'),
                fileInput: form.querySelector(`#fileInput-${form.id}`),
                statusMsg: form.querySelector('#statusMsg'),
                viewComments,
                imgPreview: form.querySelector('#imgPreview'),
                form
            });
        });
    });

    //clicking outside comments container hides modal
    document.getElementById('commentsContainer').addEventListener('click', (click) => {
        if (click.target === commentsContainer) {
            viewComments.innerHTML = '';
            commentsContainer.style.display = 'none';
        }
    })
};

export { commentsModal }