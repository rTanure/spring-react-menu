import { useEffect, useState } from "react"
import { FoodData } from "../../interface/foodData"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate"
import "./modal.css"

interface InputProps {
  label: string,
  value: string | number,
  updateValue(value: unknown): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input 
        type={typeof value === "number" ? "number" : "text"}
        value={value} 
        onChange={event => updateValue(event.target.value)} 
      />
    </>
  )
}

interface CreateModalProps {
  closeModal(): void
}

export default function CreateModal({closeModal}: CreateModalProps) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const { mutate, isSuccess, isError } = useFoodDataMutate()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const foodData: FoodData = {
      title,
      price,
      image
    }

    mutate(foodData)
  }

  useEffect(() => {
    if (isSuccess) {
      closeModal()
    }
  }, [closeModal, isSuccess])

  useEffect(() => {
    if (isError) {
      alert("Erro ao cadastrar item")
    }
  }, [isError])

  return (
    <div className='modal-overlay'>
      <div className='modal-body'>
        <h2>Cadastre um novo item</h2>
        <form className='input-container' onSubmit={submit}>
          <Input label="Title" value={title} updateValue={setTitle}/>
          <Input label="Price" value={price} updateValue={setPrice}/>
          <Input label="Image" value={image} updateValue={setImage}/>
          <div className="modal-footer">
            <button type="button" onClick={closeModal} className="btn-outline">Cancelar</button>
            <button type="submit" className="btn-secondary">Postar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
