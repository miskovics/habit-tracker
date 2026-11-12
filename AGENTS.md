# AGENTS.md — Habit Tracker

## Stack
- Plain HTML, CSS, JavaScript (no framework)
- Data stored in `localStorage`
- No build step

## Running the app
Open `index.html` in Chrome. No server needed.

## Conventions
- One file per concern: `index.html`, `style.css`, `app.js`
- Don't add any external libraries or packages without asking me first
- Don't add any new pages — everything stays on one screen
- Write in short sentences. One idea each
- If anything is unclear, ask me a question before making assumptions

## Prohibitions
- Don't add any npm dependencies
- Don't use `eval()`
- Don't commit any secrets — no API keys, passwords, or tokens in the files

## Requirements
- One-page webapp for habit tracking.
- Each habit has a title (Unicode text) and a status (`COMPLETE` or `INCOMPLETE`).
- Habits persist in `localStorage` between browser sessions.
- There are no habits at start.

### Layout
- **Top:** [New day] button. Resets every habit to `INCOMPLETE`.
- **Middle:** list of habits. Each row has a status checkbox, the title, and a small delete button.
- **Bottom:** [New habit] button. Shows a title input on the same page. ENTER saves the habit as `INCOMPLETE`.

### Behavior details
- Titles are trimmed. Empty or whitespace-only titles are not saved.
- The title input hides after saving. There is no cancel button or Escape handling.
- Delete removes a habit immediately. No confirmation.
- ENTER is ignored during IME composition, so Unicode input isn't saved half-typed.
- Habits are listed in creation order.
