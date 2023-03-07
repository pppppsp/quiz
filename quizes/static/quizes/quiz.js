console.log('hello world quiz')
const url = window.location.href;

const quizBox = document.getElementById('quiz-box');

$.ajax({
    type: 'GET',
    url: `${url}data/`,
    success: function (response){
        // console.log(response)
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)) {
                quizBox.innerHTML += `
                <hr>
                <div class = 'mb-2'>
                    <b>${question}</b>
                </div>
                `;
                answers.forEach(answer => {
                    quizBox.innerHTML += `
                        <div class = ''>
                            <input class = "ans" id = '${question}-${answer}' name = '${question}' value = '${answer}' type = 'radio'
                            <label for = "${question}">${answer} </label>
                        </div>
                    `
                })
            }
        });
    },
    error: function (error) {
         console.log(error) 
        }
});


const quizForm = document.getElementById('quiz-form'); // взяли форму с тестами
const csrf = document.getElementsByName('csrfmiddlewaretoken'); // взяли токен 




const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]; // получили варианты 
    console.log(elements)
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value // загрузили в словарь токен
    elements.forEach(el => {
        if (el.checked) {
            data[el.name] = el.value // ключ вопрос - и ответ 
        } else {
            if (!data[el.name]) { // если нет вопроса, то нулл 
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}save/`, // ссылка на вьюху с сохранением
        data: data,
        success: (response) => { console.log(response) },
        error: (error) => { console.log(error) },
    })
}

quizForm.addEventListener('submit', e => {
    e.preventDefault();
    sendData()
})