import { supabase } from "./supabaseClient.js";
console.log("waitlist.js loaded");

const counterWrap = document.getElementById("counter-wrap");
const counterNumber = document.getElementById("counter-number");
const form = document.getElementById("waitlist-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");
const submitLabel = document.getElementById("submit-btn-label");
const errorEl = document.getElementById("form-error");
const successBlock = document.getElementById("success-block");

function animateCount(el, target, duration = 900) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

async function loadCounter() {
  try {
    const { data, error } = await supabase.rpc("waitlist_count");
    if (error) throw error;
    counterWrap.classList.remove("hidden");
    counterWrap.classList.add("flex");
    animateCount(counterNumber, Number(data) || 0);
  } catch (err) {
    console.error("[Torque Mart] Could not load waitlist count:", err.message);
  }
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}
function clearError() {
  errorEl.textContent = '';
  errorEl.classList.add('hidden');
}
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // this is the line that stops the ?email=... redirect
  clearError();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name) {
    showError('Please enter your name.');
    return;
  }
  if (!isValidEmail(email)) {
    showError('Enter a valid email address.');
    return;
  }
  if (!supabase) {
    showError("Waitlist isn't connected yet — add your Supabase keys in index.html.");
    return;
  }

  submitBtn.disabled = true;
  submitLabel.textContent = 'Joining…';

  const { error } = await supabase.from('waitlist').insert({ name, email });

  submitBtn.disabled = false;
  submitLabel.textContent = 'Join Waitlist';

  if (error) {
    if (error.code === '23505') {
      form.classList.add('hidden');
      successBlock.classList.remove('hidden');
      successBlock.classList.add('flex', 'success-visible');
      successBlock.querySelector('p').textContent = "You're already on the list!";
      return;
    }
    showError('Something went wrong. Please try again.');
    console.error('[Torque Mart] Signup error:', error.message);
    return;
  }

  form.classList.add('hidden');
  successBlock.classList.remove('hidden');
  successBlock.classList.add('flex', 'success-visible');
  loadCounter();
});