import type { RectReturn } from '@wdio/protocols';
export type Location = Pick<RectReturn, 'x' | 'y'>;
declare function getLocation(this: WebdriverIO.Element): Promise<Location>;
declare function getLocation(this: WebdriverIO.Element, prop: keyof Location): Promise<number>;
export default getLocation;
//# sourceMappingURL=getLocation.d.ts.map