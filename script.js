document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactsTable = document.getElementById('contactsTable');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone_number = document.getElementById('phone_number').value;
            const address = document.getElementById('address').value;

            fetch('/add_contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone_number, address })
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                contactForm.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (contactsTable) {
        fetch('/contacts')
            .then(response => response.json())
            .then(data => {
                data.forEach(contact => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${contact.name}</td>
                        <td>${contact.phone_number}</td>
                        <td>${contact.address}</td>
                    `;
                    contactsTable.appendChild(row);
                });
            })
            .catch(error => console.error('Error:', error));
    }
});
