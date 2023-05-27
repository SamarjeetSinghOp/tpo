const adddata = document.getElementById("adddata");

if (localStorage.getItem('jwt')) {
  adddata.style.display = 'block'
}
else {
  adddata.style.display = 'none'
}


const students = document.getElementById('students')

async function getStudentdata() {
  try {
    let response = await fetch('https://backend-livid-psi.vercel.app/api/students', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Include the JWT token in the request header
      },
    });

    const data = await response.json();
    data.forEach(function (student) {
      const i = student.placementHistory.length;

      let placementInfo = '';
      if (i > 0) {
        placementInfo = `
      <div class="placement-info">
        <h6>Placement Information</h6>
        <ul>
          <li>Company: <b>${student.placementHistory[0].company}</b></li>
          <li>CTC: <b>${student.placementHistory[0].packageOffered} LPA</b></li>
        </ul>
      </div>
    `;
      }

      students.innerHTML += `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${student.name}</h5>
        <h6 class="studdata">Student Details</h6>
        <p class="card-text">Roll No.: <b>${student.rollno}</b></p>
        <p class="card-text">Department: <b>${student.department}</b></p>
        <p class="card-text l">Passing Year: <b>${student.passingyear}</b></p>
        ${placementInfo}
      </div>
      <div>
        <button onclick="editPlacement('${student._id}')"  class="addplacement btn btn-primary">Edit</button>
        <button onclick="deleteStudent('${student._id}')" style="margin: 10px 0"  class="dlt btn btn-primary">Delete</button>
        </div>
    </div>
  `;

      const dlt = document.getElementsByClassName("dlt");
      const addplacement = document.getElementsByClassName("addplacement");

      if (!localStorage.getItem('jwt')) {
        for (let i = 0; i < dlt.length; i++) {
          dlt[i].style.display = 'none';
          addplacement[i].style.display = 'none';

        }
      }

    });

  } catch (error) {
    console.error(error);
  }
}

getStudentdata()

function editInternship(studentId) {
  window.location.href = 'intern.html?id=' + studentId;
}

function editPlacement(studentId) {
  window.location.href = 'placement.html?id=' + studentId;
}


let filterBranch = document.querySelector('.filter-Branch');
let filterYear = document.querySelector('.filter-Year');
let companyNameInput = document.querySelector('input[name="company"]');
let ctcInput = document.querySelector('input[name="CTC"]');
let productsDiv = document.getElementById('products');

async function fetchData() {
  try {
    // Get the selected values from the form
    let branch = filterBranch.value;
    let year = filterYear.value;
    let companyName = companyNameInput.value;
    let ctc = ctcInput.value;
    console.log(year);
    //   Create the API URL based on the selected values
    let apiUrl = 'https://backend-livid-psi.vercel.app/api/placements?';
    if (branch) {
      apiUrl += 'department=' + branch + '&';
    }
    if (year) {
      apiUrl += 'passingyear=' + year + '&';
    }
    if (companyName) {
      apiUrl += 'company=' + companyName + '&';
    }
    if (ctc) {
      apiUrl += 'packageOffered=' + ctc + '&';
    }
    console.log(apiUrl)
    // Fetch student data from the API using await
    let response = await fetch(apiUrl);
    let data = await response.json();

    students.innerHTML = '';

    data.forEach(function (student) {
      const i = student.placementHistory.length;

      let placementInfo = '';
      if (i > 0) {
        placementInfo = `
      <div class="placement-info">
        <h6>Placement Information:</h6>
        <ul>
          <li>Company: <b>${student.placementHistory[0].company}</b></li>
          <li>CTC: <b>${student.placementHistory[0].packageOffered} LPA</b></li>
        </ul>
      </div>
    `;
      }
      console.log(student)
      students.innerHTML += `
              <div class='card'>
                <div class="card-body">
                  <h5 class="card-title"><b>${student.name}</b></h5>
                  <p class="card-text">Roll No.: <b>${student.rollno}</b></p>
                  <p class="card-text">Department: <b>${student.department}</b></p>
                  <p class="card-text l">Passing Year: <b>${student.passingyear}</b></p>
                  ${placementInfo}
                </div>
                <div>
        <button onclick="editPlacement('${student._id}')"  class="addplacement btn btn-primary">Edit</button>
        <button onclick="deleteStudent('${student._id}')" style="margin: 10px 0"  class="dlt btn btn-primary">Delete</button>
      </div>
              </div>
            `;
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


// Add event listeners to the form elements
// filterBranch.addEventListener('change', fetchData);
// filterYear.addEventListener('change', fetchData);
// companyNameInput.addEventListener('input', fetchData);
// ctcInput.addEventListener('input', fetchData);

const btn = document.getElementById('filterbtn');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  fetchData()
})


async function deleteStudent(studentId) {
  const confirmed = confirm("Are you sure you want to delete this student?");
  if (!confirmed) {
    return;
  }

  try {
    let response = await fetch(`https://backend-livid-psi.vercel.app/api/students/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });

    if (response.ok) {
      // Student deleted successfully
      alert("Student deleted successfully.");
      // Refresh the student list
      fetchData();
    } else {
      // Failed to delete student
      alert("Failed to delete student.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred while deleting the student.");
  }
}









