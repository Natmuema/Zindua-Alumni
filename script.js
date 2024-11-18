
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

/*Sign-In Function*/
document.querySelector(".sign-in-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

 if (!username || !password) {
  alert("Both fields are required. Please enter your username and password.");
  return;
 }

 try {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    //Login successful
    alert(`Welcome back, ${user.username}!`);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    //Login failed
    alert("Invalid username or password. Please try again.")
  }
 } catch (error) {
  console.error("Error during login:",error);
  alert("An error occured while trying to log in. Please try again later.");
 }
});

/*Sign-Up Function*/
document.querySelector(".sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form submitted!");

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (!username || !email || !password || !confirmPassword) {
    alert("All fields are required. Please fill them out");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
  }

  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  const userExists = users.some(
    (user) => user.username === username || user.email === email
  );

  if (userExists) {
    alert("Username or email is already in use. Please try a different one.");
    return;
  }

  //Submit the new user to the database
  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username,
      email,
      password
    }),
  });

  alert("Sign-up successful! You can now log in.");
  window.location.href = "signin.html";
});

//Helper function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.getElementById('application-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent actual form submission
  alert('Form submitted successfully!');
});


/*jobs*/
const jobs = [
  {
    title: "Software Engineer",
    image: "images/undraw_programmer_re_owql.svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
  {
    title: "Data Science",
    image: "images/undraw_mobile_application_re_13u3.svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
  {
    title: "Artificial Intelligence",
    image: "images/undraw_artificial_intelligence_re_enpp.svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
  {
    title: "Scrum Master",
    image: "images/undraw_hacker_mind_-6-y85.svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
  {
    title: "Cyber Security",
    image: "images/undraw_bug_fixing_oc-7-a.svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
  {
    title: "Product Management",
    image: "images/undraw_wordpress_utxt.svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
  {
    title: "Data Analytics",
    image: "images/undraw_search_app_oso2 (1).svg",
    details: "Responsible for designing, developing and maintaining software systems and applications.",
    openPositions: "6",
    link: "#",
  },
];

const jobsHeading = document.querySelector(".jobs-list-container h2");
const jobsContainer = document.querySelector(".jobs-list-container .jobs");

if (jobs.length == 1){
  jobsHeading.innerHTML = `${jobs.length} Job`;
}else {
  jobsHeading.innerHTML = `${jobs.length} Jobs`;
}

const createJobListingCards = () => {
  jobs.forEach((job) => {
    let jobCard = document.createElement("div");
    jobCard.classList.add("job");

    let image = document.createElement("img");
    image.src = job.image;

    let title = document.createElement("h3");
    title.innerHTML = job.title;
    title.classList.add("job-title");

    let details = document.createElement("div");
    details.innerHTML = job.details;
    details.classList.add("details");

    let detailsBtn = document.createElement("a");
    detailsBtn.href = job.link;
    detailsBtn.innerHTML = "More Details";
    detailsBtn.classList.add("details-btn");

    let openPositions = document.createElement("span");
    openPositions.classList.add("open-positions");

    if (job.openPositions == 1){
      openPositions.innerHTML = `${job.openPositions} open position`;
    } else {
      openPositions.innerHTML = `${job.openPositions} open positions`;
    }

    jobCard.appendChild(image);
    jobCard.appendChild(title);
    jobCard.appendChild(details);
    jobCard.appendChild(detailsBtn);
    jobCard.appendChild(openPositions);

    jobsContainer.appendChild(jobCard);
  });
};

createJobListingCards();
