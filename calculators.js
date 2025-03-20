// Shared form validation function
function validatePositiveNumber(value, fieldName) {
    if (isNaN(value) || value <= 0) {
        return `${fieldName} must be a positive number. `;
    }
    return '';
}

document.addEventListener('DOMContentLoaded', function() {
    // 1RM Calculator
    const oneRMForm = document.getElementById('oneRMForm');
    if (oneRMForm) {
        oneRMForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const weight = parseFloat(document.getElementById('weight').value);
            const reps = parseInt(document.getElementById('reps').value);
            const resultDiv = document.getElementById('oneRMResult');
            const errorDiv = document.getElementById('oneRMError');
            
            // Validate inputs
            let errorMessage = '';
            errorMessage += validatePositiveNumber(weight, 'Weight');
            errorMessage += validatePositiveNumber(reps, 'Reps');
            
            if (errorMessage) {
                errorDiv.textContent = errorMessage;
                resultDiv.classList.add('d-none');
                errorDiv.classList.remove('d-none');
                return;
            }
            
            // Formula to calculate 1RM: weight * (1 + (reps/30))
            const epley = Math.round(weight * (1 + (reps/30)));
            
            // Brzycki formula: weight * 36 / (37 - reps)
            const brzycki = Math.round(weight * 36 / (37 - reps));
            
            // Lander formula: (100 * weight) / (101.3 - 2.67123 * reps)
            const lander = Math.round((100 * weight) / (101.3 - 2.67123 * reps));
            
            // Update the result div
            document.getElementById('epley').textContent = epley;
            document.getElementById('brzycki').textContent = brzycki;
            document.getElementById('lander').textContent = lander;
            
            errorDiv.classList.add('d-none');
            resultDiv.classList.remove('d-none');
        });
    }

    // BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const unit = document.getElementById('unit').value;
            const resultDiv = document.getElementById('bmiResult');
            const errorDiv = document.getElementById('bmiError');
            
            // Validate inputs
            let errorMessage = '';
            errorMessage += validatePositiveNumber(height, 'Height');
            errorMessage += validatePositiveNumber(weight, 'Weight');
            
            if (errorMessage) {
                errorDiv.textContent = errorMessage;
                resultDiv.classList.add('d-none');
                errorDiv.classList.remove('d-none');
                return;
            }
            
            // Calculate BMI based on the selected unit
            let bmi;
            if (unit === 'metric') {
                // BMI = weight(kg) / height(m)^2
                bmi = weight / ((height/100) * (height/100));
            } else {
                // BMI = 703 * weight(lb) / height(in)^2
                bmi = 703 * weight / (height * height);
            }
            
            bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
            
            // Determine BMI category
            let category;
            if (bmi < 18.5) {
                category = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal weight';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
            } else {
                category = 'Obesity';
            }
            
            // Update result
            document.getElementById('bmiValue').textContent = bmi;
            document.getElementById('bmiCategory').textContent = category;
            
            errorDiv.classList.add('d-none');
            resultDiv.classList.remove('d-none');
        });
    }

    // BMR Calculator
    const bmrForm = document.getElementById('bmrForm');
    if (bmrForm) {
        bmrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const age = parseInt(document.getElementById('age').value);
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const unit = document.getElementById('unit').value;
            const activity = document.getElementById('activity').value;
            const formula = document.getElementById('formula').value;
            
            const resultDiv = document.getElementById('bmrResult');
            const errorDiv = document.getElementById('bmrError');
            
            // Validate inputs
            let errorMessage = '';
            errorMessage += validatePositiveNumber(age, 'Age');
            errorMessage += validatePositiveNumber(height, 'Height');
            errorMessage += validatePositiveNumber(weight, 'Weight');
            
            if (errorMessage) {
                errorDiv.textContent = errorMessage;
                resultDiv.classList.add('d-none');
                errorDiv.classList.remove('d-none');
                return;
            }
            
            // Convert to metric if using imperial
            let weightKg, heightCm;
            if (unit === 'metric') {
                weightKg = weight;
                heightCm = height;
            } else {
                weightKg = weight * 0.453592; // lb to kg
                heightCm = height * 2.54;    // in to cm
            }
            
            // Calculate BMR using selected formula
            let bmr;
            if (formula === 'mifflin') {
                // Mifflin-St Jeor Equation:
                if (gender === 'male') {
                    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
                } else {
                    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
                }
            } else {
                // Harris-Benedict Equation:
                if (gender === 'male') {
                    bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
                } else {
                    bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
                }
            }
            
            // Calculate TDEE (Total Daily Energy Expenditure)
            const activityFactors = {
                'sedentary': 1.2,
                'light': 1.375,
                'moderate': 1.55,
                'active': 1.725,
                'very-active': 1.9
            };
            
            const tdee = bmr * activityFactors[activity];
            
            // Round results
            bmr = Math.round(bmr);
            const tdeeCal = Math.round(tdee);
            
            // Update results
            document.getElementById('bmrValue').textContent = bmr;
            document.getElementById('tdeeValue').textContent = tdeeCal;
            
            errorDiv.classList.add('d-none');
            resultDiv.classList.remove('d-none');
        });
    }

    // Unit conversion functionality
    const unitSelects = document.querySelectorAll('.unit-select');
    unitSelects.forEach(select => {
        select.addEventListener('change', function() {
            const unit = this.value;
            const form = this.closest('form');
            
            const weightLabel = form.querySelector('.weight-label');
            const heightLabel = form.querySelector('.height-label');
            
            if (unit === 'metric') {
                weightLabel.textContent = 'Weight (kg)';
                heightLabel.textContent = 'Height (cm)';
            } else {
                weightLabel.textContent = 'Weight (lb)';
                heightLabel.textContent = 'Height (inches)';
            }
        });
    });
});