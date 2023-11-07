/**
 * The Get Element Property command will return the result of getting a property of an element.
 *
 * <example>
    :getProperty.js
    it('should demonstrate the getProperty command', async () => {
        var elem = await $('body')
        var tag = await elem.getProperty('tagName')
        console.log(tag) // outputs: "BODY"
    })
 * </example>
 *
 * @alias element.getProperty
 * @param {String} property  name of the element property
 * @return {Object|String|Boolean|Number|null} the value of the property of the selected element
 */
export default function getProperty(this: WebdriverIO.Element, property: string): Promise<string | number | boolean | HTMLElement | Element | ChildNode | ParentNode | (() => DOMRect) | Document | ((event: Event) => boolean) | ((this: GlobalEventHandlers, ev: UIEvent) => any) | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: InputEvent) => any) | ((this: GlobalEventHandlers, ev: FocusEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: DragEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | OnErrorEventHandler | ((this: GlobalEventHandlers, ev: FocusEvent) => any) | ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | ((this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: UIEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: Event) => any) | ((this: GlobalEventHandlers, ev: WheelEvent) => any) | (() => ElementInternals) | (() => void) | {
    <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
} | {
    <K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions | undefined): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
} | NamedNodeMap | DOMTokenList | ((this: Element, ev: Event) => any) | ((this: Element, ev: Event) => any) | ShadowRoot | ((init: ShadowRootInit) => ShadowRoot) | ((options?: CheckVisibilityOptions | undefined) => boolean) | {
    <K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2] | null;
    <K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3] | null;
    <K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4] | null;
    <E extends Element = Element>(selectors: string): E | null;
} | (() => StylePropertyMapReadOnly) | ((qualifiedName: string) => string | null) | ((namespace: string | null, localName: string) => string | null) | (() => string[]) | ((qualifiedName: string) => Attr | null) | ((namespace: string | null, localName: string) => Attr | null) | (() => DOMRectList) | ((classNames: string) => HTMLCollectionOf<Element>) | {
    <K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
    <K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
    <K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
    <K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
    (qualifiedName: string): HTMLCollectionOf<Element>;
} | {
    (namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
    (namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
    (namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
    (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
} | ((qualifiedName: string) => boolean) | ((namespace: string | null, localName: string) => boolean) | (() => boolean) | ((pointerId: number) => boolean) | ((where: InsertPosition, element: Element) => Element | null) | ((position: InsertPosition, text: string) => void) | ((where: InsertPosition, data: string) => void) | ((selectors: string) => boolean) | ((pointerId: number) => void) | ((qualifiedName: string) => void) | ((namespace: string | null, localName: string) => void) | ((attr: Attr) => Attr) | ((options?: FullscreenOptions | undefined) => Promise<void>) | (() => void) | {
    (options?: ScrollToOptions | undefined): void;
    (x: number, y: number): void;
} | {
    (options?: ScrollToOptions | undefined): void;
    (x: number, y: number): void;
} | ((arg?: boolean | ScrollIntoViewOptions | undefined) => void) | {
    (options?: ScrollToOptions | undefined): void;
    (x: number, y: number): void;
} | ((qualifiedName: string, value: string) => void) | ((namespace: string | null, qualifiedName: string, value: string) => void) | ((attr: Attr) => Attr | null) | ((attr: Attr) => Attr | null) | ((pointerId: number) => void) | ((qualifiedName: string, force?: boolean | undefined) => boolean) | ((selectors: string) => boolean) | NodeListOf<ChildNode> | (<T extends Node>(node: T) => T) | ((deep?: boolean | undefined) => Node) | ((other: Node) => number) | ((other: Node | null) => boolean) | ((options?: GetRootNodeOptions | undefined) => Node) | (() => boolean) | (<T_1 extends Node>(node: T_1, child: Node | null) => T_1) | ((namespace: string | null) => boolean) | ((otherNode: Node | null) => boolean) | ((otherNode: Node | null) => boolean) | ((prefix: string | null) => string | null) | ((namespace: string | null) => string | null) | (() => void) | (<T_2 extends Node>(child: T_2) => T_2) | (<T_3 extends Node>(node: Node, child: T_3) => T_3) | ((...nodes: (string | Node)[]) => void) | ((...nodes: (string | Node)[]) => void) | (() => void) | ((options?: FocusOptions | undefined) => void) | ((keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions | undefined) => Animation) | ((options?: GetAnimationsOptions | undefined) => Animation[]) | (() => void) | ((...nodes: (string | Node)[]) => void) | HTMLCollection | ((...nodes: (string | Node)[]) => void) | ((...nodes: (string | Node)[]) => void) | {
    <K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9] | null;
    <K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10] | null;
    <K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11] | null;
    <K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12] | null;
    <E_1 extends Element = Element>(selectors: string): E_1 | null;
} | {
    <K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
    <K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
    <K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
    <K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
    <E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
} | ((...nodes: (string | Node)[]) => void) | HTMLSlotElement | StylePropertyMap | CSSStyleDeclaration | DOMStringMap | undefined>;
//# sourceMappingURL=getProperty.d.ts.map