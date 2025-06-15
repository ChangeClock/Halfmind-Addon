document.addEventListener('DOMContentLoaded', async () => {
    const configInfo = document.getElementById('config-info');

    try {
        // Fetch configuration from Home Assistant add-on's configuration endpoint
        const response = await fetch('/api/hassio/addons/self/options');
        const config = await response.json();

        configInfo.innerHTML = `
            <div class="config-item">
                <label>Email:</label>
                <span>${config.email || 'Not set'}</span>
            </div>
            <div class="config-item">
                <label>Password:</label>
                <span>${config.password ? '••••••••' : 'Not set'}</span>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching configuration:', error);
        configInfo.innerHTML = `
            <div class="config-item">
                <p style="color: #dc3545;">Error loading configuration. Please try again later.</p>
            </div>
        `;
    }
}); 