import { Route, Redirect, Switch, Link } from 'react-router-dom';

import './App.css';

import Home from './pages/test2/home';
import TodoList from './pages/test1/todolist';

function AsideBar() {
  return (
    <aside className="aside">
        <Link to="/test2" className="aside-item">home</Link>
        <Link to={{pathname:'/test1', query:{content:1234}}} className="aside-item">todoList</Link>
    </aside>
  );
}

function NavBar() {
  return (
    <header className="header">
        <div className="header-content">
            <Link to="/test2" className="header-item">home</Link>
            <Link to="/test1" className="header-item">todoList</Link>
        </div>
    </header>
  );
}

function App() {

  return (
    <div className="div">
        <NavBar/>
        <div className="content">
            <AsideBar/>
            <main className="router-view">
                <Switch>
                    <Redirect exact from="/" to="/test2"></Redirect>
                    <Route path="/test2" component={Home}></Route>
                    <Route path="/test1" component={TodoList}></Route>
                </Switch>
            </main>
        </div>
    </div>
  );
}

export default App;