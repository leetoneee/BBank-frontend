import { PropTypes } from "prop-types";
import { classNames } from "../classNames/classNames";

export const Tooltip = ({ position, content, children }) => {
    return (
        <div id="tooltip" className="relative cursor-pointer group">
            <div className="mx-2 my-1">{children}</div>
            <span className={classNames(
                "absolute hidden group-hover:inline-block bg-[#767676] text-white text-base p-2 whitespace-nowrap rounded",
                position === "top" ?
                    "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
                    : "",
                position === "bottom" ?
                    "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"
                    : "",
                position === "left" ?
                    "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"
                    : "",
                position === "right" ?
                    "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"
                    : "",
            )}
            >{content}</span>
            <span className={classNames(
                "absolute hidden group-hover:inline-block border-[5px]",
                position === "top" ? "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-trasparent border-t-neutral-900 border-b-0" : "",
                position === "bottom" ? "left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-trasparent border-t-0 border-b-neutral-900" : "",
                position === "left" ? "top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-trasparent border-r-0 border-l-neutral-900" : "",
                position === "right" ? "top-1/2 -translate-y-1/2 left-full border-t-transparent border-b-trasparent border-l-0 border-r-neutral-900" : ""
            )}
            ></span>
        </div>
    )
};

Tooltip.propTypes = {
    position: PropTypes.oneOf(["top", "bottm", "left", "right"]).isRequired,
    content: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}