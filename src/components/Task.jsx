import { useStore } from '../store';
import './Task.css';
import cls from 'classnames';
import trash from '../../public/trash.png';
const Task = ({ title }) => {
  const task = useStore(({ tasks }) =>
    tasks.find((task) => task.title === title)
  );

  const { setDraggedTask, deleteTask } = useStore();
    
  return (
      <div className='task'
          draggable
          onDragStart={() => {
              setDraggedTask(title)
          }}>
      <div>{title}</div>
      <div className='bottomWrapper'>
        <div onClick={() => deleteTask(task.title)}>
          <img
            className='task-icon'
            alt='icon trash'
            src={trash}
          />
        </div>
        <div className={cls('status', task.state)}>{task.state}</div>
      </div>
    </div>
  );
};
export default Task;
