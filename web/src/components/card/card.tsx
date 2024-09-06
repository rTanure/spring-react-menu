import "./card.css"

import { useFoodDataDelete } from "../../hooks/useFoodDataDelete"
import { useEffect } from "react"

interface CardProps {
  id: number,
  price: number,
  title: string,
  image: string
}

export default function Card({price, image, title, id}: CardProps) {
  const { mutate, isSuccess, isError, error } = useFoodDataDelete()

  const handleDelete = (id: number) => {
    // console.log(id)
    mutate(id)
  }

  useEffect(() => {
    if (isSuccess) {
      // alert("Item deletado com sucesso")
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      alert("Erro ao deletar item")
      console.log(error)
    }
  }, [isError])


  return (
    <div className='card'>
      <button className="btn-delete" onClick={() => handleDelete(id)}>delete</button>
      <img src={image}/>
      <h2>{title}</h2>
      <p><b>Valor: {price}</b></p>
    </div>
  )
}

