import FullscreenButton from "./FullscreenButton";
import LatencyButton from "./LatencyButton";
import PlayPauseButton from "./PlayPauseButton";
import QualitySelector from "./QualitySelector";
import StatsButton from "./StatsButton";
import VolumeSlider from "./VolumeSlider";
import WatchStatusIndicator from "./WatchStatusIndicator";

export default function WatchControls() {
	return (
		<div class="watchControlsContainer">
			<div class="playbackControlsRow">
				<PlayPauseButton />
				<VolumeSlider />
				<WatchStatusIndicator />
				<FullscreenButton />
				<StatsButton />
				<LatencyButton />
			</div>
			<div class="latencyControlsRow">
				<QualitySelector />
			</div>
		</div>
	);
}
