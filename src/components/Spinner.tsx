import { Spinner as Spin } from '@chakra-ui/react'


interface SpinnerI{
    color:string,
    size:string,

}

export const Spinner = ({color,size}:SpinnerI) => {
  return (
<Spin  color={color} size={size} />
  )
}
