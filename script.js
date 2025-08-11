let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));

            let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Contact form submission to Google Sheets
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const status = document.getElementById('status');
    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        subject: this.subject.value,
        message: this.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbxXaj_na-rjyUkRUB2w44I7T70PoNRujYsnJws38OPWMUqRCQY-U8RkrqZ4KJ9X3hwm/exec", {
        method: "POST",
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.result === "success") {
            status.textContent = "✅ Message sent successfully!";
            status.className = "success show";
            this.reset();
        } else {
            status.textContent = "❌ Error sending message.";
            status.className = "error show";
        }
    })
    .catch(err => {
        console.error(err);
        status.textContent = "⚠️ Network error.";
        status.className = "error show";
    });

    setTimeout(() => {
        status.className = "";
    }, 4000);
});
