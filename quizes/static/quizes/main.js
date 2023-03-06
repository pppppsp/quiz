console.log('hola')

const modalBtns = [...document.getElementsByClassName('modal-button')] // массив с кнопками
const modalBody = document.getElementById('modal-body-confirm') // тело модального окна
const startBtn = document.getElementById('start-button')


modalBtns.forEach(modalBtn=>modalBtn.addEventListener('click', ()=>{ // устанавливаем на каждую кнопку событие
    const pk = modalBtn.getAttribute('data-pk') 
    const name = modalBtn.getAttribute('data-quiz') 
    const numQuestions = modalBtn.getAttribute('data-questions') 
    const difficulty = modalBtn.getAttribute('data-difficulty') 
    const scoreToPass = modalBtn.getAttribute('data-pass') 
    const time = modalBtn.getAttribute('data-time')
    

    const url = window.location.href 
    modalBody.innerHTML = `
    <div class = "mb-3 fs-4"> Вы хотите начать тест "<b>${name}</b>?"
    <div class = "text-muted">
        <ul class = "fs-5">
            <li>Сложность: <b>${difficulty}</b></li>   
            <li>Количество вопросов: <b>${numQuestions}</b></li>   
            <li>Процентов для зачёта: <b>${scoreToPass}%</b></li>   
            <li>Время: <b>${time} минут</b></li>   
        </ul>
    </div>
    `

    startBtn.addEventListener('click', ()=>{
       window.location.href = url + pk
    })
}))

