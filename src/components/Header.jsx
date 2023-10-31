import "../styles/header.css";

export default function Header(props) {
  return (
    <header>
      <button id="show-help-button" onClick={props.handleHelpClick}>?</button>
    </header>
  );
}
