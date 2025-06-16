import { createCommentCard } from "/modules/createCommentCard.js";

async function handleCommentSubmit({ postId, commentContent, fileInput, statusMsg, viewComments, imgPreview, form }) {
    statusMsg.hidden = true;
    //get values from comment content
    const content = commentContent.value.trim();
    if (!content) {
        statusMsg.innerText = 'Comment cannot be empty.';
        statusMsg.hidden = false;
        return;
    }

    const media = fileInput.files[0];

    // build formData object
    const commentFormData = new FormData();
    commentFormData.append('content', content);
    commentFormData.append('postId', postId);
    commentFormData.append('media', media);

    // if (media) {
    //     commentFormData.append('media', media);
    // }

    form.querySelector('button').disabled = true; //disable button during upload, prevent spamming 
    try {
        //send POST request to /api/comments/create with form data
        const response = await fetch('/api/comments', {
            //use authorization header to include JWT from localStorage
            method: 'POST',
            body: commentFormData,
        });
        //on success call createCommentCard
        if (response.ok) {
            const newComment = await response.json();
            const card = createCommentCard(newComment);
            // insert new comment just below comment form and on top of comments list
            viewComments.insertBefore(card, form.nextSibling);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            form.reset();
            //clear input and image selection
            fileInput.value = ''; //reset input
            imgPreview.src = ''; //clear image preview
        } else {
            //on fail unhide statusMsg
            statusMsg.innerText = 'Failed to create comment.';
            statusMsg.hidden = false;
        }

        form.querySelector('button').disabled = false;


        console.log('fileInput.files[0]', fileInput.files[0]);



    } catch (error) {
        statusMsg.innerText = 'Network Error';
        statusMsg.hidden = false;
        console.error('Error submitting comment:', error)
        form.querySelector('button').disabled = false;
    }
};
export { handleCommentSubmit };
