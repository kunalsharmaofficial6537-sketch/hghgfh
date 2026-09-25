// ===============================
// SKYWINGS - COMPLETE BOOKING SYSTEM
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  // -------------------------------
  // MOBILE MENU
  // -------------------------------
  if (menuBtn && navLinks) {
    const menuIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      if (menuIcon) {
        menuIcon.className = navLinks.classList.contains("open")
          ? "ri-close-line"
          : "ri-menu-line";
      }
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");

        if (menuIcon) {
          menuIcon.className = "ri-menu-line";
        }
      }
    });
  }

  // -------------------------------
  // STORAGE
  // -------------------------------
  const STORAGE_KEY = "skywings_tickets";

  function getTickets() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveTickets(tickets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }

  // -------------------------------
  // CREATE BOOKING MODAL
  // -------------------------------
  const bookingModal = document.createElement("div");

  bookingModal.id = "bookingModal";
  bookingModal.className = "custom-modal";

  bookingModal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="booking-box">
      <button class="modal-close" id="closeBooking">
        <i class="ri-close-line"></i>
      </button>

      <div class="booking-heading">
        <span class="booking-icon">
          <i class="ri-flight-takeoff-line"></i>
        </span>

        <div>
          <h2>Book Your Trip</h2>
          <p>Fill in your travel details</p>
        </div>
      </div>

      <form id="bookingForm">

        <div class="form-row">

          <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              id="bookingName"
              placeholder="Enter your name"
              required
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              id="bookingEmail"
              placeholder="Enter your email"
              required
            />
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              id="bookingPhone"
              placeholder="Enter phone number"
              maxlength="10"
              required
            />
          </div>

          <div class="form-group">
            <label>Destination</label>
            <select id="bookingDestination" required>
              <option value="">Select destination</option>
              <option value="New York City, USA">New York City, USA</option>
              <option value="Paris, France">Paris, France</option>
              <option value="Bali, Indonesia">Bali, Indonesia</option>
              <option value="Dubai, UAE">Dubai, UAE</option>
              <option value="London, UK">London, UK</option>
              <option value="Tokyo, Japan">Tokyo, Japan</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Maldives">Maldives</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">
            <label>Travel Date</label>
            <input
              type="date"
              id="bookingDate"
              required
            />
          </div>

          <div class="form-group">
            <label>Number of Travelers</label>
            <input
              type="number"
              id="bookingTravelers"
              min="1"
              max="20"
              value="1"
              required
            />
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">
            <label>Trip Type</label>
            <select id="bookingType" required>
              <option value="">Select type</option>
              <option value="Round Trip">Round Trip</option>
              <option value="One Way">One Way</option>
              <option value="Tour Package">Tour Package</option>
            </select>
          </div>

          <div class="form-group">
            <label>Class</label>
            <select id="bookingClass" required>
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>

        </div>

        <div class="form-group">
          <label>Special Request</label>
          <textarea
            id="bookingMessage"
            placeholder="Any special request..."
            rows="3"
          ></textarea>
        </div>

        <button type="submit" class="booking-submit">
          <i class="ri-check-line"></i>
          Confirm Booking
        </button>

      </form>
    </div>
  `;

  document.body.appendChild(bookingModal);

  // -------------------------------
  // DASHBOARD MODAL
  // -------------------------------
  const dashboardModal = document.createElement("div");

  dashboardModal.id = "dashboardModal";
  dashboardModal.className = "custom-modal";

  dashboardModal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="dashboard-box">

      <button class="modal-close" id="closeDashboard">
        <i class="ri-close-line"></i>
      </button>

      <div class="dashboard-header">

        <div>
          <span class="dashboard-small">MY TRAVEL</span>
          <h2>Booking Dashboard</h2>
          <p>Manage all your booked trips from here.</p>
        </div>

        <button class="dashboard-book-btn" id="dashboardBookBtn">
          <i class="ri-add-line"></i>
          Book New Trip
        </button>

      </div>

      <div class="dashboard-stats">

        <div class="dashboard-stat">
          <span>
            <i class="ri-ticket-2-line"></i>
          </span>

          <div>
            <strong id="totalTickets">0</strong>
            <small>Total Tickets</small>
          </div>
        </div>

        <div class="dashboard-stat">
          <span>
            <i class="ri-checkbox-circle-line"></i>
          </span>

          <div>
            <strong id="deliveredTickets">0</strong>
            <small>Delivered</small>
          </div>
        </div>

        <div class="dashboard-stat">
          <span>
            <i class="ri-time-line"></i>
          </span>

          <div>
            <strong id="pendingTickets">0</strong>
            <small>Not Delivered</small>
          </div>
        </div>

      </div>

      <div id="ticketsContainer"></div>

    </div>
  `;

  document.body.appendChild(dashboardModal);

  // -------------------------------
  // TICKET FILE MODAL
  // -------------------------------
  const ticketModal = document.createElement("div");

  ticketModal.id = "ticketModal";
  ticketModal.className = "custom-modal";

  ticketModal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="ticket-file-box">

      <button class="modal-close" id="closeTicket">
        <i class="ri-close-line"></i>
      </button>

      <div id="ticketFileContent"></div>

      <button class="close-ticket-file" id="closeTicketFile">
        <i class="ri-close-circle-line"></i>
        Close Ticket File
      </button>

    </div>
  `;

  document.body.appendChild(ticketModal);

  // -------------------------------
  // ELEMENTS & CONTROLS
  // -------------------------------
  const bookingForm = document.getElementById("bookingForm");
  const dashboardBtn = document.getElementById("dashboardBtn");

  const closeBooking = document.getElementById("closeBooking");
  const closeDashboard = document.getElementById("closeDashboard");
  const closeTicket = document.getElementById("closeTicket");
  const closeTicketFile = document.getElementById("closeTicketFile");

  // -------------------------------
  // OPEN / CLOSE MODALS
  // -------------------------------
  function openBooking(destination = "") {
    bookingModal.classList.add("show");
    document.body.classList.add("modal-open");

    const destinationSelect = document.getElementById("bookingDestination");

    if (destination) {
      const optionExists = [...destinationSelect.options].some(
        option => option.value === destination
      );

      if (optionExists) {
        destinationSelect.value = destination;
      }
    }

    setTimeout(() => {
      document.getElementById("bookingName").focus();
    }, 100);
  }

  function closeBookingModal() {
    bookingModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  function openDashboard() {
    dashboardModal.classList.add("show");
    document.body.classList.add("modal-open");
    renderDashboard();
  }

  function closeDashboardModal() {
    dashboardModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  function closeTicketModal() {
    ticketModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  closeBooking.addEventListener("click", closeBookingModal);
  closeDashboard.addEventListener("click", closeDashboardModal);
  closeTicket.addEventListener("click", closeTicketModal);
  closeTicketFile.addEventListener("click", closeTicketModal);

  bookingModal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeBookingModal);

  dashboardModal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeDashboardModal);

  ticketModal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeTicketModal);

  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", openDashboard);
  }

  // -------------------------------
  // CONNECT ALL BOOK BUTTONS
  // -------------------------------
  document.querySelectorAll("button").forEach(button => {
    const text = button.textContent.trim().toLowerCase();

    if (
      text.includes("book trip") ||
      text.includes("book a trip") ||
      text.includes("book a flight")
    ) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        openBooking();
      });
    }
  });

  // NAV LINK TRIGGER
  document.querySelectorAll(".nav__links a").forEach(link => {
    const text = link.textContent.trim().toLowerCase();

    if (text.includes("book trip")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openBooking();
      });
    }
  });

  // CARD BUTTON INJECTION
  document.querySelectorAll(".destination__card").forEach(card => {
    if (card.querySelector(".destination-book-btn")) return;

    const details = card.querySelector(".destination__card__details");
    if (!details) return;

    const destinationElement = details.querySelector("p");
    if (!destinationElement) return;

    const destination = destinationElement.textContent.trim();

    const bookButton = document.createElement("button");
    bookButton.className = "destination-book-btn";
    bookButton.innerHTML = `
      Book Now
      <i class="ri-arrow-right-line"></i>
    `;

    bookButton.addEventListener("click", () => {
      openBooking(destination);
    });

    card.appendChild(bookButton);
  });

  // -------------------------------
  // FORM SUBMISSION & VALIDATION
  // -------------------------------
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const destination = document.getElementById("bookingDestination").value;
    const date = document.getElementById("bookingDate").value;
    const travelers = document.getElementById("bookingTravelers").value;
    const type = document.getElementById("bookingType").value;
    const travelClass = document.getElementById("bookingClass").value;
    const message = document.getElementById("bookingMessage").value.trim();

    if (
      !name ||
      !email ||
      !phone ||
      !destination ||
      !date ||
      !travelers ||
      !type
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const ticketId = "SW" + Date.now().toString().slice(-8);

    const ticket = {
      id: ticketId,
      name,
      email,
      phone,
      destination,
      date,
      travelers: Number(travelers),
      type,
      travelClass,
      message,
      status: "Not Delivered",
      bookedAt: new Date().toISOString()
    };

    const tickets = getTickets();
    tickets.unshift(ticket);
    saveTickets(tickets);

    bookingForm.reset();
    document.getElementById("bookingTravelers").value = 1;

    closeBookingModal();

    setTimeout(() => {
      alert("Booking Successful! 🎉\n\nYour Ticket ID is: " + ticketId);
      openDashboard();
    }, 200);
  });

  // -------------------------------
  // DASHBOARD RENDERER
  // -------------------------------
  document
    .getElementById("dashboardBookBtn")
    .addEventListener("click", () => {
      closeDashboardModal();
      setTimeout(() => {
        openBooking();
      }, 200);
    });

  function renderDashboard() {
    const tickets = getTickets();

    const container = document.getElementById("ticketsContainer");
    const total = document.getElementById("totalTickets");
    const delivered = document.getElementById("deliveredTickets");
    const pending = document.getElementById("pendingTickets");

    total.textContent = tickets.length;
    delivered.textContent = tickets.filter(
      ticket => ticket.status === "Delivered"
    ).length;
    pending.textContent = tickets.filter(
      ticket => ticket.status === "Not Delivered"
    ).length;

    if (tickets.length === 0) {
      container.innerHTML = `
        <div class="empty-dashboard">
          <div class="empty-icon">
            <i class="ri-ticket-2-line"></i>
          </div>
          <h3>No Bookings Yet</h3>
          <p>Book your first trip and your ticket will appear here.</p>
          <button class="empty-book-btn" id="emptyBookBtn">
            <i class="ri-flight-takeoff-line"></i>
            Book Your First Trip
          </button>
        </div>
      `;

      document
        .getElementById("emptyBookBtn")
        .addEventListener("click", () => {
          closeDashboardModal();
          setTimeout(() => {
            openBooking();
          }, 200);
        });

      return;
    }

    container.innerHTML = `
      <div class="tickets-title">
        <h3>Your Tickets</h3>
        <span>${tickets.length} booking(s)</span>
      </div>

      <div class="tickets-list">
        ${tickets
          .map(ticket => {
            const safeName = escapeHTML(ticket.name);
            const safeDestination = escapeHTML(ticket.destination);

            const statusClass =
              ticket.status === "Delivered" ? "delivered" : "pending";

            return `
            <div class="ticket-card">

              <div class="ticket-top">
                <div class="ticket-airline">
                  <div class="ticket-logo">
                    <i class="ri-flight-takeoff-line"></i>
                  </div>
                  <div>
                    <strong>SKYWINGS</strong>
                    <small>Travel Ticket</small>
                  </div>
                </div>

                <span class="ticket-status ${statusClass}">
                  ${ticket.status}
                </span>
              </div>

              <div class="ticket-route">
                <div>
                  <small>DESTINATION</small>
                  <strong>${safeDestination}</strong>
                </div>

                <div class="route-line">
                  <i class="ri-plane-line"></i>
                </div>

                <div>
                  <small>TRAVEL DATE</small>
                  <strong>${formatDate(ticket.date)}</strong>
                </div>
              </div>

              <div class="ticket-info">
                <div>
                  <small>PASSENGER</small>
                  <strong>${safeName}</strong>
                </div>

                <div>
                  <small>TRAVELERS</small>
                  <strong>${ticket.travelers}</strong>
                </div>

                <div>
                  <small>TYPE</small>
                  <strong>${escapeHTML(ticket.type)}</strong>
                </div>

                <div>
                  <small>TICKET ID</small>
                  <strong>${ticket.id}</strong>
                </div>
              </div>

              <div class="ticket-actions">
                <button
                  class="view-ticket-btn"
                  data-id="${ticket.id}"
                >
                  <i class="ri-file-text-line"></i>
                  View Ticket
                </button>

                <button
                  class="status-ticket-btn"
                  data-id="${ticket.id}"
                >
                  <i class="ri-refresh-line"></i>
                  ${
                    ticket.status === "Delivered"
                      ? "Mark Not Delivered"
                      : "Mark Delivered"
                  }
                </button>

                <button
                  class="delete-ticket-btn"
                  data-id="${ticket.id}"
                >
                  <i class="ri-delete-bin-line"></i>
                  Delete
                </button>
              </div>

            </div>
          `;
          })
          .join("")}
      </div>
    `;

    // DELEGATION / EVENT ATTACHMENTS
    container.querySelectorAll(".view-ticket-btn").forEach(button => {
      button.addEventListener("click", () => {
        openTicketFile(button.dataset.id);
      });
    });

    container.querySelectorAll(".status-ticket-btn").forEach(button => {
      button.addEventListener("click", () => {
        toggleTicketStatus(button.dataset.id);
      });
    });

    container.querySelectorAll(".delete-ticket-btn").forEach(button => {
      button.addEventListener("click", () => {
        deleteTicket(button.dataset.id);
      });
    });
  }

  // -------------------------------
  // TICKET STATUS MUTATION
  // -------------------------------
  function toggleTicketStatus(id) {
    const tickets = getTickets();
    const ticket = tickets.find(item => item.id === id);

    if (!ticket) return;

    ticket.status =
      ticket.status === "Delivered" ? "Not Delivered" : "Delivered";

    saveTickets(tickets);
    renderDashboard();
  }

  // -------------------------------
  // TICKET REMOVAL
  // -------------------------------
  function deleteTicket(id) {
    const tickets = getTickets();
    const ticket = tickets.find(item => item.id === id);

    if (!ticket) return;

    const confirmDelete = confirm(`Are you sure you want to delete ticket ${ticket.id}?`);

    if (!confirmDelete) return;

    const updatedTickets = tickets.filter(item => item.id !== id);
    saveTickets(updatedTickets);
    renderDashboard();
  }

  // -------------------------------
  // TICKET FILE MODAL VIEWER
  // -------------------------------
  function openTicketFile(id) {
    const tickets = getTickets();
    const ticket = tickets.find(item => item.id === id);

    if (!ticket) return;

    const statusClass =
      ticket.status === "Delivered" ? "delivered" : "pending";

    document.getElementById("ticketFileContent").innerHTML = `
      <div class="ticket-file">

        <div class="ticket-file-header">
          <div>
            <span class="ticket-file-brand">SKYWINGS</span>
            <h2>Travel Ticket</h2>
          </div>

          <div class="ticket-file-icon">
            <i class="ri-flight-takeoff-line"></i>
          </div>
        </div>

        <div class="ticket-file-status ${statusClass}">
          ${ticket.status}
        </div>

        <div class="big-ticket-id">
          ${ticket.id}
        </div>

        <div class="ticket-file-route">
          <div>
            <span>DESTINATION</span>
            <strong>${escapeHTML(ticket.destination)}</strong>
          </div>

          <i class="ri-plane-line"></i>

          <div>
            <span>DATE</span>
            <strong>${formatDate(ticket.date)}</strong>
          </div>
        </div>

        <div class="ticket-file-grid">
          <div>
            <span>PASSENGER</span>
            <strong>${escapeHTML(ticket.name)}</strong>
          </div>

          <div>
            <span>EMAIL</span>
            <strong>${escapeHTML(ticket.email)}</strong>
          </div>

          <div>
            <span>PHONE</span>
            <strong>${escapeHTML(ticket.phone)}</strong>
          </div>

          <div>
            <span>TRAVELERS</span>
            <strong>${ticket.travelers}</strong>
          </div>

          <div>
            <span>TRIP TYPE</span>
            <strong>${escapeHTML(ticket.type)}</strong>
          </div>

          <div>
            <span>CLASS</span>
            <strong>${escapeHTML(ticket.travelClass)}</strong>
          </div>
        </div>

        ${
          ticket.message
            ? `
              <div class="special-request">
                <span>Special Request</span>
                <p>${escapeHTML(ticket.message)}</p>
              </div>
            `
            : ""
        }

        <div class="ticket-file-footer">
          <div>
            <small>Booked On</small>
            <strong>${formatBookedDate(ticket.bookedAt)}</strong>
          </div>

          <div class="ticket-barcode">
            ${ticket.id}
          </div>
        </div>

      </div>
    `;

    ticketModal.classList.add("show");
    document.body.classList.add("modal-open");
  }

  // -------------------------------
  // FORMATTING HELPERS
  // -------------------------------
  function formatDate(date) {
    if (!date) return "-";
    const d = new Date(date + "T00:00:00");
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function formatBookedDate(date) {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  }

  // -------------------------------
  // ESCAPE KEY HANDLER
  // -------------------------------
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeBookingModal();
    closeDashboardModal();
    closeTicketModal();
  });

  // -------------------------------
  // SCROLL REVEAL INITIALIZATION
  // -------------------------------
  if (typeof ScrollReveal !== "undefined") {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });

    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal(".header__btns", {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal(".destination__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    ScrollReveal().reveal(".showcase__image img", {
      ...scrollRevealOption,
      origin: "left",
    });

    ScrollReveal().reveal(".showcase__content h4", {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal(".showcase__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal(".showcase__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal(".banner__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    ScrollReveal().reveal(".discover__card", {
      ...scrollRevealOption,
      interval: 500,
    });
  }

  // -------------------------------
  // SWIPER CAROUSEL INITIALIZATION
  // -------------------------------
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }
});