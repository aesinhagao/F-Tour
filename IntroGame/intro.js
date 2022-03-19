var currentCategory = ['history', 'language', 'nature', 'technology'];
var Questions = [
    // store answer with questions for easier retrieval
    { category: 'history', question: 'FPT University was established on September 8, 2006 right?', answer: true },
    { category: 'history', question: 'FPT University is located at Land Hoa Lac, Km29 Highway 08, Thach Hoa, Thach That, Hanoi 10000 right?', answer: true },
    { category: 'history', question: 'The first rector of FPT University was Dr. Nguyen Khac Thanh right?', answer: false },


    { category: 'history', question: "It's easy to get a girlfriend at FPT school?", answer: false },
    { category: 'history', question: 'The Alpha building has a dragon shape, right?', answer: true },
    { category: 'history', question: 'Does FPT University have a frog mascot?', answer: false },


    { category: 'language', question: 'Does FPT University have to take the English entrance exam or have ielts 6.0?', answer: true },
    { category: 'nature', question: ' FPT University has a typical shirt color of red?', answer: false },


    { category: 'technology', question: ' Does FPT University have a major in IoT (Internet of Things)?', answer: true },
    { category: 'history', question: ' Is the current rector of FPT University Dr. Bui Quang Ngoc?', answer: false },

];

// when declared over here other functions will see it; it's not best practice to register them in global/window scope, but better than nothing ;)
var count = 0;
var points = 0;
var category;
var question;

//show answer buttons only after clicking start button
function showButtons() {
    document.getElementById('answerT').style.display = "";
    document.getElementById('answerF').style.display = "";
}

// choose a category and a question
function catAndQuest() {
    ++count;
    start.style.display = 'none';
    sound.style.display = 'none';
    showButtons();
    document.getElementById('points').innerHTML = 'Scores: ' + (points);
    if (count > 10) {
        document.getElementById('count').innerHTML = 'Question ' + (count - 1) + ' \/ 10';
    } else {
        document.getElementById('count').innerHTML = 'Question ' + (count) + ' \/ 10';
        currentCategory = Questions.map(function(question) {
            return question.category;
        });
        category = currentCategory[Math.floor(Math.random() * currentCategory.length)];
        document.getElementById('category').innerHTML = 'Category: ' + (category);

        var questionList = Questions.filter(function(question) {
            return question.category === category;
        });
        question = questionList[Math.floor(Math.random() * questionList.length)];
        document.getElementById('quest').innerHTML = question.question;
    }
    // document.getElementById('count').innerHTML = 'Question ' + (++count) + ' \/ 10';




}

// create a copy of Questions array
var copy = [].concat(Questions);

// delete used question out of the copy array
function deleteUsed() {
    if (Questions.length > 0) {
        Questions.splice(Questions.indexOf(question), 1);
    } else {
        document.getElementById('answerT').style.display = "none";
        document.getElementById('answerF').style.display = "none";
        document.getElementById('questions').style.display = "none";
        document.getElementById('looser').style.display = "";
        document.getElementById('reset').style.display = "";
        document.getElementById('exit').style.display = "";
    }
}

//user answered question
function answer(value) {
    deleteUsed();
    if (value === question.answer) {
        points++;
        if (points == 10) {
            document.getElementById('answerT').style.display = "none";
            document.getElementById('answerF').style.display = "none";
            document.getElementById('questions').style.display = "none";
            document.getElementById('winner').style.display = "";
            document.getElementById('exit1').style.display = "";
        } else {
            document.getElementById('looser').innerHTML = 'You get ' + points + ' points' + ',' + 'You must LEARN AGAIN!';
        }
    }
    catAndQuest();
}

function closeWin() {
    close();
}

//restart the game
function restart() {
    document.location.href = "";
}