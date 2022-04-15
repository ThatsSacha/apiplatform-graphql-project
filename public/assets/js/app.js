$(function() {
    const modal = new bootstrap.Modal($('.modal'));
    const toastSuccess = new bootstrap.Toast($('.toast.success'));
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
        const dataId = $(this).parent().attr('data-id');
        modal.show();
        $('form input.post').val(dataId);
    });

    $('button.report').on('click', function() {
        const reason = $('form input.reason').val();
        const post = $('form input.post').val();

        $.ajax({
            url: 'http://localhost:8000/api/graphql',
            contentType: "application/json",
            type:'POST',
            data: JSON.stringify({
                query: `mutation { createReport(input: {reason: "${reason}", post: "${post}"}) { report { reason id post { id isHidden } }}}`
            }),
            success: function(result) {
                modal.hide();
                toastSuccess.show();
                $('form input.reason').val('');
                $('form input.post').val('');
            },
            error: function(error) {
                console.log('error', error);
            }
        });
    });

    $('form').on('submit', function(e) {
        e.preventDefault();
    });
})