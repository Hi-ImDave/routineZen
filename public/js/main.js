// ROUTINES
const deleteBtn = document.querySelectorAll('.del')
const routineItem = document.querySelectorAll('.not')
const routineComplete = document.querySelectorAll('.completed')

// BOOKS
const bookDelete = document.querySelectorAll('.del-book')
const bookItem = document.querySelectorAll('.not-book')
const completedBook = document.querySelectorAll('.completed-book')
// const multiDelete = document.querySelector('.del-header')

// ROUTINES
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteRoutine)
})

Array.from(routineItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(routineComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

// multiDelete.addEventListener('dblclick', deleteMultipleRoutines)

// BOOKS
Array.from(bookDelete).forEach((el)=>{
    el.addEventListener('click', deleteBook)
})

Array.from(bookItem).forEach((el)=>{
    el.addEventListener('click', bookComplete)
})
Array.from(completedBook).forEach((el)=>{
    el.addEventListener('click', markUnread)
})

// ROUTINES

async function deleteRoutine(){
    const routineId = this.parentNode.dataset.id
    try{
        const response = await fetch('routines/deleteRoutine', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'routineIdFromJSFile': routineId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function deleteMultipleRoutines(){
    
// }


async function markComplete(){
    const routineId = this.parentNode.dataset.id
    try{
        const response = await fetch('routines/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'routineIdFromJSFile': routineId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const routineId = this.parentNode.dataset.id
    try{
        const response = await fetch('routines/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'routineIdFromJSFile': routineId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


// BOOKS

async function deleteBook(){
    const routineId = this.parentNode.dataset.id
    try{
        const response = await fetch('routines/deleteRoutine', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'routineIdFromJSFile': routineId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function bookComplete(){
    const bookId = this.parentNode.dataset.id
    try{
        const response = await fetch('books/bookComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnread(){
    const bookId = this.parentNode.dataset.id
    try{
        const response = await fetch('books/markUnread', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}