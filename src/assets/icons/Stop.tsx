// <svg width="25" height="25" viewBox="0 0 25 25" fill="#777777" xmlns="http://www.w3.org/2000/svg">
//
//     <g id="SVGRepo_iconCarrier"> <rect x="7.5" y="7.5" width="10" height="10"/> </g>
//
// </svg>
type iconProp = {
    color: string;
    width: string;
    height: string;
}
export const StopIcon = ( { color, width, height}: iconProp) => (
    <svg width={width} height={height} viewBox="0 0 25 25" fill={color} xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_iconCarrier">
            <rect x="7.5" y="7.5" width="10" height="10"/>
        </g>
    </svg>
);

export default StopIcon;
