import { Csp, Directive } from '../csp';
import { Finding } from '../finding';
export declare const DIRECTIVES_CAUSING_XSS: Directive[];
export declare const URL_SCHEMES_CAUSING_XSS: string[];
export declare function checkScriptUnsafeInline(effectiveCsp: Csp): Finding[];
export declare function checkScriptUnsafeEval(parsedCsp: Csp): Finding[];
export declare function checkPlainUrlSchemes(parsedCsp: Csp): Finding[];
export declare function checkWildcards(parsedCsp: Csp): Finding[];
export declare function checkMissingObjectSrcDirective(parsedCsp: Csp): Finding[];
export declare function checkMissingScriptSrcDirective(parsedCsp: Csp): Finding[];
export declare function checkMissingBaseUriDirective(parsedCsp: Csp): Finding[];
export declare function checkMultipleMissingBaseUriDirective(parsedCsps: Csp[]): Finding[];
export declare function checkMissingDirectives(parsedCsp: Csp): Finding[];
export declare function checkScriptAllowlistBypass(parsedCsp: Csp): Finding[];
export declare function checkFlashObjectAllowlistBypass(parsedCsp: Csp): Finding[];
export declare function looksLikeIpAddress(maybeIp: string): boolean;
export declare function checkIpSource(parsedCsp: Csp): Finding[];
export declare function checkDeprecatedDirective(parsedCsp: Csp): Finding[];
export declare function checkNonceLength(parsedCsp: Csp): Finding[];
export declare function checkSrcHttp(parsedCsp: Csp): Finding[];
export declare function checkHasConfiguredReporting(parsedCsp: Csp): Finding[];
//# sourceMappingURL=security_checks.d.ts.map