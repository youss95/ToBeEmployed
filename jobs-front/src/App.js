import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import { Route } from 'react-router-dom';
import ProjectItem from './components/Projects/ProjectItem';
import ProjectTask from './components/Tasks/ProjectTask';
import AddTaskForm from './components/Tasks/AddTaskForm';
import UpdateTaskForm from './components/Tasks/UpdateTaskForm';

function App() {
  return (
    <div>
      <Header />
      <Route path="/todo/" exact={true} component={ProjectItem} />
      <Route path="/todo/:category" exact={true} component={ProjectTask} />
      <Route path="/addTask/:category" exact={true} component={AddTaskForm} />
      <Route path="/updateTask/:id" exact={true} component={UpdateTaskForm} />
    </div>
  );
}

export default App;
