import { BACKEND_URL, TOKEN_KEY } from './constants.js';

interface TodoResponse {
    code: number;
    msg: string;
    data: any;
    fail: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem(TOKEN_KEY);

    // If no token is found, redirect to login page
    if (!token) {
        console.log('No token found, redirecting to login page');
        window.location.href = '/';
        return;
    }

    // Fetch todo list
    fetchTodoList(token);
});

async function fetchTodoList(token: string) {
    try {
        const url = `${BACKEND_URL}/userApi/todo/todoListMap?isComplete=2`;
        console.log('Fetching todo list from:', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'userToken': token,
                'Content-Type': 'application/json'
            }
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (!response.ok) {
            throw new Error(responseText || 'Failed to fetch todo list');
        }

        let data: TodoResponse;
        try {
            data = JSON.parse(responseText);
            console.log('Parsed response data:', data);
        } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            throw new Error('Invalid response from server');
        }

        if (data.code !== 200 || data.fail) {
            console.error('Failed to fetch todo list:', data);
            throw new Error(data.msg || 'Failed to fetch todo list');
        }

        // Display the focusing status at the top
        const focusStatusElement = document.getElementById('focusStatus');
        let focusingTask: any = null;
        if (Array.isArray(data.data)) {
            for (const category of data.data) {
                if (Array.isArray(category.todoList)) {
                    const found = category.todoList.find((task: any) => task.isFocus === 1);
                    if (found) {
                        focusingTask = found;
                        break;
                    }
                }
            }
        }
        let timerInterval: number | undefined;
        function formatTimeLeft(seconds: number): string {
            const absSeconds = Math.abs(seconds);
            const h = Math.floor(absSeconds / 3600);
            const m = Math.floor((absSeconds % 3600) / 60);
            const s = absSeconds % 60;
            const pad = (n: number) => n.toString().padStart(2, '0');
            return (h > 0 ? pad(h) + ':' : '') + pad(m) + ':' + pad(s);
        }
        function updateFocusStatus() {
            if (focusStatusElement) {
                if (focusingTask && focusingTask.startTime && focusingTask.fallTiming) {
                    const startTime = Number(focusingTask.startTime);
                    const fallTiming = Number(focusingTask.fallTiming); // in seconds
                    const now = Date.now();
                    const elapsed = Math.floor((now - startTime) / 1000);
                    const timeLeft = fallTiming - elapsed;
                    let timeText = formatTimeLeft(timeLeft);
                    if (timeLeft < 0) {
                        timeText = '+' + formatTimeLeft(timeLeft);
                    }
                    focusStatusElement.textContent = `${focusingTask.title || '(No Title)'}  ${timeText}`;
                } else if (focusingTask) {
                    focusStatusElement.textContent = focusingTask.title || '(No Title)';
                } else {
                    focusStatusElement.textContent = '';
                }
            }
        }
        if (timerInterval) clearInterval(timerInterval);
        updateFocusStatus();
        if (focusingTask && focusingTask.startTime && focusingTask.fallTiming) {
            timerInterval = window.setInterval(updateFocusStatus, 1000);
        }

        // Display the todo categories and their lists
        const todoListElement = document.getElementById('todoList');
        if (todoListElement) {
            todoListElement.innerHTML = '';
            if (Array.isArray(data.data)) {
                data.data.forEach((category: any) => {
                    const groupDiv = document.createElement('div');
                    groupDiv.className = 'todo-category-group';
                    groupDiv.style.marginBottom = '32px';

                    // Category header container (flex row)
                    const headerContainer = document.createElement('div');
                    headerContainer.style.display = 'flex';
                    headerContainer.style.alignItems = 'center';
                    headerContainer.style.justifyContent = 'space-between';

                    // Left section: header and task count
                    const leftSection = document.createElement('div');
                    leftSection.style.display = 'flex';
                    leftSection.style.alignItems = 'center';
                    leftSection.style.gap = '12px';

                    // Category header (emoji + name)
                    const header = document.createElement('h2');
                    header.textContent = `${category.emoji || ''} ${category.name || ''}`;
                    header.style.display = 'flex';
                    header.style.alignItems = 'center';
                    header.style.gap = '8px';
                    header.style.margin = '0';

                    // Task count
                    const taskCount = document.createElement('span');
                    taskCount.textContent = `${category.todoList?.length || 0}`;
                    taskCount.style.background = '#e0e0e0';
                    taskCount.style.borderRadius = '12px';
                    taskCount.style.padding = '2px 10px';
                    taskCount.style.fontSize = '0.95em';
                    taskCount.style.color = '#555';
                    taskCount.style.marginLeft = '8px';

                    leftSection.appendChild(header);
                    leftSection.appendChild(taskCount);

                    // Collapse/Expand button
                    const toggleBtn = document.createElement('button');
                    toggleBtn.textContent = '−';
                    toggleBtn.title = 'Collapse';
                    toggleBtn.style.marginLeft = '16px';
                    toggleBtn.style.fontSize = '1.2em';
                    toggleBtn.style.cursor = 'pointer';
                    toggleBtn.style.background = 'none';
                    toggleBtn.style.border = 'none';
                    toggleBtn.style.outline = 'none';
                    toggleBtn.style.padding = '0 8px';
                    toggleBtn.style.userSelect = 'none';

                    // Content container (to be collapsed/expanded)
                    const contentDiv = document.createElement('div');

                    // Task list
                    if (Array.isArray(category.todoList) && category.todoList.length > 0) {
                        const ul = document.createElement('ul');
                        ul.style.listStyle = 'none';
                        ul.style.padding = '0';
                        ul.style.margin = '16px 0 0 0';
                        category.todoList.forEach((task: any) => {
                            const li = document.createElement('li');
                            li.textContent = task.title || '(No Title)';
                            li.style.padding = '10px 16px';
                            li.style.marginBottom = '8px';
                            li.style.background = '#f8f9fa';
                            li.style.borderRadius = '4px';
                            li.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                            li.style.fontSize = '1.05em';
                            ul.appendChild(li);
                        });
                        contentDiv.appendChild(ul);
                    } else {
                        const empty = document.createElement('div');
                        empty.textContent = 'No tasks in this category.';
                        empty.style.color = '#bbb';
                        empty.style.marginTop = '12px';
                        contentDiv.appendChild(empty);
                    }

                    // Collapse/Expand logic
                    let expanded = true;
                    toggleBtn.addEventListener('click', () => {
                        expanded = !expanded;
                        contentDiv.style.display = expanded ? '' : 'none';
                        toggleBtn.textContent = expanded ? '−' : '+';
                        toggleBtn.title = expanded ? 'Collapse' : 'Expand';
                    });

                    // Assemble header
                    headerContainer.appendChild(leftSection);
                    headerContainer.appendChild(toggleBtn);
                    groupDiv.appendChild(headerContainer);
                    groupDiv.appendChild(contentDiv);

                    todoListElement.appendChild(groupDiv);
                });
            } else {
                todoListElement.textContent = 'No todo data found.';
            }
        }
    } catch (error) {
        console.error('Error fetching todo list:', error);
        alert('Failed to fetch todo list. Please try again.');
    }
} 