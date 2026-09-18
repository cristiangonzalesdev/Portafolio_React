export default function Loader({ hidden }) {
  return (
    <div id="loader" aria-hidden="true" style={hidden ? { display: 'none' } : undefined}>
      <div className="mark">
        CG
        <div className="bar"><span></span></div>
        DIGITAL LAB
      </div>
    </div>
  );
}
