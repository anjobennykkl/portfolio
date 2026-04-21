// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
mobileMenuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));

// Active navigation highlighting on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { 
    if (scrollY >= s.offsetTop - 200) current = s.getAttribute('id'); 
  });
  navLinks.forEach(l => { 
    l.classList.remove('active'); 
    if (l.getAttribute('href').slice(1) === current) l.classList.add('active'); 
  });
});

// Smooth scroll navigation
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById(link.getAttribute('href').slice(1)).scrollIntoView({behavior:'smooth'});
    sidebar.classList.remove('active');
  });
});

// Star rating system
let selectedRating = 0;
const starInputs = document.querySelectorAll('.star-inp');
starInputs.forEach(star => {
  star.addEventListener('mouseover', () => {
    const r = parseInt(star.getAttribute('data-rating'));
    starInputs.forEach((s,i) => s.classList.toggle('active', i < r));
  });
  star.addEventListener('mouseout', () => {
    starInputs.forEach((s,i) => s.classList.toggle('active', i < selectedRating));
  });
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-rating'));
    starInputs.forEach((s,i) => s.classList.toggle('active', i < selectedRating));
  });
});

// Portfolio filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Submit review function
function submitReview() {
  const name = document.getElementById('rev-name').value.trim();
  const role = document.getElementById('rev-role').value.trim();
  const text = document.getElementById('rev-text').value.trim();
  
  if (!name || !text || selectedRating === 0) {
    alert('Please fill in your name, a review, and select a star rating.');
    return;
  }
  
  const goldStars = '★'.repeat(selectedRating);
  const dimStars = '★'.repeat(5 - selectedRating);
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
  
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="review-stars">
      <span class="star-gold">${goldStars}</span><span class="star-dim">${dimStars}</span>
    </div>
    <p class="review-text">"${text}"</p>
    <div class="reviewer">
      <div class="reviewer-avatar">${initials}</div>
      <div>
        <div class="reviewer-name">${name}</div>
        <div class="reviewer-role">${role || 'Visitor'}</div>
      </div>
    </div>`;
  
  const container = document.getElementById('dynamic-reviews');
  container.appendChild(card);
  document.getElementById('review-divider').style.display = 'block';
  
  // Clear form
  document.getElementById('rev-name').value = '';
  document.getElementById('rev-role').value = '';
  document.getElementById('rev-text').value = '';
  selectedRating = 0;
  starInputs.forEach(s => s.classList.remove('active'));
  
  // Show success message
  const msg = document.getElementById('success-msg');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 3500);
}
