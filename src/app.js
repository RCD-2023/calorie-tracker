import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';
import './css/bootstrap.css';
import './css/style.css';

//creem clasa Calorie Tracker

//creem clasa Meal si Workout care vor fi instantiate cand folosim metodele addMeal() si addWorkout()

//class Storage

//creem clasa App() care practic initializeaza(instantializeaza) clasa tracker
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._tracker.loadItems();
    this._loadEventListeners();
  }
  _loadEventListeners() {
    document.getElementById('limit').value = this._tracker._calorieLimit;
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));
    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));
    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItems.bind(this, 'meal'));
    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItems.bind(this, 'workout'));
    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));
    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  _newItem(type, e) {
    //type poate fi orice :category sau item etc, corespunde arg1 de la bind()
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);
    //validate inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    // Create a new meal/workout
    if (type === 'meal') {
      const meal = new Meal(name.value, +calories.value);
      // Add the meal to the tracker
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      // Add the workout to the tracker
      this._tracker.addWorkout(workout);
    }
    // Clear the form
    name.value = '';
    calories.value = '';
    // Collapse the form
    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true,
    });
  }
  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure?')) {
        const id = e.target.closest('.card').getAttribute('data-id');
        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        const item = e.target.closest('.card');
        item.remove();
      }
    }
  }
  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) != -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  _reset() {
    if (confirm('Are you sure you want to reset everything?')) {
      this._tracker.reset();
      document.getElementById('meal-items').innerHTML = '';
      document.getElementById('workout-items').innerHTML = '';
      document.getElementById('filter-meals').value = '';
      document.getElementById('filter-workouts').value = '';
    }
  }
  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById('limit');
    if (limit.value === '') {
      alert('Please add a limit');
      return;
    }
    this._tracker.setLimit(+limit.value);
    limit.value = '';
    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();

//instantiem clasele de mai sus

// teste diverse linii de cod
// const test = Math.random().toString(16).slice(2);
// console.log(test);
// let percentage = (20 / 100) * 100;
// console.log(percentage + '%');
// const width1 = Math.min(percentage, 100);
// console.log(width1);

//
// const tracker = new CalorieTracker();

// const breakfast = new Meal('Breakfast', 1700);
// tracker.addMeal(breakfast);
// const run = new Workout('Morning Run', 500);
// tracker.addWorkout(run);

// //testam _meals[] si _workouts[]
// // console.log(tracker._meals);
// // console.log(tracker._workouts);
// // console.log(tracker._totalCalories);
