import { createPostCard } from "/modules/createPostCard.js";

async function handlePostSubmit(createPostForm, postContentInput, postMediaInput, postFailMsg, feedContainer) {
    postFailMsg.hidden = true;
    //get values from post content
    const content = postContentInput.value.trim();
    if (!content) {
        postFailMsg.innerText = 'Post cannot be empty.';
        postFailMsg.hidden = false;
        return;
    }

    const media = postMediaInput.files[0];


    // build formData object
    const postFormData = new FormData();
    postFormData.append('content', content);
    if (media) {
        postFormData.append('media', media);
    }

    createPostForm.querySelector('button').disabled = true; //disable post it button during upload, prevent spamming 
    try {
        //send POST request to /api/posts/create with form data
        const response = await fetch('/api/posts/create', {
            //use authorization header to include JWT from localStorage
            method: 'POST',
            credentials: 'include',
            body: postFormData,
        });
        //on success call createPostCard(newPost) and prepend it to feed
        if (response.ok) {
            const newPost = await response.json();
            const card = createPostCard(newPost);
            feedContainer.prepend(card);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            createPostForm.reset();
        } else {
            //on fail unhide <p id="postFailMsg">
            postFailMsg.innerText = 'Failed to create post.';
            postFailMsg.hidden = false;
        }

        createPostForm.querySelector('button').disabled = false;

    } catch (error) {
        postFailMsg.innerText = 'Network Error';
        postFailMsg.hidden = false;
        console.error('Error submitting post:', error)
        createPostForm.querySelector('button').disabled = false;
    }
};
export { handlePostSubmit };
