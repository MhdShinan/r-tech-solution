// Initialize phone input
const phoneInput = window.intlTelInput(document.querySelector("#phone"), {
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  separateDialCode: true,
  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("LK"));
  }
});

// Contact Form and Map Functionality
const contactForm = document.getElementById('contact-form');
const locateBtn = document.getElementById('locate-btn');
const mapContainer = document.getElementById('map-container');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!phoneInput.isValidNumber()) {
    alert('Please enter a valid phone number');
    return;
  }

  // Form Data
  const formData = {
    firstName: document.querySelector('input[type="text"]').value,
    contactNumber: phoneInput.getNumber(),
    email: document.querySelector('input[type="email"]').value,
    message: document.querySelector('textarea').value,
  };

  // Send Data to Backend
  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      alert('Form submitted successfully!');
      contactForm.reset();
    } else {
      alert('Failed to send message. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});


locateBtn.addEventListener('click', () => {
  mapContainer.classList.toggle('hidden');
  mapContainer.classList.toggle('active');
  
  if (!mapContainer.classList.contains('hidden')) {
    mapContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});



const testimonials = document.querySelectorAll('.testimonial');
const dotNavigation = document.getElementById('dotNavigation');
let activeIndex = 0;


testimonials.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot w-2 h-2 bg-gray-400 rounded-full focus:outline-none';
  dot.addEventListener('click', () => updateSlider(index));
  dotNavigation.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
  dots.forEach((dot, i) => {
    dot.style.backgroundColor = i === index ? '#005880' : '#D1D5DB'; 
  });
  activeIndex = index;
}


function autoSlide() {
  activeIndex = (activeIndex + 1) % testimonials.length;
  updateSlider(activeIndex);
}

setInterval(autoSlide, 2000);


updateSlider(activeIndex);

document.getElementById('services-button').addEventListener('click', function() {
  const dropdown = document.getElementById('services-dropdown');
  const icon = this.querySelector('i');
  
  // Toggle the visibility of the dropdown
  dropdown.classList.toggle('hidden');
  
  // Change the icon direction based on the dropdown state
  if (dropdown.classList.contains('hidden')) {
    icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
  } else {
    icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
  }
});