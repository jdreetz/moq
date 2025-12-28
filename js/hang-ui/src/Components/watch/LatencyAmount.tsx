import useWatchUIContext from "./useWatchUIContext";

const MIN_RANGE = 0;
const MAX_RANGE = 200_000;
const RANGE_STEP = 250;

export default function LatencyAmount() {
	const context = useWatchUIContext();
	const onInputChange = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		const latency = parseFloat(target.value);
		context.setLatencyValue(latency);
	};

	return (
		<div class="latencySliderContainer">
			<label for="latency-input" class="latencyLabel">
				Latency (ms)
			</label>
			<input
				id="latency-input"
				onChange={onInputChange}
				class="latencyInput"
				type="number"
				min={MIN_RANGE}
				max={MAX_RANGE}
				step={RANGE_STEP}
				value={context.latency()}
			/>
		</div>
	);
}
