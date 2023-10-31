import "../styles/helppopup.css";

export default function HelpPopup(props) {
  return (
    <div id="help-popup" className="popup">
      <div className="popup-content">
        <span className="close-popup" onClick={props.handleClosePopup}>
          &times;
        </span>

        <p>
          Roll until all dice are the same. Click each die to freeze at its
          current value between rolls.
        </p>
      </div>
    </div>
  );
}
