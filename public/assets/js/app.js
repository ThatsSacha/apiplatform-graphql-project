$(function() {
    getPosts();
    
    function getPosts() {
        $.ajax({
            url: 'http://localhost:8000/api/graphql',
            contentType: "application/json",
            type:'POST',
            data: JSON.stringify({
                query: `query {findNotHiddenPosts { id title cover}}`
            }),
            success: function(result) {
                const posts = result.data.findNotHiddenPosts;
                
                posts.forEach(post => {
                    $('.post-container').append(`
                    <div class="card" style="width: 17rem;margin-bottom:20px">
                        <img src="${post.cover}" alt="${post.title} illustration">
                        <div data-id="${post.id}" class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <a href="javascript:;" class="report">
                                <i class="bi bi-flag"></i>
                                Report
                            </a>
                        </div>
                    </div>
                    `);
                });
            },
            error: function(error) {
                console.log('error', error);
            }
        });
    }

    $('main').on('click', '.report', function() {
        console.log('clicked on ', $(this).parent().attr('data-id'));
        const modal = new bootstrap.Modal($('.modal'));
        modal.show();
    });
})