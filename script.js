// ===== STORAGE LOAD =====
let users = JSON.parse(localStorage.getItem("users")) || [];
let mealCounts = JSON.parse(localStorage.getItem("mealCounts")) || { breakfast: 0, lunch: 0, dinner: 0 };
let ratings = JSON.parse(localStorage.getItem("ratings")) || [];
let chats = JSON.parse(localStorage.getItem("chats")) || [];
let menu = JSON.parse(localStorage.getItem("menu")) || { breakfast: "Not Updated", lunch: "Not Updated", dinner: "Not Updated" };

let currentUser = null;

// ===== PAGE SWITCH =====
function switchPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function showSignup() { 
    switchPage("signupPage"); 
    toggleRegNo(); 
}
function showLogin() { switchPage("loginPage"); }

function toggleRegNo() {
    let role = document.getElementById("signupRole").value;
    let regNoGroup = document.getElementById("regNoGroup");
    if (regNoGroup) {
        regNoGroup.style.display = role === "student" ? "block" : "none";
    }
}

// ===== SIGNUP =====
function signup() {
    let name = document.getElementById("signupName").value;
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let regNo = document.getElementById("signupRegNo").value;
    let role = document.getElementById("signupRole").value;

    if (!name || !username || !password || (role === 'student' && !regNo)) {
        alert("Please fill all required fields!");
        return;
    }
    
    if (role === 'student' && (!/^\d{8,10}$/.test(regNo))) {
        alert("Registration number must be 8 to 10 digits!");
        return;
    }

    users.push({ name, username, password, regNo, role, coins: 0 });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account Created Successfully!");
    showLogin();
}

// ===== LOGIN =====
function login() {
    let lUser = document.getElementById("loginUsername").value;
    let lPass = document.getElementById("loginPassword").value;

    let user = users.find(u =>
        u.username === lUser &&
        u.password === lPass
    );

    if (!user) {
        alert("Invalid Username or Password");
        return;
    }

    currentUser = user;

    if (user.role === "student") {
        switchPage("studentPage");
        document.getElementById("studentWelcome").innerText = "Welcome, " + user.name;
        document.getElementById("studentRegNo").innerText = user.regNo || "N/A";
        document.getElementById("coinCount").innerText = user.coins;
        loadMenu();
        loadStudentChats();
    }
    else {
        switchPage("cookPage");
        document.getElementById("cookWelcome").innerText = "Welcome, " + user.name;
        updateMealCounts();
        loadRatings();
        loadCookChats();
    }
}

function logout() {
    location.reload();
}

//
// ================= MEAL SYSTEM =================
//

function chooseMeal(meal) {
    mealCounts[meal]++;
    localStorage.setItem("mealCounts", JSON.stringify(mealCounts));

    currentUser.coins += 10;
    users = users.map(u => u.username === currentUser.username ? currentUser : u);
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("coinCount").innerText = currentUser.coins;

    alert(meal.charAt(0).toUpperCase() + meal.slice(1) + " meal selected! You earned 10 coins 🪙");
}

function updateMealCounts() {
    document.getElementById("countBreakfast").innerText = mealCounts.breakfast;
    document.getElementById("countLunch").innerText = mealCounts.lunch;
    document.getElementById("countDinner").innerText = mealCounts.dinner;
}

//
// ================= MENU SYSTEM =================
//

function updateMenu() {
    menu.breakfast = document.getElementById("bMenu").value || menu.breakfast;
    menu.lunch = document.getElementById("lMenu").value || menu.lunch;
    menu.dinner = document.getElementById("dMenu").value || menu.dinner;

    localStorage.setItem("menu", JSON.stringify(menu));
    alert("Menu Updated Successfully!");
}

function loadMenu() {
    document.getElementById("breakfastMenu").innerText = menu.breakfast;
    document.getElementById("lunchMenu").innerText = menu.lunch;
    document.getElementById("dinnerMenu").innerText = menu.dinner;
}

//
// ================= RATING SYSTEM =================
//

function submitRating() {
    let ratingVal = document.getElementById("rating").value;
    if (ratingVal === "" || ratingVal < 1 || ratingVal > 5) {
        alert("Please enter a rating between 1 and 5.");
        return;
    }

    ratings.push({
        student: currentUser.name,
        stars: ratingVal
    });

    localStorage.setItem("ratings", JSON.stringify(ratings));
    alert("Thank you! Rating Submitted.");
    document.getElementById("rating").value = '';
}

function loadRatings() {
    let allRatings = document.getElementById("allRatings");
    allRatings.innerHTML = "";

    if (ratings.length === 0) {
        allRatings.innerHTML = "<p>No ratings yet.</p>";
    }

    ratings.forEach(r => {
        allRatings.innerHTML += `<p><b>${r.student}</b> rated: ⭐ ${r.stars}</p>`;
    });
}

//
// ================= CHAT SYSTEM =================
//

function sendMessage() {
    let studentMessage = document.getElementById("studentMessage");
    if (studentMessage.value === "") return;

    chats.push({
        studentUsername: currentUser.username,
        studentName: currentUser.name,
        sender: "student",
        text: studentMessage.value
    });

    localStorage.setItem("chats", JSON.stringify(chats));
    studentMessage.value = "";
    loadStudentChats();
}

function loadStudentChats() {
    let studentReplies = document.getElementById("studentReplies");
    studentReplies.innerHTML = "";

    chats.forEach(chat => {
        if (chat.studentUsername === currentUser.username) {
            if (chat.sender === "student") {
                studentReplies.innerHTML += `<p><b>You:</b> ${chat.text}</p>`;
            } else {
                studentReplies.innerHTML += `<p class="cook-reply-msg"><b>Cook (${chat.studentName}):</b> ${chat.text}</p>`;
            }
        }
    });

    if (studentReplies.innerHTML === "") {
        studentReplies.innerHTML = "<p style='color:var(--text-muted)'>No messages yet.</p>";
    }
}

function loadCookChats() {
    let allMessages = document.getElementById("allMessages");
    allMessages.innerHTML = "";

    let displayedChats = false;

    chats.forEach((chat, index) => {
        displayedChats = true;
        allMessages.innerHTML += `
      <div class="reply-box">
        <p><b>${chat.studentName}</b></p>
        <p><b>${chat.sender === "student" ? "Student" : "Cook"}:</b> ${chat.text}</p>
        ${chat.sender === "student" ? `
          <div style="margin-top:10px; display:flex; gap:10px;">
            <input type="text" id="reply-${index}" placeholder="Type a reply..." style="margin-bottom:0;">
            <button class="primary-btn" style="width:auto; padding:8px 16px;" onclick="sendCookReply(${index})">Reply</button>
          </div>
        `: ""}
      </div>
    `;
    });

    if (!displayedChats) {
        allMessages.innerHTML = "<p>No messages from students.</p>";
    }
}

function sendCookReply(index) {
    let replyText = document.getElementById(`reply-${index}`).value;
    if (replyText === "") return;

    let studentUsername = chats[index].studentUsername;
    let studentName = chats[index].studentName;

    chats.push({
        studentUsername: studentUsername,
        studentName: studentName,
        sender: "cook",
        text: replyText
    });

    localStorage.setItem("chats", JSON.stringify(chats));
    loadCookChats();
}
