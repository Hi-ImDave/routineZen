const deleteBtn = document.querySelectorAll('.del')
const routineItem = document.querySelectorAll('.not')
const routineComplete = document.querySelectorAll('.completed')
// const multiDelete = document.querySelector('.del-header')

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