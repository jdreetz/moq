import type { Summary } from "./types";

type SupportHeaderProps = {
    summary: Summary;
    details: boolean;
    setClosed: (closed: boolean) => void;
    setDetailsDisplay: (details: boolean) => void;
}

export default function SupportHeader(props: SupportHeaderProps) {
    const status = getStatusText(props.summary);

    return (
        <div class="supportHeaderContainer">
            <div class="supportHeaderStatus">
                {status}
            </div>
            <button type="button" class="supportHeaderButton" onClick={() => props.setClosed(true)}>Close ❌</button>
            <button type="button" class="supportHeaderButton" onClick={() => props.setDetailsDisplay(!props.details)}>Details {props.details ? "➖" : "➕"}</button>
        </div>
    )
}

function getStatusText(summary: Summary) {
    switch (summary) {
        case "full":
            return "🟢 Full Browser Support";
        case "partial":
            return "🟡 Partial Browser Support";
        case "none":
            return "🔴 No Browser Support";
    }
}
