import React, {useEffect, useMemo, useRef, useState} from "react";
import * as ethereum from "@/lib/ethereum";
import * as main from "@/lib/main";

interface Props {
    wallet: any
}

const TextConnection: React.FC<Props> = ({wallet}) => {

    const walletAddress = wallet?.details.account ? wallet?.details.account : "";
    return (
        <div>
            <span className="text-connected">
                Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
            </span>
        </div>
    );
};

export default TextConnection;
