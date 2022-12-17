import './aux-card.css';

interface IAuxCard {
  sumPercentages: number,
  allDataIsValid: boolean
}

export const AuxCard = ({ sumPercentages, allDataIsValid }: IAuxCard) => {
  return (
    <>
      {sumPercentages === 0 ?
        <div className='card'>
          <p>enter the percentage values ​​in the red boxes</p>
        </div> :
        !allDataIsValid ?
          <div className="categories--warning__container">
            <i className="fa-solid fa-triangle-exclamation warning--icon"></i>
            <p className="categories--warning">the sum of the percentages must be 100% and no category must have 0%</p>
          </div> :
          <div className="hollow--card"></div>
      }
    </>
  )
}