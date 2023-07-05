import { useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import classNames from 'classnames';

const Column = ({ state }) => {
  const [text, setText] = useState('');
  const [drop, setDrop] = useState(false);
  const [open, setOpen] = useState(false);

  const tasks = useStore(({ tasks }) =>
    tasks.filter((task) => task.state === state)
  );

  const { setDraggedTask, addTask, draggedTask, moveTask } = useStore();

  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={() => {
        moveTask(draggedTask, state);
        setDrop(false);
        setDraggedTask('');
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
