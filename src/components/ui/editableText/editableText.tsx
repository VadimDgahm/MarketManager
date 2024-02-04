import {useState} from 'react';
import {Typography} from '@/components/ui/typography';
import {Input} from '@/components/ui/Input';
import s from './editableText.module.scss'
type EditableTextProps = {
    text: string
    onChange: ((newText: string) => void)
    title?: string
}

export const EditableText = ({text, onChange,title}: EditableTextProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(text)
    const onChangeText = () => {
        onChange(value)
        setIsOpen(false)
    }
    return (
        <div className={s.box}>
            {title &&  <Typography className={s.title} variant={'body2'}>{title}:</Typography>}
            {!isOpen
                ? <Typography className={s.text} onDoubleClick={() => setIsOpen(true)}>{value}</Typography>
                : <Input autoFocus onBlur={onChangeText} onValueChange={setValue} defaultValue={value}/>}
        </div>
    )
}