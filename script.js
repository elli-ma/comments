let comments = [];
loadComments();
document.getElementById('comment-date').valueAsDate = new Date();

let commentAdd = document.getElementById('comment-add');
let commentName = document.getElementById('comment-name');
let commentBoby = document.getElementById('comment-body');


commentAdd.addEventListener('click', AddComment);
commentName.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        AddComment();
    }
});
commentBoby.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        AddComment();
    }
});


function AddComment(event) {
    event.preventDefault();

    const form = document.querySelector('.needs-validation')
    if (!form.checkValidity()) {
        form.classList.add('was-validated')
        return;
    } else {
        form.classList.remove('was-validated')
       }
    let commentDate = document.getElementById('comment-date');
    let commentId = comments.length;

    let comment = {
        id: commentId,
        name: commentName.value,
        body: commentBoby.value,
        time: commentDate.valueAsDate,
        clock: new Date(),
        likes: 0,
        isLiked: false,

    }
    commentName.value = '';
    commentBoby.value = '';
    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += `<div class="alert alert-light" role="alert"><p class="fst-italic text-black-50 d-flex justify-content-end p-o m-0"> ${formatDate(new Date(item.time))} ${formatClock(new Date(item.clock))}</p>`;
        out += `<h5>${item.name}</h5>`;
        out += `<p>${item.body}</p>`;
        out += `<a id = "delete-comment-${item.id}" data-key="${item.id}"><i class="fa-solid fa-trash-can fa-1x pe-2"></i></a>`;
        heart = item.isLiked ? `<i class="fa-solid fa-heart fa-1x text-danger pe-1"></i>` : `<i class="fa-regular fa-heart 3-er fa-1x pe-1"></i>`;
        out += `<a id="like-comment-${item.id}" data-key="${item.id}">${heart}${item.likes}</a></div>`;
    });
    commentField.innerHTML = out;
    setButtons();
    delComment();
}

// обработка лайков

function setButtons() {
    document.querySelectorAll('[id^="like-comment-"]').forEach(x => x.onclick = function (event) {
        event.preventDefault();
        let key = event.target.parentNode.dataset.key;
        comments[key].likes += 1;
        comments[key].isLiked = true;
        saveComments();
        showComments();
    })
}

// обработка даты

function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    if (date.toDateString() === today.toDateString()) {
        return `сегодня`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `вчера`;
    } else {
        return date.toLocaleDateString("ru", options);
    }
}

function formatClock(time) {
    const options = {
        hour: 'numeric',
        minute: 'numeric',
    };
    return time.toLocaleString("ru", options);
}



//удаление

function delComment() {
    document.querySelectorAll('[id^="delete-comment-"]').forEach(x => x.onclick = function (event) {
        event.preventDefault();
        let key = Number(event.target.parentNode.dataset.key)
        comments = comments.filter(x => x.id !== key).map(x => {
            if (x.id > key) x.id -= 1
            return x;
        })

        saveComments();
        showComments();
    })
}

console.log(new Date());