import type { Codec, Full, Partial, SupportMode } from "@moq/hang/support";
import { isFirefox } from "@moq/hang/util/hacks";
import { type JSX, Show } from "solid-js";

type SupportDetailsProps = {
	support: Full;
	mode: SupportMode;
};

export default function SupportDetails(props: SupportDetailsProps) {
	return (
		<div class="supportDetailsContainer">
			<SupportRow label="WebTransport" col2="">
				<PartialFeature partial={props.support.webtransport} />
			</SupportRow>
			<Show when={props.mode !== "core"}>
				<Show when={props.mode !== "watch"}>
					<SupportRow label="Capture" col2="Audio">
						<AvailableFeature available={props.support.audio.capture} />
					</SupportRow>
					<SupportRow label="" col2="Video">
						<PartialFeature partial={props.support.video.capture} />
					</SupportRow>
					<SupportRow label="Encoding" col2="Opus">
						<PartialFeature partial={props.support.audio.encoding.opus} />
					</SupportRow>
					<SupportRow label="" col2="AAC">
						<AvailableFeature available={props.support.audio.encoding.aac} />
					</SupportRow>
					<SupportRow label="" col2="AV1">
						<HardwareSupport codec={props.support.video.encoding?.av1} />
					</SupportRow>
					<SupportRow label="" col2="H.265">
						<HardwareSupport codec={props.support.video.encoding?.h265} />
					</SupportRow>
					<SupportRow label="" col2="H.264">
						<HardwareSupport codec={props.support.video.encoding?.h264} />
					</SupportRow>
					<SupportRow label="" col2="VP9">
						<HardwareSupport codec={props.support.video.encoding?.vp9} />
					</SupportRow>
					<SupportRow label="" col2="VP8">
						<HardwareSupport codec={props.support.video.encoding?.vp8} />
					</SupportRow>
				</Show>
				<Show when={props.mode !== "publish"}>
					<SupportRow label="Rendering" col2="Audio">
						<AvailableFeature available={props.support.audio.render} />
					</SupportRow>
					<SupportRow label="" col2="Video">
						<AvailableFeature available={props.support.video.render} />
					</SupportRow>
					<SupportRow label="Decoding" col2="Opus">
						<PartialFeature partial={props.support.audio.decoding.opus} />
					</SupportRow>
					<SupportRow label="" col2="AAC">
						<AvailableFeature available={props.support.audio.decoding.aac} />
					</SupportRow>
					<SupportRow label="" col2="AV1">
						<HardwareSupport codec={props.support.video.decoding?.av1} />
					</SupportRow>
					<SupportRow label="" col2="H.265">
						<HardwareSupport codec={props.support.video.decoding?.h265} />
					</SupportRow>
					<SupportRow label="" col2="H.264">
						<HardwareSupport codec={props.support.video.decoding?.h264} />
					</SupportRow>
					<SupportRow label="" col2="VP9">
						<HardwareSupport codec={props.support.video.decoding?.vp9} />
					</SupportRow>
					<SupportRow label="" col2="VP8">
						<HardwareSupport codec={props.support.video.decoding?.vp8} />
					</SupportRow>
				</Show>
				<Show when={isFirefox}>
					<div class="supportDetailsFirefoxNote">
						*Hardware acceleration is <a href="https://github.com/w3c/webcodecs/issues/896">undetectable</a>{" "}
						on Firefox.
					</div>
				</Show>
			</Show>
		</div>
	);
}

type SupportRowProps = {
	label: string;
	col2: string;
	children: JSX.Element;
};

function SupportRow(props: SupportRowProps) {
	return (
		<>
			<div class="supportDetailsRowLabel">{props.label}</div>
			<div class="supportDetailsRowValue">{props.col2}</div>
			<div class="supportDetailsRowDetails">{props.children}</div>
		</>
	);
}

type AvailableFeatureProps = {
	available?: boolean;
};

function AvailableFeature(props: AvailableFeatureProps) {
	return props.available ? "🟢 Yes" : "🔴 No";
}

type HardwareSupportProps = {
	codec?: Codec;
};

function HardwareSupport(props: HardwareSupportProps) {
	return props.codec?.hardware
		? "🟢 Hardware"
		: props.codec?.software
			? `🟡 Software${isFirefox ? "*" : ""}`
			: "🔴 No";
}

type PartialFeatureProps = {
	partial?: Partial;
};

function PartialFeature(props: PartialFeatureProps) {
	return props.partial === "full" ? "🟢 Full" : props.partial === "partial" ? "🟡 Polyfill" : "🔴 None";
}
