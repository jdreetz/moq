import useWatchUIContext from "./useWatchUIContext";

export default function LatencyButton() {
	const context = useWatchUIContext();
	const onClick = () => {
		context.toggleLatencyControls();
	};

	return (
		<button
			type="button"
			title={context.isLatencyControlsOpen() ? "Close Latency Controls" : "Open Latency Controls"}
			class="watchControlButton"
			onClick={onClick}
		>
			⏱️
		</button>
	);
}
