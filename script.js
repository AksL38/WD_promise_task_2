fetch('https://restcountries.eu/rest/v2/all')
    .then((resp) => {
        return resp.json();
    })
    .then((resp) => {
        let container = createDomElement('div', document.body, '', [['class', 'container pt-4']]);
        let row = createDomElement('div', container, '', [['class', 'row']]);
        populateCards(resp, row);

    })
    .catch((err) => {
        console.log(err);
    })

function createDomElement(elemType, parent, content = '', attributes = []) {
    let elem = document.createElement(elemType);
    attributes.forEach((value) => {
        elem.setAttribute(value[0], value[1]);
    });
    elem.textContent = content;
    parent.append(elem);
    return elem;
}

function populateCards(resp, row) {
    resp.forEach((value) => {
        let col = createDomElement('div', row, '', [['class', 'col-lg-4 card p-2'], ['style', 'background:#073b6b; margin-collapse:collapse; margin-radius:0%']]);
        let cardHeader = createDomElement('div', col, value.name, [['class', 'card-header'], ['style', 'text-align:center; background:black; color:white']]);
        let cardBody = createDomElement('div', col, '', [['class', 'card-body'], ['style', 'text-align:center; background:linear-gradient(to right, #a3a6ad, #494a4d); color:white']]);
        let flag = createDomElement('img', cardBody, '', [['src', value.flag], ['class', 'card-img-top']]);
        let text1 = 'Capital: ' + value.capital;
        let text2 = 'Region: ' + value.region;
        let text3 = 'Country code: ' + value.alpha3Code;
        let cardText1 = createDomElement('p', cardBody, text1, [['class', 'card-text']]);
        let cardText2 = createDomElement('p', cardBody, text2, [['class', 'card-text']]);
        let cardText3 = createDomElement('p', cardBody, text3, [['class', 'card-text']]);
        let button = createDomElement('button', cardBody, 'Click for weather', [['class', 'btn btn-primary']])
        button.onclick = () => {
            getWeather(value, cardBody);
        }
    });
}

function getWeather(value, cardBody) {
    let lat = value.latlng[0];
    let lon = value.latlng[1];
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=bf6c25bab5eda1c62a09470943ce4c50&units=metric';
    fetch(url)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            let text1 = 'Temperature: ' + data.main.temp;
            let text2 = 'Maximum temperature: ' + data.main.temp_max;
            let text3 = 'Minimum temperature ' + data.main.temp_min;
            let text4 = 'Humidity: ' + data.main.humidity;
            let text5 = 'Feels like: ' + data.main.feels_like;
            alert(text1 + '\n' + text2 + '\n' + text3 + '\n' + text4 + '\n' + text5)
        })
        .catch((err) => console.log(err))
}
