'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiFileText, FiChevronDown, FiArrowLeft } from 'react-icons/fi';
import my_icon from '../assets/rocket.png';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi'
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import CreateTaskForm  from './create-task/page';
type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(true);
  const [isCreateTaskVisible, setCreateTaskVisible] = useState<boolean>(false); // New state to toggle form visibility

  useEffect(() => {
    if (!isCreateTaskVisible) fetchTasks();
  }, [isCreateTaskVisible]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCreateTask = async (title: string, color: string) => {
    try {
      await axios.post('http://localhost:5000/tasks', { title, color });
      setCreateTaskVisible(false);  // Hide create task form after submitting
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <main className="home">
      <header className="navbar">
        <h1 className="logo">
          <Image src={my_icon} alt="Rocket Icon" width={30} height={30} />
          <span style={{ color: '#0e54e9' }}>Todo</span>
          <span style={{ color: '#2f477a' }}>App</span>
        </h1>
      </header>

      {isCreateTaskVisible ? (
        <div>
          <CreateTaskForm onSubmit={handleCreateTask} />
        </div>
      ) : (
        <>
          <div className="centered">
            <button
              className="create-task-button"
              onClick={() => setCreateTaskVisible(true)}
            >
              Create Task
            </button>
          </div>

          <div className="dropdown">
            <div
              className="dropdown-header"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <p>Tasks: {tasks.length}</p>
              <p>
                Completed: {tasks.filter((task) => task.completed).length} of {tasks.length}
              </p>
              <FiChevronDown />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {tasks.length === 0 ? (
                  <div className="empty-state">
                    <FiFileText size={48} />
                    <p>You don't have any tasks registered yet.</p>
                    <p>Create a task and organize your todo items.</p>
                  </div>
                ) : (
                  <div className="task-list">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        
                        className="task-item flex justify-between items-center p-4"
                        style={{ backgroundColor: task.color }}
                      >
                        <div className="flex items-center gap-2">
                        <button
      onClick={() => toggleComplete(task.id)}  
      className="checkbox-btn"
      style={{ background: 'transparent', border: 'none' }}
    >
                          {task.completed ? (
                            <FiCheckSquare  className="text-black" size={20} />
                          ) : (
                            <FiSquare className="text-black" size={20} />
                          )}
                          </button>
                          <p className="text-black">{task.title}</p>
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                          style={{ border: 'none', background: 'transparent' }}
                        >
                          <FiTrash2 size={20} className="text-black" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}


