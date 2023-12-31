import type { Browser, CustomInstanceCommands } from 'webdriverio';
import type { FormFactor, Audit, AuditResult, LHAuditResult, ErrorAudit } from './types';
import type { Trace } from './gatherer/trace';
import type { CDPSessionOnMessageObject } from './gatherer/devtools';
export default class Auditor {
    private _traceLogs?;
    private _devtoolsLogs?;
    private _formFactor?;
    private _url?;
    constructor(_traceLogs?: Trace | undefined, _devtoolsLogs?: CDPSessionOnMessageObject[] | undefined, _formFactor?: FormFactor | undefined);
    _audit(AUDIT: Audit, params?: {}): Promise<LHAuditResult> | ErrorAudit;
    /**
     * an Auditor instance is created for every trace so provide an updateCommands
     * function to receive the latest performance metrics with the browser instance
     */
    updateCommands(browser: Browser<'async'>, customFn?: CustomInstanceCommands<Browser<'async'>>['addCommand']): void;
    /**
     * Returns a list with a breakdown of all main thread task and their total duration
     */
    getMainThreadWorkBreakdown(): Promise<{
        group: string;
        duration: number;
    }[]>;
    /**
     * Get some useful diagnostics about the page load
     */
    getDiagnostics(): Promise<any>;
    /**
     * Get most common used performance metrics
     */
    getMetrics(): Promise<{
        timeToFirstByte: number;
        serverResponseTime: number;
        domContentLoaded: number;
        firstVisualChange: number;
        firstPaint: number;
        firstContentfulPaint: number;
        firstMeaningfulPaint: number;
        largestContentfulPaint: number;
        lastVisualChange: number;
        interactive: number;
        load: number;
        speedIndex: number;
        totalBlockingTime: number;
        maxPotentialFID: number;
        cumulativeLayoutShift: number;
    }>;
    /**
     * Returns the Lighthouse Performance Score which is a weighted mean of the following metrics: firstMeaningfulPaint, interactive, speedIndex
     */
    getPerformanceScore(): Promise<any>;
    _auditPWA(params: any, auditsToBeRun?: ("isInstallable" | "serviceWorker" | "splashScreen" | "themedOmnibox" | "contentWith" | "viewport" | "appleTouchIcon" | "maskableIcon")[]): Promise<AuditResult>;
}
//# sourceMappingURL=auditor.d.ts.map