import { useRef, useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';

const Column = ({ state }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const tasks = useStore(({ tasks }) =>
    tasks.filter((task) => task.state === state)
  );
  
  const { setDraggedTask, addTask , draggedTask , moveTask } = useStore();
  return (
    <div
      className='column'
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {        
          moveTask(draggedTask,state);
          setDraggedTask('')
      }}>
      <div className='titleWrapper'>
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}>
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task
          title={task.title}
          key={task.title}
        />
      ))}
      {open && (
        <div className='Modal'>
          <div className='modalContent'>
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText('');
                setOpen(false);
              }}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Column;
