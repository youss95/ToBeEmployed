import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import { Route } from 'react-router-dom';
import ProjectItem from './components/Projects/ProjectItem';
import ProjectTask from './components/Tasks/ProjectTask';
import AddTaskForm from './components/Tasks/AddTaskForm';
import UpdateTaskForm from './components/Tasks/UpdateTaskForm';
import AddTodoForm from './components/Todo/AddTodoForm';
import Todo from './components/Todo/Todo';
import UpdateTodo from './components/Todo/UpdateTodo';
import LoginForm from './components/users/LoginForm';
import RegisterForm from './components/users/RegisterForm';
import { login } from './store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MyMap from './components/map/MyMap';
import AddMapInfo from './components/map/AddMapInfo';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let jwtToken = localStorage.getItem('Authorization');

    if (jwtToken !== null) {
      dispatch(login());
    }
  }, []);

  return (
    <div>
      <Header />
      <Route path="/todo/" exact={true} component={ProjectItem} />
      <Route
        path="/todo/:category/:userId"
        exact={true}
        component={ProjectTask}
      />
      <Route path="/addTask/:category" exact={true} component={AddTaskForm} />
      <Route path="/updateTask/:id" exact={true} component={UpdateTaskForm} />
      <Route path="/addTodo/:id" exact={true} component={AddTodoForm} />
      <Route path="/todo/detail/:id" exact={true} component={Todo} />
      <Route path="/user/login" exact={true} component={LoginForm} />
      <Route path="/user/register" exact={true} component={RegisterForm} />
      <Route path="/map" exact={true} component={MyMap} />
      <Route path="/map/add" exact={true} component={AddMapInfo} />
      <Route
        path="/todo/update/:task_id/:id"
        exact={true}
        component={UpdateTodo}
      />
    </div>
  );
}

export default App;
