# Command Palette

A lightweight command palette built with **React**, **TypeScript**, and **Tailwind CSS**. It provides a searchable list of commands with keyboard navigation, debounced search, loading states, grouped results, and mouse interaction.

## Features

- 🔍 Search commands dynamically.
- ⌨️ Keyboard shortcuts:
  - `Ctrl + K` / `⌘ + K` to open the command palette.
  - `Arrow Up` and `Arrow Down` for navigation.
  - `Enter` to execute a selected command.
  - `Escape` to close the palette.

- ⚡ Debounced search to reduce unnecessary API calls.
- 📂 Commands grouped by category.
- 🔄 Loading spinner while fetching results.
- 🖱️ Mouse support for selecting commands.
- 📜 Automatic scrolling to keep the highlighted item visible.
- 🎨 Styled with Tailwind CSS.

---

## Project Structure

```
src/
├── components/
│   ├── CommandPallete.tsx
│   ├── SearchResults.tsx
│   ├── useDebounce.ts
│   └── commands.ts
```

### Components

#### CommandPallete

Responsible for:

- Managing search input.
- Fetching command data.
- Handling keyboard shortcuts.
- Opening and closing the command palette.
- Managing highlighted command state.

#### SearchResults

Responsible for:

- Displaying grouped commands.
- Showing loading state.
- Highlighting selected items.
- Handling mouse interactions.
- Scrolling selected items into view.

#### useDebounce

Custom React hook that delays updates to the search value, reducing unnecessary searches.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd <project-folder-name>
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

Install required packages:

```bash
npm install lucide-react
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

---

## Keyboard Shortcuts

| Shortcut         | Action                      |
| ---------------- | --------------------------- |
| Ctrl + K / ⌘ + K | Open command palette        |
| Arrow Down       | Move to next command        |
| Arrow Up         | Move to previous command    |
| Enter            | Execute highlighted command |
| Escape           | Close command palette       |

---

## Search Flow

1. User types into the search input.
2. Input value is debounced for 500ms.
3. `searchCommands()` fetches matching commands.
4. Loading spinner is displayed while fetching.
5. Results are grouped by category.
6. User can navigate using keyboard or mouse.
7. Selecting a command executes its action and closes the palette.

---

## Command Format

Commands should follow this structure:

```ts
export type Command = {
  id: string;
  label: string;
  group: string;
  action: () => void;
};
```

Example:

```ts
{
  id: "1",
  label: "Go to Dashboard",
  group: "Navigation",
  action: () => {
    console.log("Dashboard");
  }
}
```

---

## Custom Debounce Hook

The project uses a reusable debounce hook:

```ts
const debouncedValue = useDebounce(value, 500);
```

This prevents excessive search requests while typing.

---

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hooks
  - useState
  - useEffect
  - useCallback
  - useMemo
  - useRef

---

## Future Improvements

- Fuzzy search.
- Virtualized lists for large datasets.
- Recent command history.
- Keyboard focus trapping.
- Dark mode support.
- Command icons.
- Nested command menus.
- Global command registration.

---

## Current Functionality

✅ Debounced search

✅ Keyboard navigation

✅ Mouse interaction

✅ Grouped results

✅ Loading state

✅ Auto-scroll highlighted item

✅ Execute command on click or Enter

✅ Overlay click to close

✅ Tailwind UI styling

---

## Usage

Open the command palette:

```
Ctrl + K
```

Search for a command:

```
dashboard
```

Navigate:

```
↑ ↓
```

Execute:

```
Enter
```

Or simply click on a command with the mouse.

---

## License

This project is open source and available under the MIT License.
