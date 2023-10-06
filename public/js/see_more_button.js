// Function to set the visibility of containers
const setContainerVisibility = (containers, numberOfContainers) => {
    containers.forEach((container, index) => {
        container.style.display = index >= numberOfContainers ? 'none' : 'block';
    });
};

// Function to add a "See More" button
const addSeeMoreButton = (grid) => {

    const container = document.createElement('a');
    container.className = 'region__location-button-container';
    
    const span = document.createElement('span');
    span.textContent = '...';
    span.className = 'region__location-more'
    container.appendChild(span);
    
    const button = document.createElement('button');
    button.textContent = 'See More';
    button.className = 'region__location-button'
    container.appendChild(button);

    grid.appendChild(container);

};

// Function to add link to each of "See More" Button depending on region
const addLink = () => {
    const buttons = document.querySelectorAll('.region__location-button-container');
    const isAdmin = window.location.href.includes('admin');
    for (let button of buttons) {
        const region = button.parentElement.dataset.region;
        if (isAdmin) {
            button.href = `/${region}/admin`;
        } else {
            button.href = `/${region}`;
        }
    }
}

// Configuration object for screen widths and container limits
const screenConfig = [
    { maxWidth: 750, limit: 5 },
    { maxWidth: 1200, limit: 7 },
    { maxWidth: Infinity, limit: 9 }
];

// Main function to handle grids
const handleGrids = () => {
    const grids = document.querySelectorAll('.region__location-grid');

    for (let grid of grids) {
        const containers = grid.querySelectorAll('.region__location-container');
        const buttonContainer = grid.querySelector('.region__location-button-container');
        const width = window.innerWidth;

        // Find the appropriate configuration for the current screen width
        const { limit } = screenConfig.find(config => width <= config.maxWidth);

        // Set container visibility and add "See More" button if needed
        setContainerVisibility(containers, limit);
        if (containers.length > limit && !buttonContainer) {
            addSeeMoreButton(grid);
            addLink();
        } else if (containers.length <= limit && buttonContainer) {
            buttonContainer.remove();
        }
    }
};

handleGrids();

window.addEventListener('resize', handleGrids);

