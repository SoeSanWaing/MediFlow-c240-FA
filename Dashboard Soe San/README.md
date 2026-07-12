# MediFlow Admin Queue Dashboard

A real-time patient queue management dashboard for polyclinic reception staff. Built with HTML, CSS, and vanilla JavaScript, powered by n8n workflows and Google Sheets as the backend.

## Live Demo

https://soesanwaing.github.io/MediFlow-c240-FA/Dashboard%20Soe%20San/index.html

## Features

### Live Queue Feed
- Displays today's active patients grouped by clinical category (Cardiac, ENT, Respiratory, Neurology, etc.)
- Completed, discharged, and no-show patients are automatically filtered out for today's view
- Data fetched from n8n webhook which reads from Google Sheets
- Auto-refreshes every 45 seconds

### Wait-Time Countdown
- Counts down from the AI-predicted wait time in real time on the client side
- Uses `assigned_date_time` as the starting reference point
- Shows "Due now" when wait time reaches zero or is set to 0 by the backend
- Shows "Due now (X min overdue)" when actual wait exceeds the prediction — helps staff identify potential no-shows
- Shows "In consultation" for patients currently with a doctor
- Shows "Emergency - awaiting ambulance" for emergency-flagged patients
- Handles future timestamps gracefully (displays static estimate if assigned time hasn't arrived yet)
- Updates every 60 seconds without re-fetching from the backend

### Patient Sorting
- Within each category, patients are sorted by: Emergency first, then In Progress, then Waiting
- Waiting patients are further sorted by remaining wait time (shortest first)

### Queue Search
- Real-time search bar filters patients by name or patient ID as you type

### Date Filter
- Date picker defaults to today
- Select any past date to view historical records (includes completed and no-show patients)
- Sends `?date=YYYY-MM-DD` parameter to n8n for server-side filtering
- Action buttons are hidden for historical views (read-only)
- Wait time countdown is hidden for historical views

### Status Actions (Today only)
- **Emergency** — Flags patient for ambulance dispatch, zeroes wait/consult time, frees the doctor
- **In Progress** — Marks patient as currently in consultation
- **Done** — Marks patient as completed, removes from active queue
- **No Show** — Marks absent patient, removes from queue, frees doctor slot
- All actions send updates to n8n which writes to Google Sheets and recalculates wait times for remaining patients

### Wait Time Recalculation
- Triggered on every status change (Done, Emergency, No Show)
- Recalculates per doctor (doctors work in parallel, not a single queue)
- Accounts for in-progress patients' remaining consult time as a head-start
- Updates Google Sheets with new wait times for all remaining Waiting patients

### Doctor Roster Sync
- Doctors are marked "Busy" when their patient goes In Progress
- Doctors are marked "Available" when their patient is Done, No Show, or Emergency

### Patient Details Page
- Click any patient name to view full details
- Shows: Patient ID, Category, Condition, Doctor, Severity, Status, Assigned Date Time
- Wait time countdown shown for today's patients only
- Data loaded from localStorage (no additional API call needed)

### Total Patient Count
- Displayed below the page title
- Updates dynamically with search and date filter changes

### Emergency Alert System
- Confirmation prompt before flagging
- Sets `alert_sent = true`, `estimated_wait_time_mins = 0`, `estimated_consult_time_mins = 0`
- Patient remains visible until staff clicks Done (ambulance arrived)

### Logout
- Logout button in header links to the shared MediFlow login page

### Toast Notifications
- Success/error messages for all backend operations
- 10-second timeout for backend calls — shows timeout message if n8n doesn't respond

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | HTML, CSS, JavaScript (vanilla) |
| Backend/Automation | n8n (self-hosted) |
| Database | Google Sheets |
| Hosting | GitHub Pages |
| Telegram Bot | n8n + Telegram API |



## n8n Workflows

1. **GetData (GET)** — Reads patient_data sheet, filters by date, groups by category, excludes completed patients for today's live view
2. **UpdateStatus (POST)** — Updates patient status, recalculates wait times per doctor, syncs doctor roster availability

## Team

Built by Team 4, Republic Polytechnic — C240 AI Essentials & Innovations
