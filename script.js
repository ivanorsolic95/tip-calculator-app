document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people-count');
    const tipCostSpan = document.getElementById('tip-cost');
    const tipOptions = document.querySelectorAll('.tip-percentage');
    const customTip = document.getElementById('custom-percent-tip');
    const totalCostSpan = document.getElementById('total-cost');
    const resetButton = document.getElementById('reset-button');
    const errorMessage = document.getElementById('error-message');
    
    tipOptions.forEach(option => {
      option.addEventListener('click', () => {
        const tipPercentage = parseFloat(option.dataset.value);
        const tipAmount = calculateTip(tipPercentage);
        calculateTotalCost(tipAmount);
      });
    });

    customTip.addEventListener('input', () => {
        const customTipValue = parseFloat(customTip.value);
        if (!isNaN(customTipValue)) {
          const tipAmount = calculateTip(customTipValue);
          calculateTotalCost(tipAmount);
        }
    });

    function calculateTip(tipPercentage) {
      const billAmount = parseFloat(billInput.value);
      const numberOfPeople = parseInt(peopleInput.value);
      
      if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
        tipCostSpan.textContent = '$0.00';
        return;
      }
      
      const tipAmountPerPerson = (billAmount * (tipPercentage / 100)) / numberOfPeople;
      tipCostSpan.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
      return tipAmountPerPerson;
    }

    function calculateTotalCost(tipAmount) {
        const billAmount = parseFloat(billInput.value);
        const numberOfPeople = parseInt(peopleInput.value);

        if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
            tipCostSpan.textContent = '$0.00';
            return;
        }

        const totalCost = ((billAmount / numberOfPeople) + tipAmount)
        totalCostSpan.textContent = `$${totalCost.toFixed(2)}`;
    }

    function handleSubmit (event) {
        event.preventDefault();
        billInput.value = '';
        peopleInput.value = '';
        customTip.value = '';
        tipCostSpan.textContent = '$0.00';
        totalCostSpan.textContent = '$0.00';
        errorMessage.style.display = 'none';
    }

    resetButton.addEventListener('click', handleSubmit);

    function showErrorMessage () {
        if (peopleInput.value === '0') {
            errorMessage.style.display = 'block';
            peopleInput.style.border = '2px solid hsl(13, 70%, 60%)';
        } else {
            errorMessage.style.display = 'none';
            peopleInput.style.border = '1px';
        }
    }

    peopleInput.addEventListener('input',showErrorMessage);
});