const dogBar = document.getElementById('dog-bar')
const dogDetails = document.getElementById('dog-info')
const dogipicture = document.getElementById('dogpic')
const h3 = document.querySelector('.dogName')
const btn = document.querySelector('.GoodorBad')
const dogFilterbtn = document.getElementById('good-dog-filter')
let Good = "Good Dog"
let Bad = "Bad Dog"
let off = "Filter good dogs: OFF"
let on = "Filter good dogs: ON"

function getDogs() {
  fetch('http://localhost:3000/pups#', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
    .then(res => res.json())
    .then(r => {
      r.forEach(element => {
        craeteDogBar(element)
        doSomething(element)
      });
      changeType(r)
      dogFilter(r)
    })
}
getDogs()

function craeteDogBar(a) {
  let dogSpan = document.createElement('button')
  dogBar.appendChild(dogSpan)
  dogSpan.innerHTML = a.name
  dogSpan.value = a.name
}

function doSomething(e) {
  dogBar.addEventListener('click', (a) => {
    if (e.name === a.target.value) {
      dogipicture.src = e.image
      h3.innerHTML = e.name
      btn.innerHTML = (e.isGoodDog === true ? Good : Bad)
      btn.value = e.id
      btn.name = e.isGoodDog
    }
  });
}

function dogFilter(dog) {
  dogFilterbtn.addEventListener('click', (a) => {
    dogBar.innerHTML = ""
    dogFilterbtn.innerHTML = (dogFilterbtn.innerHTML === on ? off : on)
    if (dogFilterbtn.innerHTML === off) {
      dog.forEach(function (n) {
        if (n.isGoodDog === false) {
          craeteDogBar(n);
        }

      })
    } else {
      dog.forEach(function (m) {
        if (m.isGoodDog === true) {
          craeteDogBar(m);
        }
      })
    }
  })
}

function changeType(x) {
  btn.addEventListener('click', (a) => {
    a.target.innerHTML = (a.target.innerHTML === Good ? Bad : Good)
    changeDog(a)
  })
}

function changeDog(a) {
  console.log(a.target.name);
  let data = ((a.target.name === "true") ? { isGoodDog: false } : { isGoodDog: true })
  console.log(data);

  let ID = a.target.value

  fetch(`http://localhost:3000/pups/${ID}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(json => console.log(json))
}