
const form = document.getElementById('question-form');

const skillSelect = document.getElementById('skill');
const difficultyInput = document.getElementById('difficulty');
const customTopicInput = document.getElementById('customTopic');

const generateBtn = document.getElementById('generate-btn');

const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const resultState = document.getElementById('result-state');
const errorState = document.getElementById('error-state');

let lastRequest = {
    skill: 'Java',
    difficulty: 'Beginner',
    customTopic: ''
};


// DIFFICULTY SELECTION

document.querySelectorAll('.level-option').forEach(button => {

    button.addEventListener('click', () => {

        document.querySelectorAll('.level-option')
            .forEach(item => item.classList.remove('selected'));

        button.classList.add('selected');

        difficultyInput.value = button.dataset.level;

    });

});


// DISPLAY STATES

function showState(state) {

    [emptyState, loadingState, resultState, errorState]
        .forEach(el => el.classList.add('hidden'));

    state.classList.remove('hidden');

}


// CLEAN AI RESPONSE

function cleanText(value) {

    return value
        .replace(/\r/g, '')
        .replace(/^\s*```(?:text|markdown)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();

}


// PARSE AI RESPONSE

function parseSections(raw) {

    const text = cleanText(raw);

    const patterns = [

        /(?:^|\n)\s*(?:1[\).:-]?\s*)?(?:\*\*)?(?:interview question|question)(?:\*\*)?\s*[:\-]?\s*/i,

        /(?:^|\n)\s*(?:2[\).:-]?\s*)?(?:\*\*)?(?:expected answer|answer|sample answer)(?:\*\*)?\s*[:\-]?\s*/i,

        /(?:^|\n)\s*(?:3[\).:-]?\s*)?(?:\*\*)?(?:follow[- ]?up question|follow up)(?:\*\*)?\s*[:\-]?\s*/i

    ];

    const matches = patterns.map(regex => {

        const match = regex.exec(text);

        return match
            ? { index: match.index, end: match.index + match[0].length }
            : null;

    });

    if (matches.every(Boolean)) {

        return matches.map((match, i) =>

            text.slice(
                match.end,
                i < 2 ? matches[i + 1].index : text.length
            )
            .trim()
            .replace(/\n{3,}/g, '\n\n')

        );

    }

    return [
        text,
        'The model returned an unstructured response. Review the full generated content above.',
        'Ask the AI to explain this topic with a practical example.'
    ];

}


// GENERATE INTERVIEW QUESTION

async function generateQuestion() {

    lastRequest = {

        skill: skillSelect.value,

        difficulty: difficultyInput.value,

        customTopic: customTopicInput.value.trim()

    };


    // Validate custom topic length

    if (lastRequest.customTopic.length > 500) {

        alert('Please keep your custom topic within 500 characters.');

        return;

    }


    showState(loadingState);

    generateBtn.disabled = true;

    generateBtn.querySelector('span:first-child').textContent =
        'Generating…';


    try {

        const params = new URLSearchParams({

            skill: lastRequest.skill,

            difficulty: lastRequest.difficulty,

            customTopic: lastRequest.customTopic

        });


        const response = await fetch(
            `/interview/question?${params.toString()}`,
            {
                headers: {
                    'Accept': 'text/plain'
                }
            }
        );


        if (!response.ok) {

            const detail = await response.text();

            throw new Error(
                detail || `Server returned ${response.status}`
            );

        }


        const raw = await response.text();

        if (!raw.trim()) {

            throw new Error(
                'The AI returned an empty response. Please try again.'
            );

        }


        const [question, answer, followup] = parseSections(raw);


        // UPDATE RESULT

        document.getElementById('result-skill').textContent =
            lastRequest.skill.toUpperCase();

        document.getElementById('result-level').textContent =
            `${lastRequest.difficulty.toUpperCase()} LEVEL`;

        document.getElementById('question-text').textContent =
            question;

        document.getElementById('answer-text').textContent =
            answer;

        document.getElementById('followup-text').textContent =
            followup;


        showState(resultState);


    } catch (error) {

        document.getElementById('error-message').textContent =

            error.message.includes('Failed to fetch')

                ? 'Cannot reach the backend. Check Spring Boot and Ollama.'

                : error.message;

        showState(errorState);

    } finally {

        generateBtn.disabled = false;

        generateBtn.querySelector('span:first-child').textContent =
            'Generate question';

    }

}


// FORM SUBMISSION

form.addEventListener('submit', event => {

    event.preventDefault();

    generateQuestion();

});


// GENERATE ANOTHER QUESTION

document.getElementById('again-btn')
    .addEventListener('click', generateQuestion);


// RETRY AFTER ERROR

document.getElementById('retry-btn')
    .addEventListener('click', generateQuestion);


// COPY PRACTICE RESULTS

document.getElementById('copy-btn')
    .addEventListener('click', async () => {

        const content = [

            `Skill: ${lastRequest.skill}`,

            `Difficulty: ${lastRequest.difficulty}`,

            `Custom Topic: ${lastRequest.customTopic || 'Not specified'}`,

            `INTERVIEW QUESTION\n${document.getElementById('question-text').textContent}`,

            `EXPECTED ANSWER\n${document.getElementById('answer-text').textContent}`,

            `FOLLOW-UP QUESTION\n${document.getElementById('followup-text').textContent}`

        ].join('\n\n');


        const button = document.getElementById('copy-btn');


        try {

            await navigator.clipboard.writeText(content);

            button.textContent = '✓ Copied';

            setTimeout(() => {

                button.innerHTML = '▢ &nbsp; Copy practice';

            }, 1600);

        } catch {

            button.textContent = 'Copy unavailable';

        }

    });

	// ========================================
	// INTERVEXA AI - ANSWER EVALUATION
	// ========================================

	const evaluateBtn = document.getElementById('evaluate-btn');

	const candidateAnswer = document.getElementById('candidate-answer');

	const evaluationLoading = document.getElementById('evaluation-loading');

	const evaluationResult = document.getElementById('evaluation-result');

	const evaluationError = document.getElementById('evaluation-error');

	const evaluationScore = document.getElementById('evaluation-score');

	const evaluationFeedback = document.getElementById('evaluation-feedback');

	const evaluationErrorMessage = document.getElementById('evaluation-error-message');


	// EVALUATE ANSWER

	async function evaluateAnswer() {

	    const userAnswer = candidateAnswer.value.trim();

	    const question = document.getElementById('question-text').textContent;

	    const expectedAnswer = document.getElementById('answer-text').textContent;

	    if (!question.trim()) {
	        alert('Please generate an interview question first.');
	        return;
	    }

	    if (!userAnswer) {
	        alert('Please write your answer before submitting.');
	        candidateAnswer.focus();
	        return;
	    }

	    if (userAnswer.length < 10) {
	        alert('Please provide a more detailed answer for evaluation.');
	        candidateAnswer.focus();
	        return;
	    }

	    // Hide previous results

	    evaluationResult.classList.add('hidden');
	    evaluationError.classList.add('hidden');

	    evaluationLoading.classList.remove('hidden');

	    evaluateBtn.disabled = true;
	    evaluateBtn.textContent = 'Evaluating...';

	    try {

	        const response = await fetch('/interview/evaluate', {

	            method: 'POST',

	            headers: {
	                'Content-Type': 'application/json',
	                'Accept': 'text/plain'
	            },

	            body: JSON.stringify({

	                skill: skillSelect.value,

	                difficulty: difficultyInput.value,

	                question: question,

	                expectedAnswer: expectedAnswer,

	                candidateAnswer: userAnswer

	            })

	        });

	        if (!response.ok) {

	            const detail = await response.text();

	            throw new Error(
	                detail || `Server returned ${response.status}`
	            );

	        }

	        const feedback = await response.text();

	        if (!feedback.trim()) {
	            throw new Error('The AI returned an empty evaluation.');
	        }

	        // Extract score from AI response.
	        // Expected format: SCORE: 8/10

	        const scoreMatch = feedback.match(
	            /SCORE\s*:\s*(10|[0-9])\s*\/\s*10/i
	        );

	        if (scoreMatch) {

	            evaluationScore.textContent =
	                `${scoreMatch[1]}/10`;

	        } else {

	            evaluationScore.textContent = 'Evaluated';

	        }

	        // Display complete feedback

	        evaluationFeedback.textContent = feedback;

	        evaluationLoading.classList.add('hidden');

	        evaluationResult.classList.remove('hidden');

	    } catch (error) {

	        evaluationLoading.classList.add('hidden');

	        evaluationError.classList.remove('hidden');

	        evaluationErrorMessage.textContent =
	            error.message.includes('Failed to fetch')
	                ? 'Cannot connect to the evaluation API. Check that Spring Boot is running.'
	                : error.message;

	    } finally {

	        evaluateBtn.disabled = false;

	        evaluateBtn.innerHTML =
	            'Evaluate my answer <span>↗</span>';

	    }

	}


	// EVALUATE BUTTON EVENT

	if (evaluateBtn) {

	    evaluateBtn.addEventListener('click', evaluateAnswer);

	}
