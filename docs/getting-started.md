## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v22 or later recommended)
- **npm** (v10 or later recommended)
- **Git**

Using NVM to install node and npm is recommended.

## Initial Setup

1. **Clone the Repository**

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all the dependencies required for the monorepo, including Nx and other development tools.

3. **Windows Setup (Optional)**

   If you're on Windows and see CRLF line ending warnings when running `git add`, you can suppress them:

   ```powershell
   git config core.safecrlf false
   ```

   This is safe because the project has proper `.gitattributes` configuration that handles line endings automatically.

## VSCode Extensions

### Recommended Extensions

The first time you open the project in VSCode, you'll be prompted to install our recommended extensions. We strongly encourage installing these extensions as they enhance your development experience and help maintain code quality and consistency across the team.

Our recommended extensions include:

- **Prettier** (`esbenp.prettier-vscode`): Code formatter that enforces consistent style
- **ESLint** (`dbaeumer.vscode-eslint`): Integrates ESLint into VS Code for real-time linting
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Provides autocomplete and syntax highlighting for Tailwind CSS
- **Vitest Explorer** (`vitest.explorer`): Run and debug Vitest tests directly from VSCode

To install all recommended extensions at once:

1. Open the Extensions view in VSCode (`Ctrl+Shift+X` or `Cmd+Shift+X`)
2. Type `@recommended` in the search bar
3. Click on "Install Workspace Recommended Extensions"
