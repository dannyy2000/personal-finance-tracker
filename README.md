# Personal Finance Tracker
![Screenshot 2025-05-17 at 3 56 10 PM](https://github.com/user-attachments/assets/87331cf0-32bc-46db-86d9-4aca3b5622aa)

![Finance Tracker Screenshot](./screenshot.png) *()*

A comprehensive personal finance management application built with React, TypeScript, and Chart.js. Track your income and expenses with detailed categorization, filtering options, and visual analytics.

## Features

- **Transaction Management**
  - Add income and expense transactions
  - Edit and delete transactions
  - Categorize transactions with custom categories
  - Add notes to transactions

- **Data Visualization**
  - Interactive pie chart showing income vs expenses
  - Balance calculation
  - Color-coded transaction display

- **Filtering & Organization**
  - Filter by transaction type (income/expense/both)
  - Filter by specific categories
  - Sort transactions by date or amount

- **Data Management**
  - Persistent storage using browser localStorage
  - Export all transactions to CSV
  - Responsive design works on all devices

## Technologies Used

- React 18
- TypeScript
- Chart.js + react-chartjs-2
- Tailwind CSS
- Jest + React Testing Library

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-finance-tracker.git
```

2. Navigate to project directory:
```bash
cd personal-finance-tracker
```

3. Install dependencies:
```bash
npm install
```

4. Start development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Deployment

Build for production:
```bash
npm run build
```

Deploy the `build` folder to your preferred hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Future Enhancements

- [ ] Add user authentication
- [ ] Implement cloud sync
- [ ] Add recurring transactions
- [ ] Create budget tracking
- [ ] Dark mode support

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - youremail@example.com

Project Link: [https://github.com/yourusername/personal-finance-tracker](https://github.com/yourusername/personal-finance-tracker)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
