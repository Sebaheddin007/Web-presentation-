document.addEventListener('DOMContentLoaded', function() {
    setupModals();
    setupTabs();
    setupScheduleSystem();
});
function setupModals() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const studentRegisterBtn = document.getElementById('studentRegisterBtn');
    const companyRegisterBtn = document.getElementById('companyRegisterBtn');
    const goToRegisterLink = document.getElementById('go-to-register');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close');
    const cancelButtons = document.querySelectorAll('.btn-outline');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            registerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            showRegistrationForm('student-form');
        });
    }
    if (studentRegisterBtn) {
        studentRegisterBtn.addEventListener('click', function() {
            registerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            showRegistrationForm('student-form');
        });
    }
    if (companyRegisterBtn) {
        companyRegisterBtn.addEventListener('click', function() {
            registerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            showRegistrationForm('company-form');
        });
    }
    if (goToRegisterLink) {
        goToRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
            showRegistrationForm('student-form');
        });
    }
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    cancelButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    const tabButtons = document.querySelectorAll('.modal-header .tab-btn');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const formId = this.getAttribute('data-form');
            showRegistrationForm(formId);
        });
    });
}
function showRegistrationForm(formId) {
    const forms = document.querySelectorAll('.registration-form');
    forms.forEach(form => form.classList.remove('active'));
    const tabButtons = document.querySelectorAll('.modal-header .tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
    const selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
    const selectedTab = document.querySelector(`.tab-btn[data-form="${formId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}
function setupTabs() {
    const serviceTabs = document.querySelectorAll('.service-tabs .tab-btn');
    serviceTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            serviceTabs.forEach(t => t.classList.remove('active'));
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
}
function setupScheduleSystem() {
    const addScheduleBtn = document.getElementById('add-schedule');
    const scheduleList = document.getElementById('schedule-list');
    if (addScheduleBtn && scheduleList) {
        addScheduleBtn.addEventListener('click', function() {
            const selectedDays = [];
            const dayCheckboxes = document.querySelectorAll('.day-checkbox:checked');
            dayCheckboxes.forEach(function(checkbox) {
                const dayLabel = checkbox.nextElementSibling.textContent;
                selectedDays.push(dayLabel);
            });
            if (selectedDays.length === 0) {
                alert('Zəhmət olmasa, ən az bir gün seçin.');
                return;
            }
            const timeStart = document.getElementById('time-start').value;
            const timeEnd = document.getElementById('time-end').value;
            if (!timeStart || !timeEnd) {
                alert('Zəhmət olmasa, başlanğıc və bitmə saatlarını daxil edin.');
                return;
            }
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <span>${selectedDays.join(', ')}: ${timeStart} - ${timeEnd}</span>
                <button type="button" class="remove-btn">×</button>
            `;
            const removeBtn = scheduleItem.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function() {
                scheduleList.removeChild(scheduleItem);
            });
            scheduleList.appendChild(scheduleItem);
            dayCheckboxes.forEach(checkbox => checkbox.checked = false);
        });
        const existingRemoveButtons = document.querySelectorAll('.schedule-list .remove-btn');
        existingRemoveButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const scheduleItem = this.parentElement;
                scheduleList.removeChild(scheduleItem);
            });
        });
    }
}
