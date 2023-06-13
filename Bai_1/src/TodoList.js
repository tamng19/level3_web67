import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = () => {
  return (
    <div className="todo-list-container">
      <div className="todo-item-container">
        <FaRegCircle className="item-done-button" color="#9a9a9a" />
        <div className="item-title">Build some websites</div>
      </div>
      <div className="todo-item-container">
        <FaRegCircle className="item-done-button" color="#9a9a9a" />
        <div className="item-title">Do excercises</div>
      </div>
      <div className="todo-item-container">
        <FaRegCircle className="item-done-button" color="#9a9a9a" />
        <div className="item-title">Go shopping</div>
      </div>
      <div className="todo-item-container done">
        <FaRegCheckCircle color="#9a9a9a" className="item-done-button" />
        <div className="item-title">House cleaning</div>
      </div>
    </div>
  );
};

export default TodoList;
