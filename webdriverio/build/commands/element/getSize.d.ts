import type { RectReturn } from '@wdio/protocols';
export type Size = Pick<RectReturn, 'width' | 'height'>;
declare function getSize(this: WebdriverIO.Element): Promise<Size>;
declare function getSize(this: WebdriverIO.Element, prop: keyof RectReturn): Promise<number>;
export default getSize;
//# sourceMappingURL=getSize.d.ts.map