
function createCommentForm() {
    const uniqueId = `uid-${Date.now()}`;

    //< form id = "commentForm" > 
    const commentForm = document.createElement('form');
    commentForm.id = uniqueId;
    commentForm.classList.add('commentForm');

    //<textarea name="content" id="commentContent" required></textarea>
    const textArea = document.createElement('textarea');
    textArea.id = 'commentContent';
    textArea.name = 'content';
    textArea.required = true;
    commentForm.append(textArea);

    //<div id="modalButtons"></div>
    const modalButtons = document.createElement('div');
    modalButtons.id = 'modalButtons';
    commentForm.append(modalButtons);

    //<input type="file" id="fileInput" accept="image/*" hidden />
    const fileInput = document.createElement('input');
    fileInput.value = '';
    fileInput.type = 'file';
    fileInput.id = `fileInput-${uniqueId}`;
    fileInput.setAttribute('data-uid', uniqueId);
    fileInput.accept = 'image/*';
    fileInput.hidden = true;
    modalButtons.append(fileInput);

    // <label for="fileInput" class="customFileUpload">Choose file</label>
    const fileInputLabel = document.createElement('label');
    fileInputLabel.classList.add('customFileUpload');
    fileInputLabel.innerText = 'Choose File';
    fileInputLabel.setAttribute('for', `fileInput-${uniqueId}`);
    fileInputLabel.setAttribute('data-uid', uniqueId);
    modalButtons.append(fileInputLabel);

    //<button id="clearImg" type="button">Clear</button>
    const clearImg = document.createElement('button');
    clearImg.id = 'clearImg';
    clearImg.type = 'button';
    clearImg.innerText = 'Clear';
    modalButtons.append(clearImg);

    // <img id="imgPreview" src="" alt="">
    const imgPreview = document.createElement('img');
    imgPreview.id = 'imgPreview';
    imgPreview.src = '';
    imgPreview.alt = '';
    commentForm.append(imgPreview);

    // <button id="submitComment" type="submit">Submit Comment</button>
    const submitComment = document.createElement('button');
    submitComment.id = 'submitComment';
    submitComment.type = 'submit';
    submitComment.innerText = 'Submit Comment';
    commentForm.append(submitComment);

    const statusMsg = document.createElement('p');
    statusMsg.id = 'statusMsg';
    statusMsg.hidden = true;
    commentForm.append(statusMsg);

    return commentForm;
}

export { createCommentForm }          