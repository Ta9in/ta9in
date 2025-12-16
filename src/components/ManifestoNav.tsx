import { createSignal, For, Show } from 'solid-js';

interface ManifestoItem {
    number: string;
    title: string;
    slug: string;
}

interface Props {
    items: ManifestoItem[];
    initialActive?: string;
}

export default function ManifestoNav(props: Props) {
    const [activeNumber, setActiveNumber] = createSignal(props.initialActive || '00');
    const [menuOpen, setMenuOpen] = createSignal(false);

    const handleClick = (number: string) => {
        // Use View Transition API if available
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setActiveNumber(number);
                updateHash(number);
            });
        } else {
            setActiveNumber(number);
            updateHash(number);
        }
        setMenuOpen(false);
    };

    const updateHash = (number: string) => {
        history.pushState(null, '', `#rukn-${number}`);
        // Dispatch custom event for content switching
        window.dispatchEvent(new CustomEvent('manifesto-change', { detail: { number } }));
    };

    // Handle browser back/forward
    if (typeof window !== 'undefined') {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash?.startsWith('#rukn-')) {
                setActiveNumber(hash.replace('#rukn-', ''));
            }
        });

        // Check initial hash
        const hash = window.location.hash;
        if (hash?.startsWith('#rukn-')) {
            setActiveNumber(hash.replace('#rukn-', ''));
        }
    }

    return (
        <>
            {/* Mobile Menu Toggle Button (visible via CSS) */}
            <button
                class="menu-toggle"
                aria-label="القائمة"
                aria-expanded={menuOpen()}
                onClick={() => setMenuOpen(!menuOpen())}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <Show when={menuOpen()} fallback={<path d="M3 12h18M3 6h18M3 18h18" />}>
                        <path d="M18 6L6 18M6 6l12 12" />
                    </Show>
                </svg>
            </button>

            {/* Navigation Sidebar */}
            <nav class={`nav-sidebar ${menuOpen() ? 'open' : ''}`} aria-label="الإشارات">
                <div class="logo-container">
                    <svg class="logo" viewBox="0 0 1776 1166" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M888.5 277C1133.99 277 1333 476.009 1333 721.5C1333 826.935 1296.29 923.796 1234.96 1000H1333V1166H278V1000H542.045C480.71 923.796 444 826.935 444 721.5C444 476.009 643.009 277 888.5 277ZM888.5 445C735.241 445 611 569.241 611 722.5C611 875.759 735.241 1000 888.5 1000C1041.76 1000 1166 875.759 1166 722.5C1166 569.241 1041.76 445 888.5 445Z" fill="currentColor" />
                        <path d="M1776 1082.5L1693.5 1000L1611 1082.5L1693.5 1165.5L1776 1082.5Z" fill="currentColor" />
                        <path d="M1054 82.5L971.5 0L889 82.5L971.5 165.5L1054 82.5Z" fill="currentColor" />
                        <path d="M165 1082.5L82.5 1000L0 1082.5L82.5 1165.5L165 1082.5Z" fill="currentColor" />
                        <path d="M1609 1082.5L1526.5 1000L1444 1082.5L1526.5 1165.5L1609 1082.5Z" fill="currentColor" />
                        <path d="M887 82.5L804.5 0L722 82.5L804.5 165.5L887 82.5Z" fill="currentColor" />
                    </svg>
                </div>

                <ul class="nav-list">
                    <For each={props.items}>
                        {(item) => (
                            <li>
                                <a
                                    href={`#rukn-${item.number}`}
                                    class={`nav-link ${activeNumber() === item.number ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(item.number);
                                    }}
                                >
                                    <span class="nav-number">{item.number}.</span>
                                    <span class="nav-title">{item.title}</span>
                                </a>
                            </li>
                        )}
                    </For>
                </ul>
            </nav>

            {/* Mobile overlay */}
            <Show when={menuOpen()}>
                <div class="nav-overlay" onClick={() => setMenuOpen(false)} />
            </Show>
        </>
    );
}
