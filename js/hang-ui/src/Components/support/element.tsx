import { customElement } from "solid-element";
import { createEffect, createSignal } from "solid-js";
import { Show } from "solid-js/web";
import styles from "./styles.css?inline";
import type { Full, SupportMode } from "@moq/hang/support";
import { isSupported } from "@moq/hang/support";
import { getSummary } from "./utils";
import type { Summary } from './types';
import SupportHeader from "./SupportHeader";
import SupportDetails from "./SupportDetails";

type ExposedAttributes = {
    details: boolean;
    mode: SupportMode;
    show: Summary;
}

customElement<ExposedAttributes>("hang-support-ui", {
    mode: "all",
    details: false,
    show: "full",
}, function SupportControlsWebComponent(props) {
	const [supportInfo, setSupportInfo] = createSignal<Full | undefined>(undefined);
    const [summary, setSummary] = createSignal<Summary>("none");
    const [closed, setClosed] = createSignal(false);
    const [details, setDetails] = createSignal(props.details);
    
    createEffect(() => {
        const show = props.show;

        switch (show) {
            case "partial":
                // Only show if have partial support
                if (summary() === "full") setClosed(true);
                break;
            case "none":
                // Only show if we don't support a features
                if (summary() !== "none") setClosed(true);
                break;
            default:
                setClosed(false);
                break;
        }
    })
    
    isSupported().then((support) => {
        setSupportInfo(support);
        setSummary(getSummary(support, props.mode));
    });

    return (
        <Show when={!closed() && supportInfo()} keyed>
            {(support: Full) => (
                <>
                    <style>{styles}</style>
                    <div class="supportContainer">
                        <SupportHeader summary={summary()} setClosed={setClosed} setDetailsDisplay={setDetails} details={details()} />
                        <Show when={details()}>
                            <SupportDetails support={support} mode={props.mode}/>
                        </Show>
                    </div>
                </>
            )}
        </Show>
    );

    // const [hangSupportEl, setHangSupportEl] = createSignal<HangSupport | undefined>();

	// onMount(async () => {
	// 	const supportEl = element.querySelector("hang-support");
	// 	await customElements.whenDefined("hang-support");
	// 	setHangSupportEl(supportEl);
	// });

	// return (
	// 	<Show when={hangSupportEl()} keyed>
	// 		{(supportEl: HangSupport) => (
	// 			<SupportControlsContextProvider hangSupport={supportEl}>
	// 				<SupportControls />
	// 			</SupportControlsContextProvider>
	// 		)}
	// 	</Show>
	// );
});