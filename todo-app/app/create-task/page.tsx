'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

const CreateTask = ({ onSubmit }: { onSubmit: (title: string, color: string) => void }) => {
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>('red');
  const [showModal, setShowModal] = useState<boolean>(false); // For showing success modal
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, color);
    setShowModal(true); 
    setTimeout(() => {
      setShowModal(false);
      router.push('/'); 
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg">
      <div className="flex items-center text-lg text-blue-600 cursor-pointer mb-6" onClick={() => router.push('/')}>
        <FiArrowLeft className="mr-2" />
        Back to Tasks
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Ex. Brush your teeth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-semibold text-gray-700 mb-2">
            Color
          </label>
          <div className="flex space-x-2">
            {['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'brown', 'pink', 'gray', 'indigo'].map((clr) => (
              <button
                key={clr}
                type="button"
                onClick={() => setColor(clr)}
                className={`w-8 h-8 rounded-full border-2 ${clr === color ? 'border-blue-500' : 'border-transparent'}`}
                style={{ backgroundColor: clr }}
              />
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
      </form>

       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-semibold text-green-600">Task Added Successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
