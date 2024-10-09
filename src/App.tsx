import React, { useState } from 'react';
import { Person } from './types';
import PersonnelList from './components/PersonnelList';
import PersonnelForm from './components/PersonnelForm';
import { UserPlus } from 'lucide-react';

const App: React.FC = () => {
  const [personnel, setPersonnel] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addPerson = (newPerson: Omit<Person, 'id' | 'isBanned'>) => {
    const person: Person = { ...newPerson, id: Date.now().toString(), isBanned: false };
    setPersonnel([...personnel, person]);
    setIsFormVisible(false);
  };

  const updatePerson = (updatedPerson: Omit<Person, 'id' | 'isBanned'>) => {
    if (editingPerson) {
      const updatedPersonnel = personnel.map((p) =>
        p.id === editingPerson.id ? { ...updatedPerson, id: p.id, isBanned: p.isBanned } : p
      );
      setPersonnel(updatedPersonnel);
      setEditingPerson(null);
      setIsFormVisible(false);
    }
  };

  const deletePerson = (id: string) => {
    setPersonnel(personnel.filter((p) => p.id !== id));
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setIsFormVisible(true);
  };

  const toggleBan = (id: string) => {
    setPersonnel(personnel.map((p) =>
      p.id === id ? { ...p, isBanned: !p.isBanned } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-semibold mb-6">Gestión de Acceso del Personal</h1>
          {!isFormVisible ? (
            <>
              <button
                onClick={() => setIsFormVisible(true)}
                className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <UserPlus size={18} className="mr-2" />
                Agregar Nuevo Personal
              </button>
              <PersonnelList
                personnel={personnel}
                onEdit={handleEdit}
                onDelete={deletePerson}
                onToggleBan={toggleBan}
              />
            </>
          ) : (
            <PersonnelForm
              person={editingPerson || undefined}
              onSubmit={editingPerson ? updatePerson : addPerson}
              onCancel={() => {
                setIsFormVisible(false);
                setEditingPerson(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;