const todoList = document.querySelector('.todoList');
const todoBtn = document.querySelector('.todoBtn');

const inputAuthor = document.querySelector('.inputAuthor');
const inputPost = document.querySelector('.inputPost');
const todoCount = document.querySelector('.todoCount');
const todoForm = document.querySelector('.todoForm');

const base = {
    todo: getToDoLS(),
    checkId(id) {
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === id) {
                base.todo[i].ready = true;
            }
        }
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

/**
 * 
 * @param {*} event 
 * Добавляем новые дела
 */
function addTodo(event) {
    event.preventDefault();
    const authorText = inputAuthor.value;
    const postText = inputPost.value;

    const objToDo = base.addTodo(authorText, postText);
    const todoLi = createTodo(objToDo);

    todoList.append(todoLi);

    setToDoLS();
    getToDoCount();

    todoForm.reset();
}


function createTodo(objectTodo) {
    let post = `
            <article class="post ${objectTodo.ready ? 'postComplete' : ''}">
                <h3 class="postAuthor">${objectTodo.author}</h3>
                <p class="postTodo">${objectTodo.post}</p>
                ${objectTodo.ready
                ? `<button class="postDelete"
                    data-id="${objectTodo.id}"
                    type="button"
                    >✖</button>`
                : `<button class="postBtnReady"
                    data-id="${objectTodo.id}"
                    type="button"
                    >✔</button>`
                }
            </article>
        `;
    const li = document.createElement('li');
    li.classList.add('todoListItem');
    li.innerHTML = post;

    return li;
}

function renderTodo() {
    for (let i = 0; i < base.todo.length; i++) {
        const li = createTodo(base.todo[i]);
        todoList.append(li);
        getToDoCount();
    }
}

/**
 * 
 * @param {*} event 
 * когда нажимаю на кнопку выполнить
 */
function checkToDo(event) {
    const btn = event.target.closest('.postBtnReady');
    if (btn) {
        const post = btn.closest('.post');

        btn.classList = 'postDelete';
        btn.innerHTML = "✖";

        post.classList.add('postComplete');

        const id = btn.dataset.id;
        base.checkId(id);
        setToDoLS();
    } else {
        deleteToDoItem(event);
    }
}

function getToDoCount() {
    todoCount.innerHTML = base.todo.length;
    return todoCount;
}

function deleteToDoItem(event) {
    const btn = event.target.closest('.postDelete');
    if (btn) {
        const li = event.target.closest('.todoListItem');

        const id = btn.dataset.id;
        for (let i = 0; i < base.todo.length; i++) {

            if (base.todo[i].id === id) {
                base.todo.splice(i, 1);
            }
        }
        li.remove();
        setToDoLS();
        getToDoCount();
    }
}

/**
 * прочитать из Local Storage браузера
 */
function getToDoLS() {
    if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'));
    }

    return [];
}
/**
 * запись в Local Storage браузера
 */
function setToDoLS() {
    localStorage.setItem('todo', JSON.stringify(base.todo));
}
setToDoLS();
renderTodo();

todoList.addEventListener('click', checkToDo);
todoBtn.addEventListener('click', addTodo);
