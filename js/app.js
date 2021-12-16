const todoList = document.querySelector('.todoList');
const todoBtn = document.querySelector('.todoBtn');

const inputAuthor = document.querySelector('.inputAuthor');
const inputPost = document.querySelector('.inputPost');

const base = {
    todo: [
        {
            id: 'td1',
            author: 'Виктория',
            post: 'Отредактировать статью',
            ready: false,
        },
        {
            id: 'td2',
            author: 'Виктория2',
            post: 'Отредактировать статью2',
            ready: false,
        },
    ],
    checkId(id) {
        console.log(id);
    },
    addTodo(author, post) {
        const todo = {
            id: 'td' + Date.now(),
            author,
            post,
            ready: false,
        };
        base.todo.push(todo);

        return todo;
    }
}

function createTodo(objectTodo) {
    let post = `
            <article class="post">
                <h3 class="postAuthor">${objectTodo.author}</h3>
                <p class="postTodo">${objectTodo.post}</p>
                <button class="postBtnReady" type="button" data-id="${objectTodo.id}">✔</button>
            </article>
        `;
    const li = document.createElement('li');
    li.classList.add('todoListItem');
    li.innerHTML = post;

    return li;
}

function renderTodo() {
    console.log(base.todo.length);
    for (let i = 0; i < base.todo.length; i++) {
        const li = createTodo(base.todo[i]);
        todoList.append(li);
    }
}

function checkToDo(event) {
    const btn = event.target.closest('.postBtnReady');
    if (btn) {
        const post = btn.closest('.post');
        post.classList.add('postComplete');

        btn.classList = 'postDelete';
        btn.innerHTML = "✖";
    }
}

function addTodo(event) {
    event.preventDefault();
    const author = inputAuthor.value;
    const post = inputPost.value;

    const todo = base.addTodo(author, post);
    const li = createTodo(todo);
    todoList.append(li);
    console.log(base.todo);
}

todoList.addEventListener('click', checkToDo);
todoBtn.addEventListener('click', addTodo);

renderTodo();