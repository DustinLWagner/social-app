import { getComments } from "/modules/getComments.js";
import { createCommentCard } from "/modules/createCommentCard.js";
import { createCommentForm } from "/modules/createCommentForm.js"
import { handleCommentSubmit } from "/modules/handleCommentSubmit.js";
import { createPostCard } from "/modules/createPostCard.js";

//call modal
async function commentsModal(commentBtn, post) {
    const commentsContainer = document.getElementById('commentsContainer');
    const viewComments = document.getElementById('viewComments');

    //commentsContainer comment button logic
    commentBtn.addEventListener('click', async (e) => {


        //get comments 
        const comments = await getComments(post.id);

        //if no comments append message
        if (!comments.length) {
            let noCom = document.createElement('p')
            noCom.innerText = 'No Comments';
            viewComments.append(noCom);
        }



        //clear modal
        viewComments.innerHTML = '';

        //append post card built like card in feed
        let postPrev = createPostCard(post);

        //hide buttons on post preview
        let buttons = postPrev.querySelector('.cardBttmDiv');

        buttons.style.display = 'none';


        //append postCard from createPostCard
        viewComments.append(postPrev);




        //insert create comment form into modal
        const form = createCommentForm();
        viewComments.append(form);
        const fileInput = form.querySelector(`#fileInput-${form.id}`);
        const imgPreview = form.querySelector('#imgPreview');



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
                post,
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