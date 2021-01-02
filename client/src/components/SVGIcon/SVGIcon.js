
import './SVGIcon.css';

const SVGIcon = ({ iconObj, iconName, classNames}) => {

    return (
        <svg className={"SVGIcon ".concat(classNames)} >
            <use xlinkHref={`${iconObj}#${iconName}`}/>
        </svg>
    );
};

export default SVGIcon;