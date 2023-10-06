document.addEventListener('DOMContentLoaded', (event) => {
    const deleteButtons = document.querySelectorAll('.admin-delete-button');
    const deleteModal = document.getElementById('delete__modal');
    const closeModal = document.querySelector('.modal__close-button');
    const confirmDeleteButton = document.getElementById('modal__confirm-delete-button');
    const cancelDeleteButton = document.getElementById('modal__cancel-delete-button');
    let selectedForm;

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            selectedForm = e.target.closest('form');
            deleteModal.style.display = "block";
        });
    });

    closeModal.addEventListener('click', () => {
        deleteModal.style.display = "none";
    });

    confirmDeleteButton.addEventListener('click', () => {
        if (selectedForm) {
            selectedForm.submit();
        }
        deleteModal.style.display = "none";
    });

    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == deleteModal) {
            deleteModal.style.display = "none";
        }
    });
});
