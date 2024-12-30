import React, { useState, useEffect } from 'react';
import HomeScreen from './components/Home/Home.jsx';
import SubscriptionScreen from './components/Subscription/SubscriptionScreen.jsx';
import QuestionScreen from './components/Question/QuestionScreen.jsx'; // Новый экран
import WhyBetterScreen from './components/WhyBetter/WhyBetterScreen.jsx'; // Подэкран
import InstructionsScreen from './components/Instructions/InstructionsScreen.jsx'; // Подэкран
import ReferralScreen from './components/Referral/ReferralScreen.jsx'; // Подэкран
import Menu from './components/Menu/Menu.jsx';
import Preloader from './components/Preloader/Preloader.jsx'; // Прелоадер
import './components.css';
import './index.css';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('home'); // текущий экран
  const [questionSubscreen, setQuestionSubscreen] = useState(null); // подэкран для вопросиков
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки приложения
  const [screenTransition, setScreenTransition] = useState(false); // Для анимации экранов
  const [isHomeScreenFirstRender, setIsHomeScreenFirstRender] = useState(true); // Флаг первого рендера домашнего экрана
  const [showContent, setShowContent] = useState(false); // Для отображения контента

  useEffect(() => {
    // Имитация загрузки приложения (например, запросы данных)
    const timer = setTimeout(() => {
      setIsLoading(false); // Убираем прелоадер после загрузки
      setShowContent(true); // Показываем контент после загрузки
    }, 5000); // 5 секунд (замените на реальную логику)

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
  }, []);

  const handleScreenChange = (screen) => {
    setScreenTransition(true); // Запускаем анимацию скрытия текущего экрана
    setTimeout(() => {
      setActiveScreen(screen); // Меняем экран
      setQuestionSubscreen(null); // Сбрасываем подэкраны, если выходим из "вопросиков"
      setScreenTransition(false); // Запускаем анимацию появления нового экрана
    }, 500); // Время для завершения анимации скрытия
  };

  if (isLoading) {
    return <Preloader />; // Отображаем прелоадер, пока приложение загружается
  }

  return (
    <div className="app">
      <main
        className={`content ${screenTransition ? 'fade-out' : 'fade-in'} ${showContent && activeScreen === 'home' && isHomeScreenFirstRender ? 'fade-in-content' : ''}`}
      >
        {/* Основные экраны */}
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'subscription' && <SubscriptionScreen />}
        {activeScreen === 'questions' && !questionSubscreen && (
          <QuestionScreen setQuestionSubscreen={setQuestionSubscreen} />
        )}

        {/* Подэкраны для вопросиков */}
        {activeScreen === 'questions' && questionSubscreen === 'whyBetter' && <WhyBetterScreen />}
        {activeScreen === 'questions' && questionSubscreen === 'instructions' && <InstructionsScreen />}
        {activeScreen === 'questions' && questionSubscreen === 'referral' && <ReferralScreen />}
      </main>

      {/* Меню для переключения экранов */}
      <div className={`menu ${showContent ? 'fade-in-menu' : ''}`}>
        <Menu setActiveScreen={handleScreenChange} />
      </div>
    </div>
  );
};

export default App;
