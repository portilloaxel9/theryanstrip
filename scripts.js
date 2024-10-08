document.addEventListener('DOMContentLoaded', async function() {
    const startDate = new Date(2024, 7, 29); // 28 August 2024
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
    const walletModal = document.getElementById('walletModal');

    const icons = [
        'fas fa-plane', 'fas fa-hotel', 'fas fa-utensils', 'fas fa-music',
        'fas fa-hiking', 'fas fa-swimmer', 'fas fa-car', 'fas fa-bicycle',
        'fas fa-theater-masks', 'fas fa-shopping-cart', 'fas fa-football-ball',
        'fas fa-umbrella-beach', 'fas fa-map-signs'
    ];

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const activitiesData = [
        { idDay: 1, title: 'Drinks at PEUTEO', time: '21:00pm', link: 'https://maps.app.goo.gl/8csGbo4gL3MhLRvQ7', description: 'Peuteo is a small gay bar located in Palermo Soho. On Thursdays there is usually a drag show.' },
        { idDay: 2, title: 'Dinner at Don Julio', time: '21:30pm', link: 'https://maps.app.goo.gl/iryvsz2NcZ5TbP7U8', description: 'Don Julio is the best Argentine meat restaurant. It has a Michelin star.', document: 'https://drive.google.com/file/d/1Bth8aa-41jq6OkuoXdfIKFVLPmdS6MiQ/view?usp=sharing' },
        { idDay: 2, title: 'Visit the MALBA Museum', time: '16:00pm', link: 'https://maps.app.goo.gl/T3aV2z2pth7DDzJ39', description: 'Malba is a dynamic and participatory cultural space that presents temporary exhibitions of various kinds and displays of contemporary Argentine and Latin American art.' },
        { idDay: 2, title: 'Visit El Ateneo Grand Splendid', time: '18:30pm', link: 'https://maps.app.goo.gl/j2uHQBAtQ4F8e1ot8', description: 'El Ateneo Grand Splendid is the most beautiful bookstore in the world according to National Geographic.' },
        { idDay: 3, title: 'Kayaking in Tigre', time: '09:00am', link: 'https://maps.app.goo.gl/ciUL6n7wyLb7PPy19', description: 'Breakfast in Tigre and then kayaking in the Rio de la Plata.' },
        { idDay: 3, title: 'Meet the Obelisco at night', time: '19:45pm', link: 'https://maps.app.goo.gl/pFTtBxGugXasmFC77', description: 'Small stopover before the Tango Show to appreciate the Obelisco at night.' },
        { idDay: 3, title: 'Dinner at Tango Porteño', time: '20:30pm', link: 'https://maps.app.goo.gl/H4GBg2DiQmoTD1Nu7', description: 'Tango Porteño is an incredible Tango show inspired by the city of Buenos Aires.', document: 'https://drive.google.com/file/d/1EaG2ee5dQuQ-05rECvzRDC4SKvo6drFr/view?usp=sharing' },
        { idDay: 4, title: 'Trip to Mendoza', time: '07:15am', link: 'https://maps.app.goo.gl/uin6H7LauPfJUPg17', description: 'We must be there two hours before the flight.', document: 'https://drive.google.com/file/d/10Ndym2zWYqnJgQH8EQvL6A_pYfE6rK7k/view?usp=sharing' },
        { idDay: 5, title: 'Visit to ANAIA vineyard', time: '15:30pm', link: 'https://maps.app.goo.gl/Qj4YUgsHWV1563458', description: 'Incredible tech vineyard one hour from the city of Mendoza.', document: 'https://drive.google.com/file/d/1Z5JHael7BWl6pOa_iAy3uG_oNO_ICUR4/view?usp=sharing' },        
        { idDay: 8, title: 'Back to Buenos Aires', time: '19:40pm', link: 'https://maps.app.goo.gl/uaY12neigH1C2Ueb7', description: 'We must be there two hours before the flight.', document: 'https://drive.google.com/file/d/1dVZnHnjkHo5-ST1iZbwVo6wNxf2OnKpk/view?usp=sharing' },
        { idDay: 9, title: 'Visit Teatro Colón', time: '11am', link: 'https://maps.app.goo.gl/V1aeYiEkrShqX5pZ6', description: 'Guided tour (in English) of the Teatro Colón.', document: '' },
        { idDay: 10, title: 'Walk in Bosques de Palermo', time: '14:00pm', link: 'https://maps.app.goo.gl/5RtZ2E1GA1rHF4819', description: 'Visit Bosques de Palermo and get some fresh air.' },
        { idDay: 10, title: 'Party at Rheo Club', time: 'Midnight', link: 'https://maps.app.goo.gl/NmWCCZ4iAtF6jikYA', description: 'Get ready to discover the favorite club of gays in Buenos Aires.' },
        { idDay: 11, title: 'Buenos Aires Bus Tour', time: 'Midday', link: 'https://maps.app.goo.gl/fojYNTWfqd466A6ZA', description: 'Typical bus ride to say goodbye to Buenos Aires.' },
    ];
    
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
        const filteredActivities = activitiesData.filter(activity => activity.idDay === day.idDay);
        const activityList = document.querySelector('.activities');
        activityList.innerHTML = '';
        filteredActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item show';
            item.innerHTML = `
                <div>
                    <h3>${activity.title}</h3>
                    <p>${activity.time}</p>
                    <p><a href="${activity.link}" target="_blank">View on Map</a></p>
                    <p>${activity.description}</p>
                    ${activity.document ? `<p><a href="${activity.document}" target="_blank"><i class="fas fa-file-alt"></i> Download Document</a></p>` : ''}
                </div>
            `;
            activityList.appendChild(item);
        });
        return filteredActivities.length;
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

    document.getElementById('walletButton').onclick = function() {
        openModal(walletModal);
        renderWalletDocuments();
    }

    function renderWalletDocuments() {
        const walletList = document.querySelector('.wallet-documents');
        walletList.innerHTML = '';
        activitiesData.forEach(activity => {
            if (activity.document) {
                const item = document.createElement('div');
                item.className = 'document-item';
                item.innerHTML = `
                    <p><a href="${activity.document}" target="_blank"><i class="fas fa-file-alt"></i> ${activity.title}</a></p>
                `;
                walletList.appendChild(item);
            }
        });
    }

    async function getWeatherAndTimes() {
        const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current_weather=true');
        const weatherData = await weatherResponse.json();
        const temperature = weatherData.current_weather.temperature;
    
        const now = new Date();
        const buenosAiresTime = now.toLocaleTimeString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });
        const losAngelesTime = now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' });
    
        document.getElementById('temperature').innerHTML = `<i class="fas fa-thermometer-half"></i> Buenos Aires Temperature: ${temperature.toFixed(1)}°C`;
        document.getElementById('buenosAiresTime').innerHTML = `<i class="fas fa-clock"></i> Buenos Aires Time: ${buenosAiresTime}`;
        document.getElementById('losAngelesTime').innerHTML = `<i class="fas fa-clock"></i> Los Angeles Time: ${losAngelesTime}`;
    }
    
    getWeatherAndTimes();
    setInterval(getWeatherAndTimes, 60000); // Update every minute    
    
    getWeatherAndTimes();
    setInterval(getWeatherAndTimes, 60000); // Update every minute    

    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.classList.remove('modal-open');
            }, 300);
        });
    }
    
    function openModal(modal) {
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        }, 10);
    }
    

    function displayPopup() {
        const popupMessage = `
            <h2>Hey Papi, what's up?</h2>
            <p>There are new activities (you can say no to any of them):</p>
            <ul>
                <li>Friday, Aug 30: Visit to MALBA Museum at 16:00pm.</li>
                <li>Monday, Sep 02: Visit to ANAIA vineyard at 15:30pm.</li>
                <li>Friday, Sep 06: Visit to Teatro Colón at 11:00am.</li>
                <li>Sunday, Sep 08: Buenos Aires Bus Tour at midday.</li>
            </ul>
        `;
    
        const popupModal = document.createElement('div');
        popupModal.classList.add('modal', 'show'); // Agregar clases 'modal' y 'show'
        popupModal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                ${popupMessage}
            </div>
        `;
    
        document.body.appendChild(popupModal);
    }
    displayPopup();
});
