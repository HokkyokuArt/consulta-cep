import { useState } from 'react'
import './App.css'

function App() {
  const _url = 'https://viacep.com.br/ws/_CEP/json/';

  const [loading, setLoading] = useState<boolean>(false)
  const [cep, setCep] = useState<string>('')
  const [viaCep, setViaCep] = useState<{
    cep: string,
    logradouro: string,
    complemento?: string,
    bairro: string,
    localidade: string,
    uf: string
  }>({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: ''
  });

  const handleTest = async (e: any) => {
    e.preventDefault();
    if (cep && cep.length === 8) {
      setLoading(true)
      let teste = await fetch(_url.replace('_CEP', cep)).then(res => res.json()).then(data => data)
      setViaCep(teste)
      setCep('')
      setLoading(false)

    }
  }

  if (loading) {
    return (<p>Carregando...</p>)
  }

  return (
    <div className="App">
      <div className='title'>
        <h1>Consulta Cep</h1>
        <img src="/world.png" alt="" />
      </div>


      <ul>
        <li>
          <span>Cep:</span> <span>{viaCep.cep}</span>
        </li>
        <li>
          <span>Logradouro:</span> <span>{viaCep.logradouro}</span>
        </li>
        <li>
          <span>Complemento:</span> <span>{viaCep.complemento}</span>
        </li>
        <li>
          <span>Bairro:</span> <span>{viaCep.bairro}</span>
        </li>
        <li>
          <span>Localidade:</span> <span>{viaCep.localidade}</span>
        </li>
        <li>
          <span>UF:</span> <span>{viaCep.uf}</span>
        </li>
      </ul>

      <form onSubmit={handleTest}>
        <label htmlFor="ipt"></label>
        <input
          type="number"
          name="ipt"
          placeholder="Insira seu cep"
          onChange={e => setCep(e.target.value)}
          value={cep || ''}
          required
        />

        {/* <input type="submit" value="Buscar" /> */}

        <button className='btn' type="submit">
          <span ></span>
          <span></span>
          <span></span>
          <span></span>
          Buscar
        </button>

      </form>

    </div>
  )
}

export default App
