import { createSignal, For, Show, onMount } from 'solid-js';

interface ManifestoItem {
    number: string;
    title: string;
    content: string;
    illustration?: string;
}

interface Props {
    items: ManifestoItem[];
}

export default function ManifestoContent(props: Props) {
    const [activeNumber, setActiveNumber] = createSignal('00');

    onMount(() => {
        // Check for hash on load
        const hash = window.location.hash;
        if (hash && hash.startsWith('#rukn-')) {
            const number = hash.replace('#rukn-', '');
            setActiveNumber(number);
        }

        // Listen for nav changes
        window.addEventListener('manifesto-change', ((e: CustomEvent) => {
            setActiveNumber(e.detail.number);
        }) as EventListener);

        // Handle back/forward
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash?.startsWith('#signal-')) {
                setActiveNumber(hash.replace('#signal-', ''));
            }
        });
    });

    return (
        <main class="content-area">
            <For each={props.items}>
                {(item) => (
                    <section
                        id={`rukn-${item.number}`}
                        class={`signal-section ${activeNumber() === item.number ? 'active' : ''}`}
                        style={{
                            "view-transition-name": `signal-${item.number}` // Keep view-transition-name stable or update if needed, but ID is what matters for hash
                        }}
                    >
                        <div class="signal-inner">
                            <div class="signal-text">
                                <header class="signal-header">
                                    <span class="signal-number">{item.number}.</span>
                                    <h1
                                        class="signal-title"
                                        style={`view-transition-name: title-${item.number};`}
                                    >
                                        {item.title}
                                    </h1>
                                </header>
                                <div class="signal-body">
                                    <For each={item.content.split('\n\n')}>
                                        {(paragraph) => <p>{paragraph}</p>}
                                    </For>
                                </div>
                            </div>

                            <div
                                class="signal-illustration"
                                style={`view-transition-name: illustration-${item.number};`}
                            >
                                <Show
                                    when={item.illustration}
                                    fallback={
                                        <div class="illustration-placeholder">
                                            <span class="placeholder-number">{item.number}</span>
                                        </div>
                                    }
                                >
                                    <img src={item.illustration} alt={item.title} />
                                </Show>
                            </div>
                        </div>
                    </section>
                )}
            </For>
        </main>
    );
}
