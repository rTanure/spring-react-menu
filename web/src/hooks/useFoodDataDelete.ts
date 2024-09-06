import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/foodData"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = "http://localhost:8080"

const deleteData = async (id: number): AxiosPromise<unknown> => {
  const response = await axios.delete(`${API_URL}/food/${id}`)
  return response
} 

export function useFoodDataDelete() {
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: deleteData,
    // retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['food-data']})
    }
  })

  return mutate
}