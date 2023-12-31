import { Tag } from '../types';
import HookStats from './hook';
import RunnableStats from './runnable';
import TestStats from './test';
export interface Suite {
    type?: string;
    title: string;
    parent?: string;
    fullTitle: string;
    pending?: boolean;
    file: string;
    duration?: number;
    cid?: string;
    specs?: string[];
    uid?: string;
    tags?: string[] | Tag[];
    description?: string;
    rule?: string;
}
/**
 * Class describing statistics about a single suite.
 */
export default class SuiteStats extends RunnableStats {
    uid: string;
    cid?: string;
    file: string;
    title: string;
    fullTitle: string;
    tags?: string[] | Tag[];
    tests: TestStats[];
    hooks: HookStats[];
    suites: SuiteStats[];
    parent?: string;
    /**
     * an array of hooks and tests stored in order as they happen
     */
    hooksAndTests: (HookStats | TestStats)[];
    description?: string;
    rule?: string;
    constructor(suite: Suite);
}
//# sourceMappingURL=suite.d.ts.map