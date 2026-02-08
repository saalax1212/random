/* ==========================================================
   1. SHARED VALIDATION
   ========================================================== */
function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name.trim());
}

function isValidPassword(pass) {
    return pass.length >= 6;
}

/* ==========================================================
   2. SIGNUP LOGIC
   ========================================================== */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("regName");
        const emailInput = document.getElementById("regEmail");
        const passInput = document.getElementById("regPass");

        if (!isValidName(nameInput.value)) {
            alert("Cillad: Magaca waa inuu xarfo kaliya ahaadaa!");
            return;
        }

        if (!isValidPassword(passInput.value)) {
            alert("Cillad: Password-ku waa inuu ugu yaraan 6 xaraf ahaadaa!");
            return;
        }

        const userObj = {
            fullName: nameInput.value.trim(),
            userEmail: emailInput.value.trim(),
            userPass: passInput.value
        };

        localStorage.setItem("userAccount", JSON.stringify(userObj));
        alert("Signup waa lagu guulaystay!");
        signupForm.reset();
        window.location.href = "parking.html";
    });
}

/* ==========================================================
   3. LOGIN LOGIC
   ========================================================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("logEmail");
        const passInput = document.getElementById("logPass");
        const storedUser = JSON.parse(localStorage.getItem("userAccount"));

        if (
            storedUser &&
            storedUser.userEmail === emailInput.value.trim() &&
            storedUser.userPass === passInput.value
        ) {
            localStorage.setItem("isLoggedIn", "true");
            alert("Login guul ah! Kusoo dhawaaw " + storedUser.fullName);
            loginForm.reset();
            window.location.href = "parking.html";
        } else {
            alert("Email ama Password waa khalad!");
        }
    });
}

/* ==========================================================
   4. AUTH CHECK (PROTECT PICKER PAGE)
   ========================================================== */
const pickerForm = document.getElementById("pickerForm");

if (pickerForm) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Fadlan marka hore login samee!");
        window.location.href = "login.html";
    }
}

/* ==========================================================
   5. RANDOM NAME PICKER (ADD + SAVE)
   ========================================================== */
let namesArray = JSON.parse(localStorage.getItem("namesList")) || [];
const tableBody = document.getElementById("namesBody");

// Show saved names on load
if (tableBody) {
    namesArray.forEach((name, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${name}</td>
            </tr>`;
    });
}

// Add name
if (pickerForm) {
    pickerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("personName");

        if (!isValidName(nameInput.value)) {
            alert("Fadlan geli magac sax ah!");
            return;
        }

        namesArray.push(nameInput.value.trim());
        localStorage.setItem("namesList", JSON.stringify(namesArray));

        tableBody.innerHTML += `
            <tr>
                <td>${namesArray.length}</td>
                <td>${nameInput.value}</td>
            </tr>`;

        nameInput.value = "";
    });
}

// Pick Winner
function pickWinner() {
    if (namesArray.length === 0) {
        alert("Fadlan marka hore magacyo ku dar!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * namesArray.length);
    const winner = namesArray[randomIndex];

    document.getElementById("winnerResult").innerHTML =
        `🏆 Guulaystuhu waa: <strong>${winner}</strong> 🏆`;
}

/* ==========================================================
   6. LOGOUT
   ========================================================== */
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

/* ==========================================================
   7. CONTACT FORM
   ========================================================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const messageInput = document.getElementById("contactMessage");

        if (
            nameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            messageInput.value.trim() === ""
        ) {
            alert("Fadlan buuxi dhammaan meelaha bannaan!");
            return;
        }

        if (!isValidName(nameInput.value)) {
            alert("Magaca waa inuu xarfo kaliya ahaadaa!");
            return;
        }

        alert("Mahadsanid! Fariintaada waa la diray.");
        contactForm.reset();
        window.location.href = "index.html";
    });
}
