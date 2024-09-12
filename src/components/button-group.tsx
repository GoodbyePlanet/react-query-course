import "./button-group.css";

type SetIdCallback = (id: number) => number;
type HandleSetId = (callback: SetIdCallback) => void;
type Props = {
  handleSetId: HandleSetId
}

export default function ButtonGroup({handleSetId}: Props) {
  const handlePrevious = () => handleSetId((id) => id > 1 ? id - 1 : id)
  const handleNext = () => handleSetId((id) => id + 1)

  return (
    <div className="button-group">
      <button name="previous" onClick={handlePrevious}>
        ←
      </button>
      <button name="next" onClick={handleNext}>
        →
      </button>
    </div>
  )
}
