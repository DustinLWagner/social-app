// import 

//and call modules


//fetch on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});

//GET posts from /api/posts/feed
async function loadFeed() {
    const response = await fetch('/api/posts/feed', {
        method: 'GET',
    });
    const posts = await response.json();

    if (!posts.length) {

        document.getElementById('emptyFeedMsg').hidden = false;
        return;
    } else {
        //call helper loop function 
    }
};

///helper loop function///

        //helper function loops through array, renders each post into DOM
        function createPostCard(post) {
            //create div and give postCard class
            
            //create h3 for username
                //set text to post.author.username 
                    //append to card

            //create add post content
                //<p> post.content</p>
                    //append
            //check if post.mediaUrl exists and is not empty
                //if yes create img element, set src to mediaUrl, give class postImage
                    //append
            //create formatted timestamp
                //small <p> or time element
                    //format post.createdAt into readable 
                        //append 
                        
            //return back inside loadfeed() append this result to feedContainer

            
        }


        //inject into the feedContainer
        document.getElementById('feedContainer')

        //render each post in a card
        //Usernamer:
        //Content: 
        //Media?
        //Timestamp