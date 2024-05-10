import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';

function Recepit(props) {
    // const getPageMargins = (marginTop, marginRight, marginBottom, marginLeft) => {
    //     return `
    //       @page {
    //         margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
    //         size: A4;
    //       }
    //     `;
    // };

    // // Define your desired margin values
    // const marginTop = '0';
    // const marginBottom = '0';
    // const marginRight = '0'; // Assuming inches as the unit
    // const marginLeft = '0'; // Assuming inches as the unit

    // const contentToPrint = useRef(null);

    return(
        <div >
            <span className="text-[#14352a]">Ngân hàng TMCP Ngoại Thương UIT-Together</span>

            {/* <style>{getPageMargins(marginTop, marginRight, marginBottom, marginLeft)}</style> */}
        </div>
    )
}

export default Recepit;