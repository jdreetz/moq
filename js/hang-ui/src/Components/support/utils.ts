import type { Full, SupportMode } from "@moq/hang/support";
import type { Summary } from "./types";

export function getSummary(support: Full, mode: SupportMode): Summary {
	const core = support.webtransport;
	if (core === "none" || mode === "core") return core;

	if (mode === "watch") {
		return getWatchSupport(support);
	}

	if (mode === "publish") {
		return getPublishSupport(support);
	}

	const watch = getWatchSupport(support);
	const publish = getPublishSupport(support);

	if (watch === "none" || publish === "none") return "none";
	if (watch === "partial" && publish === "partial") return "partial";

	return "full";
}

export function getWatchSupport(support: Full): Summary {
	if (!support.audio.decoding || !support.video.decoding) return "none";
	if (!support.audio.render || !support.video.render) return "none";

	if (!Object.values(support.audio.decoding).some((v) => v)) return "none";
	if (!Object.values(support.video.decoding).some((v) => v.software || v.hardware)) return "none";

	if (!Object.values(support.audio.decoding).every((v) => v)) return "partial";
	if (!Object.values(support.video.decoding).every((v) => v.software || v.hardware)) return "partial";

	return "full";
}

export function getPublishSupport(support: Full): Summary {
	if (!support.audio.encoding || !support.video.encoding) return "none";
	if (!support.audio.capture) return "none";

	if (!Object.values(support.audio.encoding).some((v) => v)) return "none";
	if (!Object.values(support.video.encoding).some((v) => v.software || v.hardware)) return "none";

	if (support.video.capture === "partial") return "partial";

	if (!Object.values(support.video.encoding).some((v) => v.hardware)) return "partial";

	return "full";
}
