# 📈 Stock Forecast

A modern web application for stock market analysis and AI-powered price predictions. Built with Angular, this application provides real-time stock data visualization and predictive analytics. 🚀

## ✨ Features

- 📊 Real-time stock data visualization
- 🤖 AI-powered price predictions
- 📱 Interactive charts with multiple timeframes
- 🔍 Searchable stock listings
- 💅 Responsive material design interface

## 🛠️ Technologies Used

### 🌐 Frontend
- ⚡ Angular 16+
- 🎨 Angular Material UI
- 📊 Chart.js with ng2-charts
- 📝 TypeScript
- 🎯 SCSS for styling

### 🔬 Data Processing
- 🐍 Python (Jupyter Notebooks)
- 📚 Data Analysis Libraries:
  - 🐼 Pandas
  - 🔢 NumPy
  - 🧠 Scikit-learn (for predictions)

## 📁 Project Structure

```plaintext
src/
├── app/
│   ├── components/        # Reusable UI components
│   ├── core/             # Core functionality
│   │   ├── models/       # Data models
│   │   └── services/     # API and data services
│   ├── pages/            # Main application pages
│   └── services/         # Application services
├── assets/
│   └── data/            # Static data files
└── pythonFiles/         # Data processing scripts
## 🚀 Getting Started
### 📋 Prerequisites
- 📦 Node.js (v14 or higher)
- 🔧 npm (v6 or higher)
- ⚙️ Angular CLI
### 💻 Installation
1. Clone the repository:
```bash
git clone <repository-url>
 ```

2. Navigate to the project directory:
```bash
cd stock-forecast
 ```

3. Install dependencies:
```bash
npm install
 ```

4. Start the development server:
```bash
ng serve
 ```

5. Open your browser and navigate to http://localhost:4200 🌐
## 📱 Usage
1. 🏠 Home Page
   
   - Browse the list of available stocks
   - Use the search bar to filter stocks by symbol or name
   - Click on any stock card to view detailed information
2. 📊 Stock Detail Page
   
   - View detailed stock price charts
   - Toggle between different timeframes (Week, Month, Year, Decade)
   - Enable AI predictions to see forecasted prices
   - Use the back button to return to the stock list
## 🔬 Data Processing
The project includes several Jupyter notebooks in the pythonFiles directory:

- 📥 getStockValues.ipynb : Fetches historical stock data
- 📝 getStocksNames.ipynb : Retrieves stock symbols and company information
- 📊 getValueDayleDecade.ipynb : Processes daily to decade-level data
- 🤖 predictionsMaker.ipynb : Generates AI-powered price predictions
## 👩‍💻 Development
### 🏗️ Code Scaffolding
Generate new components using Angular CLI:

```bash
ng generate component component-name
 ```
```

### 🚀 Building for Production
Build the project for production:

```bash
ng build --configuration production
 ```
```

The build artifacts will be stored in the dist/ directory. 📦

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details. ⚖️