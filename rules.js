// Nội quy Game
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrect = function(choice) {
    return this.answer === choice;
};

function Quiz(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
}
Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.checkAnswer = function(answer) {
    if (this.getCurrentQuestion().isCorrect(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};
Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

var QuizUI = {
    displayNext: function() {
        if (quiz.hasEnded()) {
            this.showResults();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
            this.displayScore();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML('question', quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;
        for (var i = 0; i < choices.length; i++) {
            var choiceId = 'choice' + i;
            var choiceText = choices[i];
            this.populateIdWithHTML(choiceId, choiceText);
            this.checkAnswerHandler(choiceId, choiceText);
        }
    },
    checkAnswerHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.checkAnswer(guess);
            QuizUI.displayNext();
        }
    },
    displayScore: function() {
        var scoreText = 'Score: ' + quiz.score;
        this.populateIdWithHTML('score', scoreText);
    },
    displayProgress: function() {
        var questionNumber = quiz.currentQuestionIndex + 1;
        var totalQuestions = quiz.questions.length;
        var progressText = 'Question ' + questionNumber + ' of ' + totalQuestions;
        this.populateIdWithHTML('progress', progressText);
    },
    showResults: function() {
        var score = quiz.score / quiz.questions.length;
        var results = '<h2>';
        if (score >= 0.8) {
            results += 'Excellent. You are good student!!!';
        } else if (score < 0.8 && score > 0.5) {
            results += 'Good...';
        } else {
            results += 'Terrible!';
        }
        results += '</h2><h3>Your score is: ' + quiz.score + '</h3>';
        results += '<button id="reset">Exit Game</button>';
        this.populateIdWithHTML('quiz', results);
        this.resetQuizHandler();
    },
    resetQuizHandler: function() {
        var resetBtn = document.getElementById('reset');
        // Reload quiz to start from beginning
        resetBtn.onclick = function() {
            window.close();
        }
    },
    populateIdWithHTML: function(id, content) {
        var element = document.getElementById(id);
        element.innerHTML = content;
    }
};

var questions = [
    new Question('What is F-Camp?', ['A course', 'A special holiday', 'A normal day', 'A day of sleeping'], 'A special holiday'),
    new Question('When is the 50% discount voucher of tuition usually distributed?', ['Early Semeter', 'Midterm Semester', 'Final Semester', 'Block 5'], 'Block 5'),
    new Question('What is the maximum percentages student can be absent?', ['20', '25', '60', '75'], '20'),
    new Question('Although you love FPT so much, What is the maximum years you have to leave this school ?', ['1', '4', '6', '7'], '7'),
    new Question('What is the tuitions in FPT per semester ?', ['1k$', '1,1k$', 'Money is not the biggest problem', '900$'], 'Money is not the biggest problem'),
    new Question("where Excellent students 's name are carved  ?", ['30m street', 'pineapple tree', 'FPT gate', 'Wall of Delta'], 'FPT gate'),
    new Question('What is the most famous page of FPT students ?', ['FU-Hòa Lạc', 'FAP', 'CMS', 'Hội săn học bổng'], 'FU-Hòa Lạc'),
    new Question('What shoud you do in FPT library ?', ['Selfie', 'Eat', 'Sleep', 'Study'], 'Study'),
    new Question('What is the discount when student lost the book of library', ["+300k", "-300k", '+500k', '-500k'], '-300k'),
    new Question('Should student cook in Dorm', ['NO', 'Of course', 'Yes because it is cheap', 'Yesssss'], 'NO')

];
var quiz = new Quiz(questions);
QuizUI.displayNext();
// End nội quy game