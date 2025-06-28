import { BACKEND_URL, TOKEN_KEY } from './constants.js';

interface LoginResponse {
    code: number;
    msg: string;
    data: {
        code: number;
        data: string;
    };
    fail: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;

    // Check if user is already logged in
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
        console.log('Found stored token, redirecting to todo list');
        window.location.href = '/todo.html';
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            const url = `${BACKEND_URL}/userApi/moveUser/login?password=${encodeURIComponent(password)}&userEmail=${encodeURIComponent(userEmail)}`;
            console.log('Sending login request to:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': '*/*'
                }
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            if (!response.ok) {
                throw new Error(responseText || 'Login failed');
            }

            let data: LoginResponse;
            try {
                data = JSON.parse(responseText);
                console.log('Parsed response data:', data);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid response from server');
            }

            if (data.code !== 200 || data.fail || data.data.code !== 0) {
                console.error('Login failed:', data);
                throw new Error(data.msg || 'Login failed');
            }

            // Store the token in localStorage
            const token = data.data.data;
            localStorage.setItem(TOKEN_KEY, token);
            console.log('Token stored successfully');

            // Redirect to todo list page
            window.location.href = '/todo.html';
        } catch (error) {
            alert('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    });
}); 