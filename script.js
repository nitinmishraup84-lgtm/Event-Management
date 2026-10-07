const events = [
    {
        id: 1,
        name: "Music Night 2026",
        category: "Music",
        date: "15 October 2026",
        location: "Delhi",
        price: 799,
        icon: "🎵"
    },
    {
        id: 2,
        name: "Tech Conference 2026",
        category: "Technology",
        date: "22 October 2026",
        location: "Noida",
        price: 999,
        icon: "💻"
    },
    {
        id: 3,
        name: "Cricket Tournament",
        category: "Sports",
        date: "5 November 2026",
        location: "Agra",
        price: 499,
        icon: "🏏"
    },
    {
        id: 4,
        name: "Cultural Festival",
        category: "Cultural",
        date: "12 November 2026",
        location: "Mainpuri",
        price: 299,
        icon: "🎭"
    },
    {
        id: 5,
        name: "DJ Night",
        category: "Music",
        date: "20 November 2026",
        location: "Gurugram",
        price: 699,
        icon: "🎧"
    },
    {
        id: 6,
        name: "Coding Hackathon",
        category: "Technology",
        date: "28 November 2026",
        location: "Delhi",
        price: 599,
        icon: "👨‍💻"
    }
];

const eventContainer = document.getElementById("eventContainer");
const search = document.getElementById("search");
const category = document.getElementById("category");

const eventSelect = document.getElementById("eventSelect");
const tickets = document.getElementById("tickets");
const totalPrice = document.getElementById("totalPrice");

const bookingForm = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");


/* Display Events */

function displayEvents(list) {

    eventContainer.innerHTML = "";

    if (list.length === 0) {
        eventContainer.innerHTML = "<p>No events found.</p>";
        return;
    }

    list.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <div class="event-image">
                ${event.icon}
            </div>

            <div class="event-info">
                <h3>${event.name}</h3>

                <p><strong>Category:</strong> ${event.category}</p>

                <p>📅 ${event.date}</p>

                <p>📍 ${event.location}</p>

                <p><strong>Price:</strong> ₹${event.price}</p>

                <button class="btn" onclick="selectEvent(${event.id})">
                    Book Now
                </button>
            </div>
        `;

        eventContainer.appendChild(card);
    });
}


/* Search and Filter */

function filterEvents() {

    const searchText = search.value.toLowerCase();

    const selectedCategory = category.value;

    const filtered = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayEvents(filtered);
}

search.addEventListener("input", filterEvents);
category.addEventListener("change", filterEvents);


/* Event Dropdown */

function loadEventOptions() {

    events.forEach(event => {

        const option = document.createElement("option");

        option.value = event.id;

        option.textContent =
            `${event.name} - ₹${event.price}`;

        eventSelect.appendChild(option);
    });
}


/* Select Event */

function selectEvent(id) {

    eventSelect.value = id;

    updatePrice();

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}


/* Calculate Price */

function updatePrice() {

    const eventId = Number(eventSelect.value);

    const quantity = Number(tickets.value);

    const selectedEvent =
        events.find(event => event.id === eventId);

    if (selectedEvent) {

        totalPrice.textContent =
            selectedEvent.price * quantity;

    } else {

        totalPrice.textContent = "0";
    }
}

eventSelect.addEventListener("change", updatePrice);
tickets.addEventListener("input", updatePrice);


/* Booking */

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const eventId = Number(eventSelect.value);

    const quantity = Number(tickets.value);

    const selectedEvent =
        events.find(event => event.id === eventId);

    if (!selectedEvent) {

        alert("Please select an event.");

        return;
    }

    const booking = {

        id: Date.now(),

        name: name,

        email: email,

        event: selectedEvent.name,

        date: selectedEvent.date,

        location: selectedEvent.location,

        tickets: quantity,

        total: selectedEvent.price * quantity
    };


    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    alert(
        "Booking successful! Your ticket has been booked."
    );

    bookingForm.reset();

    totalPrice.textContent = "0";

    displayBookings();
});


/* Display Bookings */

function displayBookings() {

    const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    bookingList.innerHTML = "";

    if (bookings.length === 0) {

        bookingList.innerHTML =
            "<p>No bookings found.</p>";

        return;
    }

    bookings.forEach(booking => {

        const div = document.createElement("div");

        div.className = "booking-card";

        div.innerHTML = `

            <h3>${booking.event}</h3>

            <p><strong>Name:</strong> ${booking.name}</p>

            <p><strong>Email:</strong> ${booking.email}</p>

            <p><strong>Date:</strong> ${booking.date}</p>

            <p><strong>Location:</strong> ${booking.location}</p>

            <p><strong>Tickets:</strong> ${booking.tickets}</p>

            <p><strong>Total Amount:</strong>
                ₹${booking.total}
            </p>

            <button
                class="delete-btn"
                onclick="deleteBooking(${booking.id})">
                Cancel Booking
            </button>

        `;

        bookingList.appendChild(div);
    });
}


/* Delete Booking */

function deleteBooking(id) {

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    bookings =
        bookings.filter(booking => booking.id !== id);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    displayBookings();
}


/* Initialize */

displayEvents(events);

loadEventOptions();

displayBookings();