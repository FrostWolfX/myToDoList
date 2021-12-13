const todoList = document.querySelector('.todoList');


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
    }
}

function createTodo(objectTodo) {
    let post = `
            <li class="todoListItem" id="">
                <article class="post">
                    <h3 class="postAuthor">${objectTodo.author}</h3>
                    <p class="postTodo">${objectTodo.post}</p>
                    <button class="postBtnReady" type="button" data-id="${objectTodo.id}">✔</button>
                </article>
            </li>
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


renderTodo();