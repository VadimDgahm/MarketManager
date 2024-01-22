import { useParams } from "react-router-dom";
import {useGetClientByIdQuery} from '@/services/clients/clients.services';
import {Typography} from '@/components/ui/typography';
import {Input} from '@/components/ui/Input';
import {useState} from 'react';

export const Client = () => {
  const param = useParams();
  const {data}= useGetClientByIdQuery({id: param.id})

  return <div>
    <Typography variant={'h1'}>Карточка клиента</Typography>
    <EditableText text={data?.name} onChange={(newText) => console.log(newText)} />


  </div>;
};
type EditableTextProps = {
  text: string
  onChange: ((newText: string) => void)
}
const EditableText = ({text, onChange}:EditableTextProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(text)
  const onChangeText = () => {
    onChange(value)
    setIsOpen(false)
  }
  return(
      <div>
        {!isOpen ?  <Typography onDoubleClick={()=> setIsOpen(true)}>{value}</Typography> : <Input autoFocus  onBlur={onChangeText} onValueChange={setValue} defaultValue={value}/>}
      </div>
  )
}