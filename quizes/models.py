from django.db import models
import random
DIFF_CHOICES = {
    ('Легкий', 'Легкий'),
    ('Средний', 'Средний'),
    ('Сложный', 'Сложный'),
}

class Quiz(models.Model):
    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    number_of_questions = models.IntegerField()
    time = models.IntegerField(help_text='Ограничение по времени.')
    required_score_to_pass = models.IntegerField(help_text='Рекомендуемый балл в %')
    difficulty = models.CharField(max_length=10, choices=DIFF_CHOICES)

    def __str__(self):
        return f"{self.name} - {self.topic}"

    def get_questions(self):
        questions = list(self.question_set.all()) # получение вопросов 
        random.shuffle(questions) # перемешать местами вопросы.
        return questions[:self.number_of_questions] # get опред колво вопросов



    class Meta:
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'



