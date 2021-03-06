console.log("Hello World!");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = 'http://meower.robotlegs.ca:5000/mews';

loadingElement.style.display = '';

listAllMews();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdMew => {
            form.reset();
            setTimeout(() => {
                form.style.display = '';
            }, 30 * 1000);
            listAllMews();

        });
});

function listAllMews() {
    mewsElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(mews => {
            mews.reverse();
            mews.forEach(mew => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = mew.name;

                const contents = document.createElement('p');
                contents.textContent = mew.content;

                const date = document.createElement('small');
                const d = new Date(mew.created);
                const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                date.textContent = d.toLocaleDateString(undefined, options);
                date.textContent += ' @ ' + d.toLocaleTimeString('en-US');


                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                div.className = 'mew';

                mewsElement.appendChild(div);
            });
            loadingElement.style.display = 'none';
        });
}