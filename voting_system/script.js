
const submitVoteButton = document.getElementById('submit-vote');
const resetPollButton = document.getElementById('reset-poll');

const results = {
    JavaScript: document.getElementById('javascript-result'),
    Python: document.getElementById('python-result'),
    Java: document.getElementById('java-result'),
    CSharp: document.getElementById('csharp-result')
};

const counts = {
    JavaScript: document.getElementById('javascript-count'),
    Python: document.getElementById('python-count'),
    Java: document.getElementById('java-count'),
    CSharp: document.getElementById('csharp-count')
};


function loadResults() {
    const savedResults = JSON.parse(localStorage.getItem('pollResults'));
    if (savedResults) {
        Object.keys(savedResults).forEach(option => {
            const count = savedResults[option];
            counts[option].textContent = count;
            setResultBarWidth(option, count);
        });
    }
}


function setResultBarWidth(option, count) {
    const totalVotes = getTotalVotes();
    const percentage = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
    results[option].style.width = percentage + '%';
}


function getTotalVotes() {
    return Object.values(counts).reduce((total, countElement) => total + parseInt(countElement.textContent), 0);
}

submitVoteButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="poll"]:checked');
    if (!selectedOption) {
        alert('Please select an option.');
        return;
    }

    const option = selectedOption.value;
    const savedResults = JSON.parse(localStorage.getItem('pollResults')) || {
        JavaScript: 0,
        Python: 0,
        Java: 0,
        CSharp: 0
    };

    
    savedResults[option]++;
    localStorage.setItem('pollResults', JSON.stringify(savedResults));

    
    counts[option].textContent = savedResults[option];
    setResultBarWidth(option, savedResults[option]);
});


resetPollButton.addEventListener('click', () => {
    
    localStorage.removeItem('pollResults');
    Object.keys(counts).forEach(option => {
        counts[option].textContent = 0;
        results[option].style.width = '0%';
    });
});


loadResults();
