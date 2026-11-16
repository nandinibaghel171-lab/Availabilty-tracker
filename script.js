
// Team members data

let team = JSON.parse(localStorage.getItem("teamData")) || [

    { id: 1, name: "Rahul Sharma", available: true },
    { id: 2, name: "Priya Singh", available: false },
    { id: 3, name: "Aman Verma", available: true },
    { id: 4, name: "Neha Gupta", available: true },
    { id: 5, name: "Rohit Kumar", available: false }

];


// Display team members

function displayTeam() {

    let teamList = document.getElementById("team-list");

    teamList.innerHTML = "";

    team.forEach(function(member) {

        let div = document.createElement("div");

        div.className = "member";

        let statusClass = member.available ? "online" : "offline";

        let statusText = member.available ? "Available" : "Unavailable";

        div.innerHTML = `
            <div class="member-info">

                <div class="avatar">
                    ${member.name.charAt(0)}
                </div>

                <div>
                    <h3>${member.name}</h3>

                    <p class="status ${statusClass}">
                        ${statusText}
                    </p>
                </div>

            </div>

            <label class="switch">

                <input type="checkbox"
                    ${member.available ? "checked" : ""}
                    onchange="toggleAvailability(${member.id})">

                <span class="slider"></span>

            </label>
        `;

        teamList.appendChild(div);

    });

    updateDashboard();

}


// Toggle availability

function toggleAvailability(id) {

    team = team.map(function(member) {

        if (member.id === id) {

            member.available = !member.available;

        }

        return member;

    });

    // Save updated data

    localStorage.setItem("teamData", JSON.stringify(team));

    // Update frontend

    displayTeam();

}


// Update dashboard counts

function updateDashboard() {

    let totalMembers = team.length;

    let availableMembers = team.filter(
        member => member.available
    ).length;

    let unavailableMembers = totalMembers - availableMembers;

    document.getElementById("total").innerText = totalMembers;

    document.getElementById("available").innerText = availableMembers;

    document.getElementById("unavailable").innerText = unavailableMembers;

}


// Initial display

displayTeam();
