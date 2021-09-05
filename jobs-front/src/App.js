import './App.css';
import Header from './layout/Header';
import { Route, withRouter } from 'react-router-dom';
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
import Bye from './components/users/Bye';
import DeleteForm from './components/map/DeleteForm';
import MainTodo from './components/users/MainTodo';
import Body from './layout/Body';
function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let jwtTokenTemp = localStorage.getItem('Authorization');

    if (jwtTokenTemp !== null) {
      console.log('fddf');
      dispatch(login());
    }
  }, []);

  return (
    <div>
      <Header />
      <Route path="/" exact={true} component={Body} />
      <Route path="/todo" exact={true} component={ProjectItem} />
      <Route
        path="/todo/:category/:userId"
        exact={true}
        component={ProjectTask}
      />
      <Route path="/addTask/:category" exact={true} component={AddTaskForm} />
      <Route path="/updateTask/:id" exact={true} component={UpdateTaskForm} />
      <Route path="/addTodo/:id" exact={true} component={AddTodoForm} />
      <Route path="/list/detail/:id" exact={true} component={Todo} />
      <Route path="/user/login" exact={true} component={LoginForm} />
      <Route path="/user/register" exact={true} component={RegisterForm} />
      <Route path="/map/:userId" exact={true} component={MyMap} />
      <Route path="/mapInfo/add" exact={true} component={AddMapInfo} />
      <Route path="/bye" exact={true} component={Bye} />
      <Route path="/map/deleteForm/:id" exact={true} component={DeleteForm} />
      <Route
        path="/todo/update/:task_id/:id"
        exact={true}
        component={UpdateTodo}
      />
    </div>
  );
}

export default withRouter(App);
