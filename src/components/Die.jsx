export default function Die(props) {
  return (
    <>
      <div
        className="die"
        onClick={() => props.handleDieClick(props.id)}
        style={{
          backgroundColor: props.isHeld ? "green" : "white",
          color: props.isHeld ? "white" : "black",
        }}
      >
        <p>{props.number}</p>
      </div>
    </>
  );
}
