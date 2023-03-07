console.log('hello world quiz')
const url = window.location.href;

const quizBox = document.getElementById('quiz-box');
const scoreBox = document.getElementById('score-box');
const resultBox = document.getElementById('result-box');

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
        success: (response) => { 
            const results = response.results; // присваиваем в result
            // console.log(results)
            quizForm.classList.add('not-visible'); // убираем форму

            scoreBox.innerHTML = `${response.passed ? '<b>Прошли!</b>' : '<b>Вы не сдали!</b>'}  Ваш результат: <b>${response.score.toFixed(2)}%</b>`

            results.forEach(res=>{ // прогоняем по результатам
                const resDiv = document.createElement("div"); // 
                for (const [question, resp] of Object.entries(res)) {
                    // console.log(question);
                    // console.log(resp)
                    // console.log('***')

                    resDiv.innerHTML += question // добавление вопросов в див
                    const cls = ['container', 'p-3', 'text-light', 'h3'] // классы
                    resDiv.classList.add(...cls) 

                    if (resp == 'not answered') {  // если ответ пустой
                        resDiv.innerHTML += '- нет ответа';
                        resDiv.classList.add('bg-danger');

                    } 
                    else { // 
                        const answer = resp['answered']; // ответ пользователя
                        const correct = resp['correct_answer'] // ответ из бд

                        if (answer == correct){
                            resDiv.classList.add('bg-success');
                            resDiv.innerHTML += ` Ваш Ответ: ${answer}`
                        } else {
                            resDiv.classList.add('bg-danger');
                            resDiv.innerHTML += `| Правильный ответ: ${correct}`
                            resDiv.innerHTML += `| Ваш ответ: ${answer}`
                        }
                    }

                }
                // const body = document.getElementsByTagName('BODY')[0]
                resultBox.append(resDiv)

            })
         },
        error: (error) => { 
            
         },
    })
}

quizForm.addEventListener('submit', e => {
    e.preventDefault();
    sendData()
})