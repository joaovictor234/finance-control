import { formatDataBRL } from '../../../../services/formatData'
import './item.css'

interface IItem {
  value: number,
  description: string,
  category: string,
  data: Date
}

export const Item = ({ value, category, description, data }: IItem) => {
  return (
    <div className='item--container'>
      <div>
        <div>
          <p className='item--emphasis'>{value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
          <p className='item--emphasis item--leftBar'>{category}</p>
          <p className='item--emphasis item--leftBar'>{formatDataBRL(data)}</p>
        </div>
      </div>
      <p className='item'>{description}</p>
    </div>
  )
}