const form = document.querySelector('.form-container form');
const submitButton = document.querySelector('#button');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  const name = document.querySelector('#name').value;
  const branch = document.querySelector('#drop-down').value;
  const roll = document.querySelector('#roll').value;
  const year = document.querySelector('#year').value;
  submitForm(name, branch, roll, year);
 
});



async function submitForm(name, branch, roll, year) {
  try {
    const response = await fetch('https://backend-livid-psi.vercel.app/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, rollno: roll, department: branch, passingyear: year })
    });

    const data = await response.json();
    console.log(data);
    alert("Data added Successfully")
  } catch (error) {
    console.error(error);
  }
}



