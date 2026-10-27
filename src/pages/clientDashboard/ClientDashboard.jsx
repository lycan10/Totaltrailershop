
import React, { useState } from "react";
import "./clientdashboard.css";
import logo from "../../assets/mainlogo/mainlogo.webp";

const appointments = [
    {
        id: 1,
        service: "Trailer Brake Inspection",
        type: "Trailer Service",
        date: "Oct 29, 2026",
        time: "10:00 AM",
        status: "Confirmed",
        icon: "⚙",
        progressStep: 0,
        repairNote: "Your appointment is confirmed. We look forward to seeing you."
      },
      {
        id: 2,
        service: "Truck Accessory Installation",
        type: "Truck Service",
        date: "Nov 12, 2026",
        time: "1:30 PM",
        status: "Pending",
        icon: "🔧",
        progressStep: 0,
        repairNote: "Your appointment is awaiting confirmation."
      },
      {
        id: 3,
        service: "Trailer Bearing Service",
        type: "Trailer Service",
        date: "Sep 18, 2026",
        time: "9:00 AM",
        status: "Completed",
        icon: "🛠",
        progressStep: 5,
        repairNote: "Your service has been completed successfully."
      }
];

function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const upcoming = appointments.filter((a) =>
    ["Confirmed", "Pending"].includes(a.status)
  );

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  );

  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming") {
      return ["Confirmed", "Pending"].includes(a.status);
    }
    return a.status === activeTab;
  });

  const nextAppointment = upcoming[0];

  const bookAppointment = () => {
    window.location.href = "/book-appointment";
  };

  const viewAppointment = (id) => {
    window.location.href = `/appointments/${id}`;
  };

  const navigateToContact = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/contact";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      window.location.href = newUrl;
    }
  };
  const navigateToService = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/services";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      window.location.href = newUrl;
    }
  };

  return (
    <div className="tt-dashboard">
      {/* Top navigation */}
      <header className="tt-header">
        <a href="/" className="tt-brand">
          <div className="tt-logo">
            <img src={logo} alt="" />
        
          </div>
        </a>

        <nav className="tt-header-nav">
          <a href="/" className="tt-nav-link">
            Back to website
          </a>
          {/* <a href="/book-appointment" className="tt-nav-link">
            Our Services
          </a>
          <a href="/appointments" className="tt-nav-link">
            Appointments
          </a> */}
        </nav>

        <div className="tt-header-account">
          <div className="tt-avatar">JD</div>

          <div className="tt-account-info">
            <strong>John Doe</strong>
            <span>My Account</span>
          </div>

        </div>
      </header>

      <main className="tt-main">
        {/* Welcome section */}
        <section className="tt-welcome">
          <div>
            <div className="tt-welcome-label">
              <span className="tt-live-dot" />
              CUSTOMER PORTAL
            </div>

            <h1>
              Good to see you, <span>John.</span>
            </h1>

            <p>
              Your vehicles deserve the best. Manage your service
              appointments right here.
            </p>
          </div>

          <button
            className="tt-book-button"
            onClick={bookAppointment}
          >
            <span>+</span>
            Book an Appointment
          </button>
        </section>

        {/* Overview statistics */}
        <section className="tt-stats">
          <div className="tt-stat-card">
            <div className="tt-stat-icon tt-icon-dark">▦</div>
            <div className="tt-stat-content">
              <span>Total Appointments</span>
              <strong>12</strong>
              <small>All-time bookings</small>
            </div>
          </div>

          <div className="tt-stat-card">
            <div className="tt-stat-icon tt-icon-blue">◷</div>
            <div className="tt-stat-content">
              <span>Upcoming</span>
              <strong>{upcoming.length}</strong>
              <small>Awaiting your visit</small>
            </div>
          </div>

          <div className="tt-stat-card">
            <div className="tt-stat-icon tt-icon-green">✓</div>
            <div className="tt-stat-content">
              <span>Completed</span>
              <strong>10</strong>
              <small>Services completed</small>
            </div>
          </div>

          <div className="tt-stat-card tt-stat-help">
            <div className="tt-help-icon">i</div>
            <div className="tt-stat-content">
              <span>Need assistance?</span>
              <strong className="tt-help-title">
                We're here to help.
              </strong>
              <a href="/contact" onClick={navigateToContact}>Contact our team →</a>
            </div>
          </div>
        </section>

        {/* Main dashboard grid */}
        <div className="tt-dashboard-grid">
          {/* Featured appointment */}
          <section className="tt-featured">
            <div className="tt-featured-top">
              <span className="tt-featured-label">
                <span className="tt-featured-dot" />
                YOUR NEXT APPOINTMENT
              </span>

              <span className="tt-featured-number">01</span>
            </div>

            {nextAppointment ? (
              <>
                <div className="tt-featured-service-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 4v5m0 6v5M4 12h5m6 0h5" />
                  </svg>
                </div>

                <h2>{nextAppointment.service}</h2>

                <p className="tt-featured-description">
                  Professional service to keep your trailer
                  safe, reliable, and road-ready.
                </p>

                <div className="tt-featured-details">
                  <div>
                    <span className="tt-detail-icon">▦</span>
                    <div>
                      <small>DATE</small>
                      <strong>{nextAppointment.date}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="tt-detail-icon">◷</span>
                    <div>
                      <small>TIME</small>
                      <strong>{nextAppointment.time}</strong>
                    </div>
                  </div>
                </div>

                <div className="tt-featured-bottom">
                  <span className="tt-confirmed">
                    <span>✓</span> {nextAppointment.status}
                  </span>

                  <button
                    onClick={() =>
                      viewAppointment(nextAppointment.id)
                    }
                    className="tt-view-button"
                  >
                    View Details <span>→</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="tt-no-next">
                <h2>No upcoming appointments</h2>
                <p>Ready for your next service?</p>
                <button
                  className="tt-view-button"
                  onClick={bookAppointment}
                >
                  Book a Service →
                </button>
              </div>
            )}

            <div className="tt-featured-decoration">
              <div className="tt-decoration-ring ring-one" />
              <div className="tt-decoration-ring ring-two" />
              <div className="tt-decoration-ring ring-three" />
            </div>
          </section>

          {/* Appointment list */}
          <section className="tt-appointments">
            <div className="tt-section-heading">
              <div>
                <span className="tt-section-eyebrow">
                  YOUR ACTIVITY
                </span>
                <h2>Appointments</h2>
                <p>Track your bookings and service history.</p>
              </div>

              <a href="/appointments" className="tt-see-all">
                View all <span>→</span>
              </a>
            </div>

            <div className="tt-tabs">
              {["All", "Upcoming", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tt-tab ${
                    activeTab === tab ? "tt-tab-active" : ""
                  }`}
                >
                  {tab}
                  {tab === "Upcoming" && (
                    <span className="tt-tab-count">
                      {upcoming.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="tt-appointment-list">
              {filteredAppointments.map((appointment) => (
                <article
                  className="tt-appointment-row"
                  key={appointment.id}
                >
                  <div className="tt-service-icon">
                    {appointment.icon}
                  </div>

                  <div className="tt-service-info">
                    <strong>{appointment.service}</strong>
                    <span>{appointment.type}</span>
                    <small>
                      {appointment.date} · {appointment.time}
                    </small>
                  </div>

                  <div className="tt-row-right">
                    <span
                      className={`tt-status tt-status-${appointment.status.toLowerCase()}`}
                    >
                      <i />
                      {appointment.status}
                    </span>

                   
<button
  className="tt-row-arrow"
  aria-label={`View repair status for ${appointment.service}`}
  onClick={() => setSelectedAppointment(appointment)}
>
  →
</button>
                  </div>
                </article>
              ))}

              {filteredAppointments.length === 0 && (
                <div className="tt-empty">
                  <span>▦</span>
                  <strong>No appointments to display</strong>
                  <p>Book a service to get started.</p>
                  <button onClick={bookAppointment}>
                    Book an Appointment
                  </button>
                </div>
              )}
            </div>

            <div className="tt-appointment-footer">
              <span>
                Showing {filteredAppointments.length} appointment
                {filteredAppointments.length !== 1 ? "s" : ""}
              </span>
              <a href="/appointments">Manage bookings →</a>
            </div>
          </section>
        </div>

        {/* Bottom service banner */}
        <section className="tt-bottom-banner">
          <div className="tt-banner-mark">TT</div>

          <div className="tt-banner-copy">
            <strong>Keeping you road-ready.</strong>
            <p>
              From trailer repairs to truck accessories, we've got
              your next job covered.
            </p>
          </div>

          <a href="/book-appointment" className="tt-banner-link" onClick={navigateToService}>
            Explore Our Services <span>↗</span>
          </a>
        </section>

        <footer className="tt-footer">
          <span>© 2026 Total Trailer & Truck</span>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
          <span>Rochester Hills, Michigan</span>
        </footer>
      </main>

{selectedAppointment && (
  <div
    className="tt-modal-overlay"
    onClick={() => setSelectedAppointment(null)}
  >
    <section
      className="tt-status-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tt-modal-title"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="tt-modal-header">
        <div>
          <span className="tt-modal-eyebrow">
            APPOINTMENT #{selectedAppointment.id}
          </span>
          <h2 id="tt-modal-title">Repair Status</h2>
          <p>Track the progress of your service.</p>
        </div>

        <button
          className="tt-modal-close"
          aria-label="Close repair status"
          onClick={() => setSelectedAppointment(null)}
        >
          ×
        </button>
      </div>

      <div className="tt-modal-service">
        <div className="tt-modal-service-icon">
          {selectedAppointment.icon}
        </div>

        <div>
          <strong>{selectedAppointment.service}</strong>
          <span>{selectedAppointment.type}</span>
          <small>
            {selectedAppointment.date} · {selectedAppointment.time}
          </small>
        </div>
      </div>

      <div className="tt-repair-current">
        <span className="tt-repair-current-label">
          CURRENT STATUS
        </span>

        <span
          className={`tt-status tt-status-${selectedAppointment.status.toLowerCase()}`}
        >
          <i />
          {selectedAppointment.status}
        </span>

        <p>{selectedAppointment.repairNote}</p>
      </div>

      <div className="tt-repair-current">
        <strong >
          Technician Diagnosis
        </strong>

        <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit tempus class montes molestie, a venenatis elementum ornare lobortis. Tempus sollicitudin lobortis dapibus class rhoncus cras sem et a magna, ac vivamus ligula orci pharetra praesent gravida curae porttitor sodales, non euismod proin viverra leo dignissim cursus vel interdum. Eu ultricies aliquam duis etiam cursus rutrum habitant aenean natoque, tempus a congue ullamcorper sed proin placerat mi orci, pharetra eros tellus interdum scelerisque gravida justo mattis.</p>
        
      </div>

      {(() => {
        const stages = [
          {
            title: "Appointment Booked",
            description: "Your service request has been received.",
          },
          {
            title: "Checked In",
            description: "Your vehicle has arrived at our shop.",
          },
          {
            title: "Diagnosis & Inspection",
            description: "Our technicians are inspecting your vehicle.",
          },
          {
            title: "Awaiting parts/ Awaiting Approval",
            description: "We are checking the completed work.",
          },
          {
            title: "Repair In Progress",
            description: "Our team is working on your repair.",
          },
         
          {
            title: "Awaiting Pickup",
            description: "Your vehicle is ready to get back on the road.",
          },
          {
            title: "Completed",
            description: "We are checking the completed work.",
          },
        ];

        const currentStep = Math.max(
          0,
          Math.min(
            selectedAppointment.progressStep ?? 0,
            stages.length - 1
          )
        );

        return (
          <div className="tt-repair-timeline">
            <div className="tt-timeline-heading">
              <h3>Repair Progress</h3>
              <span>
                {currentStep + 1} of {stages.length} stages
              </span>
            </div>

            <div className="tt-timeline-track">
              {stages.map((stage, index) => {
                const isComplete = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    className={`tt-timeline-step ${
                      isComplete ? "is-complete" : ""
                    } ${isCurrent ? "is-current" : ""}`}
                    key={stage.title}
                  >
                    <div className="tt-timeline-marker">
                      {isComplete ? "✓" : index + 1}
                    </div>

                    <div className="tt-timeline-copy">
                      <strong>{stage.title}</strong>
                      <p>{stage.description}</p>

                      {isCurrent && (
                        <span className="tt-timeline-current-label">
                          {selectedAppointment.status === "Completed"
                            ? "Completed"
                            : selectedAppointment.status === "Pending"
                              ? "Awaiting confirmation"
                              : index === 0
                                ? "Appointment confirmed"
                                : "Current stage"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      <div className="tt-modal-footer">
        <p>
          Questions about your repair? Our team is here to help.
        </p>

        <a href="/contact" className="tt-modal-contact" onClick={navigateToContact}>
          Contact Us →
        </a>
      </div>
    </section>
  </div>
)}
    </div>
  );
}

export default ClientDashboard;