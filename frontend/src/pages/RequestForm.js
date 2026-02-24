import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI, requestsAPI } from '../services/api';
import useAuthStore from '../store/authStore';

const NEIGHBORHOODS = [
  'Palermo', 'Belgrano', 'Recoleta', 'Caballito', 'Villa Urquiza',
  'Flores', 'Almagro', 'Villa Crespo', 'Núñez', 'Colegiales'
];

const RequestForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthStore();
  const [problemType, setProblemType] = useState('');

  const onSubmit = async (data) => {
    try {
      // Si no está autenticado, hacer registro rápido
      if (!isAuthenticated) {
        const quickRegResult = await authAPI.quickRegister({
          name: data.name,
          phone: data.phone,
          address: {
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood
          }
        });
        
        login(quickRegResult.data.data, quickRegResult.data.data.token);
      }
      
      // Crear solicitud
      const requestData = {
        problemType: data.problemType,
        description: data.description,
        location: {
          address: {
            street: data.street,
            number: data.number,
            floor: data.floor,
            apartment: data.apartment,
            neighborhood: data.neighborhood,
            additionalInfo: data.additionalInfo
          }
        },
        urgency: data.urgency || 'Media'
      };
      
      await requestsAPI.create(requestData);
      
      toast.success('¡Solicitud enviada! Los plomeros de tu zona fueron notificados.');
      navigate('/my-requests');
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error al enviar la solicitud');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Solicitar Presupuesto
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8">
        {!isAuthenticated && (
          <div className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Sus Datos</h3>
            
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Nombre completo *</label>
              <input
                {...register('name', { required: 'El nombre es obligatorio' })}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="Juan Pérez"
              />
              {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Teléfono *</label>
              <input
                {...register('phone', { required: 'El teléfono es obligatorio' })}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
                placeholder="11 1234-5678"
              />
              {errors.phone && <p className="text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-4">¿Qué necesita arreglar?</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {['Canilla', 'Inodoro', 'Pérdida', 'Otro'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProblemType(type)}
              className={`p-4 border-2 rounded-lg text-lg font-semibold ${
                problemType === type
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <input type="hidden" {...register('problemType')} value={problemType} />
        
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Describa el problema *</label>
          <textarea
            {...register('description', { required: 'La descripción es obligatoria' })}
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            rows="3"
            placeholder="Ej: Gotea la canilla de la cocina"
          />
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>
        
        <h3 className="text-xl font-bold mb-4 mt-8">Dirección del servicio</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-lg font-semibold mb-2">Calle *</label>
            <input
              {...register('street', { required: 'La calle es obligatoria' })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            />
            {errors.street && <p className="text-red-500 mt-1">{errors.street.message}</p>}
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Número *</label>
            <input
              {...register('number', { required: 'El número es obligatorio' })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            />
            {errors.number && <p className="text-red-500 mt-1">{errors.number.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-lg font-semibold mb-2">Piso</label>
            <input
              {...register('floor')}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Depto</label>
            <input
              {...register('apartment')}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Barrio *</label>
          <select
            {...register('neighborhood', { required: 'El barrio es obligatorio' })}
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
          >
            <option value="">Seleccione su barrio</option>
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.neighborhood && <p className="text-red-500 mt-1">{errors.neighborhood.message}</p>}
        </div>
        
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2">Información adicional</label>
          <input
            {...register('additionalInfo')}
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
            placeholder="Ej: Timbre 3B, Puerta verde"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-2xl font-bold py-5 rounded-xl hover:bg-blue-700 shadow-lg"
        >
          ENVIAR SOLICITUD
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
