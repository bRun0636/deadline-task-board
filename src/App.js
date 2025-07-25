import { useState } from 'react';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import Navbar from './components/Navbar/Navbar';
import './styles.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 

function App() {
  const [theme, setTheme] = useState('dark');
  const [isNavbarClosed, setIsNavbarClosed] = useState(true);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`app ${theme}`}>
        <Navbar 
          toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          theme={theme}
          isClosed={isNavbarClosed}
          toggleNavbar={() => setIsNavbarClosed(!isNavbarClosed)}
        />
        
        <div className={`main-content ${isNavbarClosed ? 'navbar-closed' : ''}`}>
          <KanbanBoard isNavbarClosed={isNavbarClosed} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
