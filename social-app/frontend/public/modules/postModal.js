import { handlePostSubmit } from "/modules/handlePostSubmit.js";

async function postModal() {
    const modalContainer = document.getElementById('modalContainer');
    const createPostForm = document.getElementById('createPostForm');
    const postContentInput = document.getElementById('postContent');
    const postMediaInput = document.getElementById('fileInput');
    const imgPreview = document.getElementById('imgPreview');
    const clearImg = document.getElementById('clearImg');

    //modalcontainer button logic
    document.getElementById('openPostModal').addEventListener('click', () => {
        modalContainer.style.display = 'flex';
    });
    //clicking outside modal div hides modal
    document.getElementById('modalContainer').addEventListener('click', (click) => {
        if (click.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
    //create post form//
    createPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handlePostSubmit(createPostForm, postContentInput, postMediaInput, postFailMsg, feedContainer);
    });
    // hide post fail message on input/focus
    const hidePostFailMsg = () => postFailMsg.hidden = true;

    postContentInput.addEventListener('input', hidePostFailMsg);
    postContentInput.addEventListener('focus', hidePostFailMsg);

    postMediaInput.addEventListener('change', hidePostFailMsg);
    postMediaInput.addEventListener('focus', hidePostFailMsg);

    //Image ONLY check for postMediaInput 
    postMediaInput.addEventListener('change', () => {
        const file = postMediaInput.files[0];
        if (file && !file.type.startsWith('image/')) {
            alert('Valid Image Files Only!');
            postMediaInput.value = ''; //reset input
        }
        imgPreview.src = URL.createObjectURL(file);
        imgPreview.height = 120;
    })
    //clear img input
    clearImg.addEventListener('click', () => {
        postMediaInput.value = ''; //reset input
        imgPreview.src = ''; //clear image preview
    })

}

export { postModal }