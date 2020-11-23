
const flightEl = document.querySelectorAll('.departs');
const missed = new Date()
flightEl.forEach(function(f) {
    if(Date.parse(f.textContent) < new Date()) f.parentNode.style.color = 'red'
})

