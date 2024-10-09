import React from 'react';
import { Person } from '../types';
import { Edit, Trash2, Ban, Undo } from 'lucide-react';

interface PersonnelListProps {
  personnel: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
  onToggleBan: (id: string) => void;
}

const PersonnelList: React.FC<PersonnelListProps> = ({ personnel, onEdit, onDelete, onToggleBan }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Acceso</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {personnel.map((person) => (
            <tr key={person.id} className={person.isBanned ? 'bg-red-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{person.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  person.accessLevel === 'low' ? 'bg-green-100 text-green-800' :
                  person.accessLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {person.accessLevel === 'low' ? 'Bajo' : person.accessLevel === 'medium' ? 'Medio' : 'Alto'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  person.isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {person.isBanned ? 'Bloqueado' : 'Activo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => onEdit(person)} className="text-indigo-600 hover:text-indigo-900 mr-3" title="Editar">
                  <Edit size={18} />
                </button>
                <button onClick={() => onToggleBan(person.id)} className="text-yellow-600 hover:text-yellow-900 mr-3" title={person.isBanned ? "Desbloquear" : "Bloquear"}>
                  {person.isBanned ? <Undo size={18} /> : <Ban size={18} />}
                </button>
                <button onClick={() => onDelete(person.id)} className="text-red-600 hover:text-red-900" title="Eliminar">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-semibold">Instrucciones de Acciones:</p>
        <ul className="list-disc list-inside ml-4">
          <li><Edit size={16} className="inline mr-2 text-indigo-600" /> Editar: Modificar la información del personal</li>
          <li><Ban size={16} className="inline mr-2 text-yellow-600" /> Bloquear/Desbloquear: Cambiar el estado de acceso del personal</li>
          <li><Trash2 size={16} className="inline mr-2 text-red-600" /> Eliminar: Remover al personal de la lista</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonnelList;