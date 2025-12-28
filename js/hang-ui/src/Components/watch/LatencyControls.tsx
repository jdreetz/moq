import { Show } from "solid-js";
import LatencyAmount from "./LatencyAmount";
import useWatchUIContext from "./useWatchUIContext";

export default function LatencyControls() {
	const context = useWatchUIContext();

	return (
		<Show when={context.isLatencyControlsOpen()}>
			<div class="playerOverlay latencyControlsContainer">
				<h1>Latency Controls</h1>
				<div class="bufferAmountContainer">
					<div class="bufferLabels">
						<span>-{Math.floor(context.videoBufferDepth())}ms</span>
						<span>Depth: {Math.floor(context.videoBufferDepth())}ms</span>
						<span>0ms</span>
					</div>
					<progress id="videoBuffer" value={context.videoBufferDepth()} max={Math.max(2000, context.videoBufferDepth())} />
					{/*
						@todo - add audio buffer
						<label for="audioBuffer">Audio Buffer (%)</label>
						<progress id="audioBuffer" value={60} max={100} />
					*/}
				</div>
				<LatencyAmount />
			</div>
		</Show>
	);
}
