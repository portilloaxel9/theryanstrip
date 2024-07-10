document.addEventListener('DOMContentLoaded', async function() {
    const startDate = new Date(2024, 7, 28); // 28 August 2024
    const endDate = new Date(2024, 8, 9);   // 9 September 2024
    const calendar = document.getElementById('calendar');
    const modal = document.getElementById('modal');
    const confirmModal = document.getElementById('confirmModal');
    const homeModal = document.getElementById('homeModal');
    const emergencyModal = document.getElementById('emergencyModal');
    const callConfirmModal = document.getElementById('callConfirmModal');
    const closeButton = document.querySelectorAll('.close');
    const modalTitle = document.getElementById('modalTitle');
    const homeInfo = document.getElementById('homeInfo');

    const icons = [
        'fas fa-plane', 'fas fa-hotel', 'fas fa-utensils', 'fas fa-music',
        'fas fa-hiking', 'fas fa-swimmer', 'fas fa-car', 'fas fa-bicycle',
        'fas fa-theater-masks', 'fas fa-shopping-cart', 'fas fa-football-ball',
        'fas fa-umbrella-beach', 'fas fa-map-signs'
    ];

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    closeButton.forEach(btn => {
        btn.onclick = function() {
            closeModal();
        }
    });

    window.onclick = function(event) {
        if (event.target == modal || event.target == homeModal || event.target == emergencyModal || event.target == callConfirmModal) {
            closeModal();
        } else if (event.target == confirmModal) {
            confirmModal.style.display = "none";
        }
    }

    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        });
    }

    function openModal(modal) {
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    async function renderActivities(day) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwGrPUssHpkOqUSjzSAyCbqMBXBd-_M-TiEsaiEIRmyhdFoyRtCqGIAHRSvxti0uHNq/exec');
            const activities = await response.json();
            const filteredActivities = activities.filter(activity => activity.idDay == day.idDay);

            const activityList = document.querySelector('.activities');
            activityList.innerHTML = ''; // Clear previous entries
            filteredActivities.forEach(activity => {
                const item = document.createElement('div');
                item.className = 'activity-item show';
                item.innerHTML = `
                    <div>
                        <h3>${activity.title}</h3>
                        <p>${activity.time}</p>
                        <p><a href="${activity.link}" target="_blank">View on Map</a></p>
                        <p>${activity.description}</p>
                    </div>
                `;
                activityList.appendChild(item);
            });
            return filteredActivities.length;
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }

    async function updateDayElement(dayElem, idDay) {
        const day = { idDay };
        const activityCount = await renderActivities(day);
        dayElem.querySelector('.activity-count').textContent = `${activityCount} activities`;
    }

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayString = date.toDateString().split(' ').slice(1, 3).join(' ');
        const dayElem = document.createElement('div');
        dayElem.className = `day`;
        const iconIndex = (date - startDate) / (1000 * 60 * 60 * 24) % icons.length;
        const idDay = Math.floor((date - startDate) / (1000 * 60 * 60 * 24)) + 1;
        dayElem.innerHTML = `<i class="${icons[iconIndex]} icon"></i> ${dayOfWeek}, ${dayString} <span class="activity-count"></span>`;
        dayElem.onclick = function() {
            currentDay = { idDay, dayString };
            modalTitle.textContent = `Activities for ${currentDay.dayString}`;
            openModal(modal);
            renderActivities(currentDay);
        };
        calendar.appendChild(dayElem);
        updateDayElement(dayElem, idDay);
    }

    document.getElementById('homeButton').onclick = function() {
        openModal(homeModal);
    }

    document.getElementById('emergencyButton').onclick = function() {
        openModal(emergencyModal);
    }

    window.saveHomeInfo = function() {
        localStorage.setItem('homeInfo', homeInfo.value);
        closeModal();
    }

    function renderEmergencyContacts() {
        const emergencyList = document.querySelector('.emergency-contacts');
        emergencyList.innerHTML = `
            <div class="contact-item">
                <img src="./foto_perfil.jpg" alt="Profile Picture" class="profile-picture">
                <div class="contact-info">
                    <p class="contact-name">Axel Portillo</p>
                    <p class="contact-phone"><i class="fas fa-phone-alt"></i> <a href="#" onclick="confirmCall('+5401134231260')">+54 011 34231260</a></p>
                    <p class="contact-instagram"><i class="fab fa-instagram"></i> <a href="https://instagram.com/axelportillo" target="_blank">axelportillo</a></p>
                </div>
            </div>
        `;
    }

    window.confirmCall = function(number) {
        callNumber = number;
        openModal(callConfirmModal);
    }

    document.getElementById('confirmCallButton').onclick = function() {
        window.location.href = `tel:${callNumber}`;
    }

    window.cancelCall = function() {
        callConfirmModal.classList.remove('show');
        setTimeout(() => {
            callConfirmModal.style.display = 'none';
        }, 300);
    }

    function updateCountdown() {
        const now = new Date();
        const distance = startDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('days').textContent = days;
    }

    // Initialize home info and emergency contacts
    homeInfo.value = localStorage.getItem('homeInfo') || '';
    renderEmergencyContacts();
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour
});
