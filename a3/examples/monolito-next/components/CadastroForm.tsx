'use client'

import { useForm } from 'react-hook-form'

type FormData = {
  nomeCompleto: string
  email: string
  telefone: string
}

export default function CadastroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    console.log('Cadastro:', data)
    reset()
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cadastro</h2>

      {isSubmitSuccessful && (
        <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          Cadastro realizado com sucesso!
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {/* Nome completo */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">
            Nome completo
          </label>
          <input
            id="nomeCompleto"
            type="text"
            placeholder="Ana Silva"
            className={`border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 transition ${
              errors.nomeCompleto ? 'border-red-400' : 'border-gray-300'
            }`}
            {...register('nomeCompleto', {
              required: 'Nome é obrigatório',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
          />
          {errors.nomeCompleto && (
            <span className="text-xs text-red-500">{errors.nomeCompleto.message}</span>
          )}
        </div>

        {/* E-mail */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="ana@email.com"
            className={`border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 transition ${
              errors.email ? 'border-red-400' : 'border-gray-300'
            }`}
            {...register('email', {
              required: 'E-mail é obrigatório',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' },
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="telefone" className="text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            placeholder="(11) 91234-5678"
            className={`border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 transition ${
              errors.telefone ? 'border-red-400' : 'border-gray-300'
            }`}
            {...register('telefone', {
              required: 'Telefone é obrigatório',
              pattern: { value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, message: 'Telefone inválido' },
            })}
          />
          {errors.telefone && (
            <span className="text-xs text-red-500">{errors.telefone.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 bg-gray-900 text-white text-sm font-medium py-2.5 rounded hover:bg-gray-700 transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
